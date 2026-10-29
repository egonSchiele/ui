"use client";

import * as React from "react";
import { Button } from "@/components/ui/form/button";
import {
  chooseFiles,
  droppedEntry,
  pickedFolderFiles,
  readDroppedItems,
  type DropZoneChoice,
  type DropZoneRejection,
  type DroppedItem,
  type FoundFile,
} from "@/components/ui/drop-zone-files";
import { cn } from "@/utils";

export type { DropZoneChoice, DropZoneRejection };

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

// The props DropZone and DropArea share.
type FileTargetProps = {
  className?: string;
  accept?: string;
  multiple?: boolean;
  // Dropped folders give the files inside them, subfolders included.
  folders?: boolean;
  disabled?: boolean;
  pasteActive?: boolean;
  // Called when a drop, paste, or pick starts, with every file it carries
  // in order. The promise resolves once dropped folders are read, and
  // never rejects.
  onSelect?: (choices: Promise<DropZoneChoice[]>) => void;
  onFiles?: (files: File[]) => void;
  onReject?: (rejections: DropZoneRejection[]) => void;
};

export type DropZoneProps<Value = never> = FileTargetProps & {
  label: string;
  description?: React.ReactNode;
  pickerLabel?: string;
  children?: React.ReactNode;
  internalDrop?: DropZoneInternalDrop<Value>;
};

export type DropAreaProps = FileTargetProps & {
  // The overlay's text while files are dragged over the area.
  prompt: string;
  children: React.ReactNode;
};

type TargetOptions<Value> = FileTargetProps & {
  internalDrop?: DropZoneInternalDrop<Value>;
};

const READING_FOLDERS: string = "Reading folders…";

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

function foundFiles(files: File[]): Promise<FoundFile[]> {
  return Promise.resolve(files.map((file: File): FoundFile => ({ file })));
}

type DropTargetState = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  dragActive: boolean;
  reading: boolean;
  receive: (found: Promise<FoundFile[]>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => void;
};

// Calls the older two callbacks, for callers that don't use onSelect.
function emitChoices(
  choices: DropZoneChoice[],
  { onFiles, onReject }: Pick<FileTargetProps, "onFiles" | "onReject">,
): void {
  const files: File[] = choices.flatMap((choice: DropZoneChoice): File[] =>
    choice.accepted ? [choice.file] : [],
  );
  const rejections: DropZoneRejection[] = choices.flatMap(
    (choice: DropZoneChoice): DropZoneRejection[] =>
      choice.accepted ? [] : [choice.rejection],
  );
  if (files.length > 0) {
    onFiles?.(files);
  }
  if (rejections.length > 0) {
    onReject?.(rejections);
  }
}

type Selection = {
  reading: boolean;
  receive: (found: Promise<FoundFile[]>) => void;
};

// Turns each selection into one ordered list of choices. `reading` is
// true while a selection's folders are still being read.
function useSelection<Value>(props: TargetOptions<Value>): Selection {
  const [pending, setPending]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);
  const receive = React.useCallback(
    (found: Promise<FoundFile[]>): void => {
      if (props.disabled) {
        return;
      }
      setPending((count: number): number => count + 1);
      const choices: Promise<DropZoneChoice[]> = found.then(
        (files: FoundFile[]): DropZoneChoice[] => chooseFiles(files, props),
      );
      props.onSelect?.(choices);
      void choices.then((list: DropZoneChoice[]): void => {
        setPending((count: number): number => count - 1);
        emitChoices(list, props);
      });
    },
    [
      props.accept,
      props.multiple,
      props.disabled,
      props.onSelect,
      props.onFiles,
      props.onReject,
    ],
  );
  return { reading: pending > 0, receive };
}

type PasteOptions = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  pasteActive?: boolean;
  receive: (found: Promise<FoundFile[]>) => void;
};

function useScopedPaste({
  rootRef,
  disabled,
  pasteActive,
  receive,
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
      receive(foundFiles(files));
    }
    document.addEventListener("paste", onPaste);
    return (): void => {
      document.removeEventListener("paste", onPaste);
    };
  }, [pasteActive, disabled, receive]);

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
    receive(foundFiles(files));
  };
}

