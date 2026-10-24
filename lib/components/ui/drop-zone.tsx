"use client";

import * as React from "react";
import { Button } from "@/components/ui/form/button";
import { cn } from "@/utils";

export type DropZoneRejection = {
  file?: File;
  code: "file-type" | "too-many-files" | "invalid-payload";
  message: string;
};

export type DropZoneDecodeResult<Value> =
  | {
      ok: true;
      value: Value;
    }
  | {
      ok: false;
      message: string;
    };

export type DropZoneInternalDrop<Value> = {
  mimeType: string;
  decode: (payload: string) => DropZoneDecodeResult<Value>;
  onDrop: (value: Value) => void;
};

export type DropZoneProps<Value = never> = {
  label: string;
  description?: React.ReactNode;
  pickerLabel?: string;
  children?: React.ReactNode;
  className?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  pasteActive?: boolean;
  onFiles: (files: File[]) => void;
  onReject?: (rejections: DropZoneRejection[]) => void;
  internalDrop?: DropZoneInternalDrop<Value>;
};

type FileSelection = {
  accepted: File[];
  rejected: DropZoneRejection[];
};

function matchesAccept(file: File, accept: string | undefined): boolean {
  const tokens: string[] = (accept ?? "")
    .split(",")
    .map((token: string): string => token.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) {
    return true;
  }
  return tokens.some((token: string): boolean => {
    if (token.startsWith(".")) {
      return file.name.toLowerCase().endsWith(token);
    }
    if (token.endsWith("/*")) {
      return file.type.toLowerCase().startsWith(token.slice(0, -1));
    }
    return file.type.toLowerCase() === token;
  });
}

function selectFiles(
  files: File[],
  {
    accept,
    multiple,
  }: {
    accept?: string;
    multiple?: boolean;
  },
): FileSelection {
  const accepted: File[] = [];
  const rejected: DropZoneRejection[] = [];
  for (const file of files) {
    if (!matchesAccept(file, accept)) {
      rejected.push({
        file,
        code: "file-type",
        message: `${file.name} is not an accepted file type.`,
      });
    } else if (!multiple && accepted.length > 0) {
      rejected.push({
        file,
        code: "too-many-files",
        message: "Choose one file at a time.",
      });
    } else {
      accepted.push(file);
    }
  }
  return { accepted, rejected };
}

function isEditable(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    Boolean(
      target.closest(
        "input, textarea, [role='textbox'], [contenteditable]:not([contenteditable='false'])",
      ),
    )
  );
}

function ownsTarget(
  root: HTMLDivElement | null,
  target: EventTarget | null,
): boolean {
  return (
    target instanceof Element &&
    target.closest('[data-slot="drop-zone"]') === root
  );
}

type DropZoneState = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dragActive: boolean;
  receiveFiles: (files: File[]) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => void;
  openPicker: () => void;
};

function useFileSelection<Value>(
  props: DropZoneProps<Value>,
): (files: File[]) => void {
  return React.useCallback(
    (files: File[]): void => {
      if (props.disabled) {
        return;
      }
      const selection: FileSelection = selectFiles(files, props);
      if (selection.accepted.length > 0) {
        props.onFiles(selection.accepted);
      }
      if (selection.rejected.length > 0) {
        props.onReject?.(selection.rejected);
      }
    },
    [
      props.accept,
      props.multiple,
      props.disabled,
      props.onFiles,
      props.onReject,
    ],
  );
}

type PasteOptions = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  pasteActive?: boolean;
  receiveFiles: (files: File[]) => void;
};

function useScopedPaste({
  rootRef,
  disabled,
  pasteActive,
  receiveFiles,
}: PasteOptions): React.ClipboardEventHandler<HTMLDivElement> {
  React.useEffect((): (() => void) | undefined => {
    if (!pasteActive || disabled) {
      return;
    }
    function onPaste(event: ClipboardEvent): void {
      if (
        event.defaultPrevented ||
        isEditable(event.target) ||
        (event.target instanceof Element &&
          event.target.closest('[data-slot="drop-zone"]'))
      ) {
        return;
      }
      const files: File[] = Array.from(event.clipboardData?.files ?? []);
      if (files.length === 0) {
        return;
      }
      event.preventDefault();
      receiveFiles(files);
    }
    document.addEventListener("paste", onPaste);
    return (): void => {
      document.removeEventListener("paste", onPaste);
    };
  }, [pasteActive, disabled, receiveFiles]);

  return (event: React.ClipboardEvent<HTMLDivElement>): void => {
    if (
      disabled ||
      event.defaultPrevented ||
      !ownsTarget(rootRef.current, event.target) ||
      isEditable(event.target)
    ) {
      return;
    }
    const files: File[] = Array.from(event.clipboardData.files);
    if (files.length === 0) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    receiveFiles(files);
  };
}

type HoverOptions = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  mimeType?: string;
};

type DropHoverState = Pick<
  DropZoneState,
  "dragActive" | "onDragEnter" | "onDragLeave"
> & {
  ownsTransfer: (event: React.DragEvent<HTMLDivElement>) => boolean;
  clear: () => void;
};

