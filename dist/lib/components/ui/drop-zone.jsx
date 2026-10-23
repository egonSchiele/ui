"use client";
import * as React from "react";
import { Button } from "../../components/ui/form/button";
import { cn } from "../../utils";
function matchesAccept(file, accept) {
    const tokens = (accept !== null && accept !== void 0 ? accept : "")
        .split(",")
        .map((token) => token.trim().toLowerCase())
        .filter(Boolean);
    if (tokens.length === 0) {
        return true;
    }
    return tokens.some((token) => {
        if (token.startsWith(".")) {
            return file.name.toLowerCase().endsWith(token);
        }
        if (token.endsWith("/*")) {
            return file.type.toLowerCase().startsWith(token.slice(0, -1));
        }
        return file.type.toLowerCase() === token;
    });
}
function selectFiles(files, { accept, multiple, }) {
    const accepted = [];
    const rejected = [];
    for (const file of files) {
        if (!matchesAccept(file, accept)) {
            rejected.push({
                file,
                code: "file-type",
                message: `${file.name} is not an accepted file type.`,
            });
        }
        else if (!multiple && accepted.length > 0) {
            rejected.push({
                file,
                code: "too-many-files",
                message: "Choose one file at a time.",
            });
        }
        else {
            accepted.push(file);
        }
    }
    return { accepted, rejected };
}
function isEditable(target) {
    return (target instanceof Element &&
        Boolean(target.closest("input, textarea, [role='textbox'], [contenteditable]:not([contenteditable='false'])")));
}
function ownsTarget(root, target) {
    return (target instanceof Element &&
        target.closest('[data-slot="drop-zone"]') === root);
}
function useFileSelection(props) {
    return React.useCallback((files) => {
        var _a;
        if (props.disabled) {
            return;
        }
        const selection = selectFiles(files, props);
        if (selection.accepted.length > 0) {
            props.onFiles(selection.accepted);
        }
        if (selection.rejected.length > 0) {
            (_a = props.onReject) === null || _a === void 0 ? void 0 : _a.call(props, selection.rejected);
        }
    }, [
        props.accept,
        props.multiple,
        props.disabled,
        props.onFiles,
        props.onReject,
    ]);
}
function useScopedPaste({ rootRef, disabled, pasteActive, receiveFiles, }) {
    React.useEffect(() => {
        if (!pasteActive || disabled) {
            return;
        }
        function onPaste(event) {
            var _a, _b;
            if (event.defaultPrevented ||
                isEditable(event.target) ||
                (event.target instanceof Element &&
                    event.target.closest('[data-slot="drop-zone"]'))) {
                return;
            }
            const files = Array.from((_b = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : []);
            if (files.length === 0) {
                return;
            }
            event.preventDefault();
            receiveFiles(files);
        }
        document.addEventListener("paste", onPaste);
        return () => {
            document.removeEventListener("paste", onPaste);
        };
    }, [pasteActive, disabled, receiveFiles]);
    return (event) => {
        if (disabled ||
            event.defaultPrevented ||
            !ownsTarget(rootRef.current, event.target) ||
            isEditable(event.target)) {
            return;
        }
        const files = Array.from(event.clipboardData.files);
        if (files.length === 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        receiveFiles(files);
    };
}
function useDropHover({ rootRef, disabled, mimeType, }) {
    const dragDepth = React.useRef(0);
    const [dragActive, setDragActive] = React.useState(false);
    function clear() {
        dragDepth.current = 0;
        setDragActive(false);
    }
    React.useEffect(() => {
        if (disabled) {
            clear();
        }
    }, [disabled]);
    function eligible(event) {
        if (disabled || !ownsTarget(rootRef.current, event.target)) {
            return false;
        }
        const types = event.dataTransfer.types;
        return (types.includes("Files") ||
            Boolean(mimeType && types.includes(mimeType.toLowerCase())));
    }
    function onDragEnter(event) {
        if (!eligible(event)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        dragDepth.current += 1;
        setDragActive(true);
    }
    function onDragLeave(event) {
        if (!ownsTarget(rootRef.current, event.target)) {
            return;
        }
        event.stopPropagation();
        dragDepth.current = Math.max(0, dragDepth.current - 1);
        if (dragDepth.current === 0) {
            setDragActive(false);
        }
    }
    return { dragActive, eligible, onDragEnter, onDragLeave, clear };
}
function decodeInternal(payload, decoder) {
    try {
        return decoder(payload);
    }
    catch (error) {
        console.error("DropZone decoder failed.", error);
        return { ok: false, message: "The dropped data could not be read." };
    }
}
function useDropZone(props) {
    var _a;
    const rootRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const receiveFiles = useFileSelection(props);
    const onPaste = useScopedPaste({
        rootRef,
        disabled: props.disabled,
        pasteActive: props.pasteActive,
        receiveFiles,
    });
    const hover = useDropHover({
        rootRef,
        disabled: props.disabled,
        mimeType: (_a = props.internalDrop) === null || _a === void 0 ? void 0 : _a.mimeType,
    });
    function onDrop(event) {
        var _a;
        if (!hover.eligible(event)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        hover.clear();
        if (event.dataTransfer.files.length > 0) {
            receiveFiles(Array.from(event.dataTransfer.files));
            return;
        }
        if (!props.internalDrop) {
            return;
        }
        const result = decodeInternal(event.dataTransfer.getData(props.internalDrop.mimeType.toLowerCase()), props.internalDrop.decode);
        if (result.ok) {
            props.internalDrop.onDrop(result.value);
        }
        else {
            (_a = props.onReject) === null || _a === void 0 ? void 0 : _a.call(props, [{ code: "invalid-payload", message: result.message }]);
        }
    }
    function openPicker() {
        var _a;
        if (!props.disabled) {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
        }
    }
    return Object.assign(Object.assign({ rootRef,
        inputRef }, hover), { receiveFiles,
        onDrop,
        onPaste,
        openPicker });
}
export function DropZone(props) {
    var _a;
    const zone = useDropZone(props);
    const descriptionId = React.useId();
    return (<div ref={zone.rootRef} role="group" aria-label={props.label} aria-describedby={descriptionId} aria-disabled={props.disabled} tabIndex={props.disabled ? -1 : 0} data-slot="drop-zone" data-drag-active={zone.dragActive || undefined} className={cn("border-input bg-background flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-6 text-center outline-none focus-visible:ring-2 focus-visible:ring-ring", zone.dragActive && "border-primary bg-accent", props.disabled && "opacity-50", props.className)} onDragEnter={zone.onDragEnter} onDragLeave={zone.onDragLeave} onDrop={zone.onDrop} onPaste={zone.onPaste} onDragOver={(event) => {
            if (zone.eligible(event)) {
                event.preventDefault();
                event.stopPropagation();
                event.dataTransfer.dropEffect = "copy";
            }
        }} onClick={(event) => {
            if (event.target === event.currentTarget) {
                zone.openPicker();
            }
        }} onKeyDown={(event) => {
            if (event.target === event.currentTarget &&
                (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                zone.openPicker();
            }
        }}>
      {(_a = props.children) !== null && _a !== void 0 ? _a : <span className="font-medium">{props.label}</span>}
      <span id={descriptionId} className="text-muted-foreground text-sm">
        Drop files here, or paste while this area is focused.
      </span>
      <Button type="button" variant="outline" disabled={props.disabled} onClick={zone.openPicker} aria-label={`Choose files for ${props.label}`}>
        Choose files
      </Button>
      <input ref={zone.inputRef} type="file" hidden accept={props.accept} multiple={props.multiple} disabled={props.disabled} aria-label={`Files for ${props.label}`} onChange={(event) => {
            var _a;
            const files = Array.from((_a = event.currentTarget.files) !== null && _a !== void 0 ? _a : []);
            event.currentTarget.value = "";
            zone.receiveFiles(files);
        }}/>
    </div>);
}