type HoverOptions = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  mimeType?: string;
};

type DropHoverState = Pick<
  DropTargetState,
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

// The items must be read during the drop event, because the browser
// clears them after it. Reading the folders can happen later.
function droppedFiles({
  transfer,
  folders,
}: {
  transfer: DataTransfer;
  folders?: boolean;
}): Promise<FoundFile[]> {
  if (!folders) {
    return foundFiles(Array.from(transfer.files));
  }
  const items: DroppedItem[] = Array.from(transfer.items)
    .filter((item: DataTransferItem): boolean => item.kind === "file")
    .map((item: DataTransferItem): DroppedItem => {
      const entry: FileSystemEntry | null = item.webkitGetAsEntry();
      return {
        entry: entry === null ? null : droppedEntry(entry),
        file: item.getAsFile(),
      };
    });
  return readDroppedItems(items);
}

function dropInternal<Value>({
  transfer,
  options,
}: {
  transfer: DataTransfer;
  options: TargetOptions<Value>;
}): void {
  if (!options.internalDrop) {
    return;
  }
  const result: DropZoneDecodeResult<Value> = decodeInternal(
    transfer.getData(options.internalDrop.mimeType.toLowerCase()),
    options.internalDrop.decode,
  );
  if (result.ok) {
    options.internalDrop.onDrop(result.value);
  } else {
    options.onReject?.([{ code: "invalid-payload", message: result.message }]);
  }
}

function useDropTarget<Value>(options: TargetOptions<Value>): DropTargetState {
  const rootRef: React.RefObject<HTMLDivElement | null> =
    React.useRef<HTMLDivElement>(null);
  const selection: Selection = useSelection(options);
  const onPaste: React.ClipboardEventHandler<HTMLDivElement> = useScopedPaste({
    rootRef,
    disabled: options.disabled,
    pasteActive: options.pasteActive,
    receive: selection.receive,
  });
  const hover: DropHoverState = useDropHover({
    rootRef,
    disabled: options.disabled,
    mimeType: options.internalDrop?.mimeType,
  });

  function onDragOver(event: React.DragEvent<HTMLDivElement>): void {
    if (!hover.ownsTransfer(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = options.disabled ? "none" : "copy";
  }
  function onDrop(event: React.DragEvent<HTMLDivElement>): void {
    if (!hover.ownsTransfer(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    hover.clear();
    if (options.disabled) {
      return;
    }
    if (event.dataTransfer.files.length > 0) {
      selection.receive(
        droppedFiles({
          transfer: event.dataTransfer,
          folders: options.folders,
        }),
      );
      return;
    }
    dropInternal({ transfer: event.dataTransfer, options });
  }
  return {
    rootRef,
    ...hover,
    reading: selection.reading,
    receive: selection.receive,
    onDragOver,
    onDrop,
    onPaste,
  };
}

function pickedFiles(input: HTMLInputElement): Promise<FoundFile[]> {
  return foundFiles(pickedFolderFiles(Array.from(input.files ?? [])));
}

function defaultDescription({
  multiple,
  folders,
  pasteActive,
}: Pick<DropZoneProps, "multiple" | "folders" | "pasteActive">): string {
  const files: string = multiple ? "files" : "a file";
  const dropped: string = folders ? `${files} or folders` : files;
  return pasteActive
    ? `Drop ${dropped} here, or paste ${files}.`
    : `Drop ${dropped} here, or paste while this area is focused.`;
}

type PickerProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  label: string;
  zoneLabel: string;
  inputLabel: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  folder: boolean;
  receive: (found: Promise<FoundFile[]>) => void;
};

function openPicker({
  inputRef,
  disabled,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
}): void {
  if (!disabled) {
    inputRef.current?.click();
  }
}

// A button and its hidden file input. `folder` makes it pick a folder.
function Picker(props: PickerProps): React.JSX.Element {
  // React has no prop for webkitdirectory, so the input gets it here.
  const folderAttributes: Record<string, string> = props.folder
    ? { webkitdirectory: "" }
    : {};
  return (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={props.disabled}
        onClick={(): void => openPicker(props)}
        aria-label={`${props.label} for ${props.zoneLabel}`}
      >
        {props.label}
      </Button>
      <input
        ref={props.inputRef}
        type="file"
        hidden
        accept={props.folder ? undefined : props.accept}
        multiple={props.folder || props.multiple}
        disabled={props.disabled}
        aria-label={`${props.inputLabel} for ${props.zoneLabel}`}
        {...folderAttributes}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          const found: Promise<FoundFile[]> = pickedFiles(event.currentTarget);
          event.currentTarget.value = "";
          props.receive(found);
        }}
      />
    </>
  );
}

type ZonePickersProps<Value> = {
  props: DropZoneProps<Value>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  folderInputRef: React.RefObject<HTMLInputElement | null>;
  receive: (found: Promise<FoundFile[]>) => void;
};

function ZonePickers<Value>({
  props,
  fileInputRef,
  folderInputRef,
  receive,
}: ZonePickersProps<Value>): React.JSX.Element {
  const pickerLabel: string =
    props.pickerLabel ?? (props.multiple ? "Choose files" : "Choose file");
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Picker
        inputRef={fileInputRef}
        label={pickerLabel}
        zoneLabel={props.label}
        inputLabel="Files"
        disabled={props.disabled}
        accept={props.accept}
        multiple={props.multiple}
        folder={false}
        receive={receive}
      />
      {props.folders && (
        <Picker
          inputRef={folderInputRef}
          label="Choose folder"
          zoneLabel={props.label}
          inputLabel="Folder"
          disabled={props.disabled}
          folder
          receive={receive}
        />
      )}
    </div>
  );
}