function useDropHover({
  rootRef,
  disabled,
  mimeType,
}: HoverOptions): DropHoverState {
  const dragDepth: React.RefObject<number> = React.useRef<number>(0);
  const [dragActive, setDragActive]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(false);

  function clear(): void {
    dragDepth.current = 0;
    setDragActive(false);
  }
  React.useEffect((): void => {
    if (disabled) {
      clear();
    }
  }, [disabled]);

  function ownsTransfer(event: React.DragEvent<HTMLDivElement>): boolean {
    if (!ownsTarget(rootRef.current, event.target)) {
      return false;
    }
    const types: readonly string[] = event.dataTransfer.types;
    return (
      types.includes("Files") ||
      Boolean(mimeType && types.includes(mimeType.toLowerCase()))
    );
  }
  function onDragEnter(event: React.DragEvent<HTMLDivElement>): void {
    if (disabled || !ownsTransfer(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current += 1;
    setDragActive(true);
  }
  function onDragLeave(event: React.DragEvent<HTMLDivElement>): void {
    if (!ownsTarget(rootRef.current, event.target)) {
      return;
    }
    event.stopPropagation();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) {
      setDragActive(false);
    }
  }
  return { dragActive, ownsTransfer, onDragEnter, onDragLeave, clear };
}

function decodeInternal<Value>(
  payload: string,
  decoder: DropZoneInternalDrop<Value>["decode"],
): DropZoneDecodeResult<Value> {
  try {
    return decoder(payload);
  } catch (error: unknown) {
    console.error("DropZone decoder failed.", error);
    return { ok: false, message: "The dropped data could not be read." };
  }
}

function useDropZone<Value>(props: DropZoneProps<Value>): DropZoneState {
  const rootRef: React.RefObject<HTMLDivElement | null> =
    React.useRef<HTMLDivElement>(null);
  const inputRef: React.RefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null);
  const receiveFiles: (files: File[]) => void = useFileSelection(props);
  const onPaste: React.ClipboardEventHandler<HTMLDivElement> = useScopedPaste({
    rootRef,
    disabled: props.disabled,
    pasteActive: props.pasteActive,
    receiveFiles,
  });
  const hover: DropHoverState = useDropHover({
    rootRef,
    disabled: props.disabled,
    mimeType: props.internalDrop?.mimeType,
  });

  function onDragOver(event: React.DragEvent<HTMLDivElement>): void {
    if (!hover.ownsTransfer(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = props.disabled ? "none" : "copy";
  }
  function onDrop(event: React.DragEvent<HTMLDivElement>): void {
    if (!hover.ownsTransfer(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    hover.clear();
    if (props.disabled) {
      return;
    }
    if (event.dataTransfer.files.length > 0) {
      receiveFiles(Array.from(event.dataTransfer.files));
      return;
    }
    if (!props.internalDrop) {
      return;
    }
    const result: DropZoneDecodeResult<Value> = decodeInternal(
      event.dataTransfer.getData(props.internalDrop.mimeType.toLowerCase()),
      props.internalDrop.decode,
    );
    if (result.ok) {
      props.internalDrop.onDrop(result.value);
    } else {
      props.onReject?.([{ code: "invalid-payload", message: result.message }]);
    }
  }
  function openPicker(): void {
    if (!props.disabled) {
      inputRef.current?.click();
    }
  }
  return {
    rootRef,
    inputRef,
    ...hover,
    receiveFiles,
    onDragOver,
    onDrop,
    onPaste,
    openPicker,
  };
}

function defaultDescription({
  multiple,
  pasteActive,
}: Pick<DropZoneProps, "multiple" | "pasteActive">): string {
  const files: string = multiple ? "files" : "a file";
  return pasteActive
    ? `Drop ${files} here, or paste ${files}.`
    : `Drop ${files} here, or paste while this area is focused.`;
}

export function DropZone<Value = never>(
  props: DropZoneProps<Value>,
): React.JSX.Element {
  const zone: DropZoneState = useDropZone(props);
  const descriptionId: string = React.useId();
  const pickerLabel: string =
    props.pickerLabel ?? (props.multiple ? "Choose files" : "Choose file");
  return (
    <div
      ref={zone.rootRef}
      role="group"
      aria-label={props.label}
      aria-describedby={descriptionId}
      aria-disabled={props.disabled}
      tabIndex={props.disabled ? -1 : 0}
      data-slot="drop-zone"
      data-drag-active={zone.dragActive || undefined}
      className={cn(
        "border-input bg-background flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-6 text-center outline-none focus-visible:ring-2 focus-visible:ring-ring",
        zone.dragActive && "border-primary bg-accent",
        props.disabled && "opacity-50",
        props.className,
      )}
      onDragEnter={zone.onDragEnter}
      onDragLeave={zone.onDragLeave}
      onDrop={zone.onDrop}
      onPaste={zone.onPaste}
      onDragOver={zone.onDragOver}
      onClick={(event: React.MouseEvent<HTMLDivElement>): void => {
        if (event.target === event.currentTarget) {
          zone.openPicker();
        }
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (
          event.target === event.currentTarget &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          zone.openPicker();
        }
      }}
    >
      {props.children ?? <span className="font-medium">{props.label}</span>}
      <span id={descriptionId} className="text-muted-foreground text-sm">
        {props.description ?? defaultDescription(props)}
      </span>
      <Button
        type="button"
        variant="outline"
        disabled={props.disabled}
        onClick={zone.openPicker}
        aria-label={`${pickerLabel} for ${props.label}`}
      >
        {pickerLabel}
      </Button>
      <input
        ref={zone.inputRef}
        type="file"
        hidden
        accept={props.accept}
        multiple={props.multiple}
        disabled={props.disabled}
        aria-label={`Files for ${props.label}`}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          const files: File[] = Array.from(event.currentTarget.files ?? []);
          event.currentTarget.value = "";
          zone.receiveFiles(files);
        }}
      />
    </div>
  );
}