export function DropZone<Value = never>(
  props: DropZoneProps<Value>,
): React.JSX.Element {
  const zone: DropTargetState = useDropTarget(props);
  const descriptionId: string = React.useId();
  const fileInputRef: React.RefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null);
  const folderInputRef: React.RefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null);
  const openFiles = (): void =>
    openPicker({ inputRef: fileInputRef, disabled: props.disabled });
  return (
    <div
      ref={zone.rootRef}
      role="group"
      aria-label={props.label}
      aria-describedby={descriptionId}
      aria-disabled={props.disabled}
      aria-busy={zone.reading || undefined}
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
          openFiles();
        }
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (
          event.target === event.currentTarget &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          openFiles();
        }
      }}
    >
      {props.children ?? <span className="font-medium">{props.label}</span>}
      <span id={descriptionId} className="text-muted-foreground text-sm">
        {zone.reading
          ? READING_FOLDERS
          : (props.description ?? defaultDescription(props))}
      </span>
      <ZonePickers
        props={props}
        fileInputRef={fileInputRef}
        folderInputRef={folderInputRef}
        receive={zone.receive}
      />
    </div>
  );
}

// The overlay's text: the prompt during a drag, a note while folders are
// read, and nothing otherwise.
function overlayText({
  dragActive,
  reading,
  prompt,
}: {
  dragActive: boolean;
  reading: boolean;
  prompt: string;
}): string | null {
  if (dragActive) {
    return prompt;
  }
  if (reading) {
    return READING_FOLDERS;
  }
  return null;
}

// A drop target that wraps other content, such as a whole page, with no
// box, picker, or tab stop of its own. An overlay shows while files are
// dragged over it. A drop isn't keyboard accessible, so the page must
// also offer a picker.
export function DropArea(props: DropAreaProps): React.JSX.Element {
  const area: DropTargetState = useDropTarget(props);
  const overlay: string | null = overlayText({
    dragActive: area.dragActive,
    reading: area.reading,
    prompt: props.prompt,
  });
  return (
    <div
      ref={area.rootRef}
      aria-busy={area.reading || undefined}
      data-slot="drop-zone"
      data-drag-active={area.dragActive || undefined}
      className={cn("relative", props.className)}
      onDragEnter={area.onDragEnter}
      onDragLeave={area.onDragLeave}
      onDrop={area.onDrop}
      onPaste={area.onPaste}
      onDragOver={area.onDragOver}
    >
      {props.children}
      {overlay !== null && (
        <div
          aria-hidden="true"
          data-slot="drop-area-overlay"
          className="border-primary bg-accent/80 text-foreground pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed text-sm font-medium"
        >
          {overlay}
        </div>
      )}
    </div>
  );
}
