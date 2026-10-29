"use client";
import * as React from "react";
import { Button } from "../../components/ui/form/button";
import { chooseFiles, droppedEntry, inHiddenFolder, readDroppedItems, } from "../../components/ui/drop-zone-files";
import { cn } from "../../utils";
const READING_FOLDERS = "Reading folders…";
function isEditable(target) {
    return (target instanceof Element &&
        Boolean(target.closest("input, textarea, [role='textbox'], [contenteditable]:not([contenteditable='false'])")));
}
function ownsTarget(root, target) {
    return (target instanceof Element &&
        target.closest('[data-slot="drop-zone"]') === root);
}
function foundFiles(files) {
    return Promise.resolve(files.map((file) => ({ file })));
}
// Calls the older two callbacks, for callers that don't use onSelect.
function emitChoices(choices, { onFiles, onReject }) {
    const files = choices.flatMap((choice) => choice.accepted ? [choice.file] : []);
    const rejections = choices.flatMap((choice) => choice.accepted ? [] : [choice.rejection]);
    if (files.length > 0) {
        onFiles === null || onFiles === void 0 ? void 0 : onFiles(files);
    }
    if (rejections.length > 0) {
        onReject === null || onReject === void 0 ? void 0 : onReject(rejections);
    }
}
// Turns each selection into one ordered list of choices. `reading` is
// true while a selection's folders are still being read.
function useSelection(props) {
    const [pending, setPending] = React.useState(0);
    const receive = React.useCallback((found) => {
        var _a;
        if (props.disabled) {
            return;
        }
        setPending((count) => count + 1);
        const choices = found.then((files) => chooseFiles(files, props));
        (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, choices);
        void choices.then((list) => {
            setPending((count) => count - 1);
            emitChoices(list, props);
        });
    }, [
        props.accept,
        props.multiple,
        props.disabled,
        props.onSelect,
        props.onFiles,
        props.onReject,
    ]);
    return { reading: pending > 0, receive };
}
function useScopedPaste({ rootRef, disabled, pasteActive, receive, }) {
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
            receive(foundFiles(files));
        }
        document.addEventListener("paste", onPaste);
        return () => {
            document.removeEventListener("paste", onPaste);
        };
    }, [pasteActive, disabled, receive]);
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
        receive(foundFiles(files));
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
    function ownsTransfer(event) {
        if (!ownsTarget(rootRef.current, event.target)) {
            return false;
        }
        const types = event.dataTransfer.types;
        return (types.includes("Files") ||
            Boolean(mimeType && types.includes(mimeType.toLowerCase())));
    }
    function onDragEnter(event) {
        if (disabled || !ownsTransfer(event)) {
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
    return { dragActive, ownsTransfer, onDragEnter, onDragLeave, clear };
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
// The items must be read during the drop event, because the browser
// clears them after it. Reading the folders can happen later.
function droppedFiles({ transfer, folders, }) {
    if (!folders) {
        return foundFiles(Array.from(transfer.files));
    }
    const items = Array.from(transfer.items)
        .filter((item) => item.kind === "file")
        .map((item) => {
        const entry = item.webkitGetAsEntry();
        return {
            entry: entry === null ? null : droppedEntry(entry),
            file: item.getAsFile(),
        };
    });
    return readDroppedItems(items);
}
function dropInternal({ transfer, options, }) {
    var _a;
    if (!options.internalDrop) {
        return;
    }
    const result = decodeInternal(transfer.getData(options.internalDrop.mimeType.toLowerCase()), options.internalDrop.decode);
    if (result.ok) {
        options.internalDrop.onDrop(result.value);
    }
    else {
        (_a = options.onReject) === null || _a === void 0 ? void 0 : _a.call(options, [{ code: "invalid-payload", message: result.message }]);
    }
}
function useDropTarget(options) {
    var _a;
    const rootRef = React.useRef(null);
    const selection = useSelection(options);
    const onPaste = useScopedPaste({
        rootRef,
        disabled: options.disabled,
        pasteActive: options.pasteActive,
        receive: selection.receive,
    });
    const hover = useDropHover({
        rootRef,
        disabled: options.disabled,
        mimeType: (_a = options.internalDrop) === null || _a === void 0 ? void 0 : _a.mimeType,
    });
    function onDragOver(event) {
        if (!hover.ownsTransfer(event)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = options.disabled ? "none" : "copy";
    }
    function onDrop(event) {
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
            selection.receive(droppedFiles({
                transfer: event.dataTransfer,
                folders: options.folders,
            }));
            return;
        }
        dropInternal({ transfer: event.dataTransfer, options });
    }
    return Object.assign(Object.assign({ rootRef }, hover), { reading: selection.reading, receive: selection.receive, onDragOver,
        onDrop,
        onPaste });
}
// The files a picker returned. A folder pick leaves out hidden files and
// the files in hidden folders, as a folder drop does.
function pickedFiles(input) {
    var _a;
    const files = Array.from((_a = input.files) !== null && _a !== void 0 ? _a : []);
    return foundFiles(files.filter((file) => !inHiddenFolder(file)));
}
function defaultDescription({ multiple, folders, pasteActive, }) {
    const files = multiple ? "files" : "a file";
    const dropped = folders ? `${files} or folders` : files;
    return pasteActive
        ? `Drop ${dropped} here, or paste ${files}.`
        : `Drop ${dropped} here, or paste while this area is focused.`;
}
function openPicker({ inputRef, disabled, }) {
    var _a;
    if (!disabled) {
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    }
}
// A button and its hidden file input. `folder` makes it pick a folder.
function Picker(props) {
    // React has no prop for webkitdirectory, so the input gets it here.
    const folderAttributes = props.folder
        ? { webkitdirectory: "" }
        : {};
    return (<>
      <Button type="button" variant="outline" disabled={props.disabled} onClick={() => openPicker(props)} aria-label={`${props.label} for ${props.zoneLabel}`}>
        {props.label}
      </Button>
      <input ref={props.inputRef} type="file" hidden accept={props.folder ? undefined : props.accept} multiple={props.folder || props.multiple} disabled={props.disabled} aria-label={`${props.inputLabel} for ${props.zoneLabel}`} {...folderAttributes} onChange={(event) => {
            const found = pickedFiles(event.currentTarget);
            event.currentTarget.value = "";
            props.receive(found);
        }}/>
    </>);
}
function ZonePickers({ props, fileInputRef, folderInputRef, receive, }) {
    var _a;
    const pickerLabel = (_a = props.pickerLabel) !== null && _a !== void 0 ? _a : (props.multiple ? "Choose files" : "Choose file");
    return (<div className="flex flex-wrap justify-center gap-2">
      <Picker inputRef={fileInputRef} label={pickerLabel} zoneLabel={props.label} inputLabel="Files" disabled={props.disabled} accept={props.accept} multiple={props.multiple} folder={false} receive={receive}/>
      {props.folders && (<Picker inputRef={folderInputRef} label="Choose folder" zoneLabel={props.label} inputLabel="Folder" disabled={props.disabled} folder receive={receive}/>)}
    </div>);
}
export function DropZone(props) {
    var _a, _b;
    const zone = useDropTarget(props);
    const descriptionId = React.useId();
    const fileInputRef = React.useRef(null);
    const folderInputRef = React.useRef(null);
    const openFiles = () => openPicker({ inputRef: fileInputRef, disabled: props.disabled });
    return (<div ref={zone.rootRef} role="group" aria-label={props.label} aria-describedby={descriptionId} aria-disabled={props.disabled} aria-busy={zone.reading || undefined} tabIndex={props.disabled ? -1 : 0} data-slot="drop-zone" data-drag-active={zone.dragActive || undefined} className={cn("border-input bg-background flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-6 text-center outline-none focus-visible:ring-2 focus-visible:ring-ring", zone.dragActive && "border-primary bg-accent", props.disabled && "opacity-50", props.className)} onDragEnter={zone.onDragEnter} onDragLeave={zone.onDragLeave} onDrop={zone.onDrop} onPaste={zone.onPaste} onDragOver={zone.onDragOver} onClick={(event) => {
            if (event.target === event.currentTarget) {
                openFiles();
            }
        }} onKeyDown={(event) => {
            if (event.target === event.currentTarget &&
                (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                openFiles();
            }
        }}>
      {(_a = props.children) !== null && _a !== void 0 ? _a : <span className="font-medium">{props.label}</span>}
      <span id={descriptionId} className="text-muted-foreground text-sm">
        {zone.reading
            ? READING_FOLDERS
            : ((_b = props.description) !== null && _b !== void 0 ? _b : defaultDescription(props))}
      </span>
      <ZonePickers props={props} fileInputRef={fileInputRef} folderInputRef={folderInputRef} receive={zone.receive}/>
    </div>);
}
// The overlay's text: the prompt during a drag, a note while folders are
// read, and nothing otherwise.
function overlayText({ dragActive, reading, prompt, }) {
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
export function DropArea(props) {
    const area = useDropTarget(props);
    const overlay = overlayText({
        dragActive: area.dragActive,
        reading: area.reading,
        prompt: props.prompt,
    });
    return (<div ref={area.rootRef} aria-busy={area.reading || undefined} data-slot="drop-zone" data-drag-active={area.dragActive || undefined} className={cn("relative", props.className)} onDragEnter={area.onDragEnter} onDragLeave={area.onDragLeave} onDrop={area.onDrop} onPaste={area.onPaste} onDragOver={area.onDragOver}>
      {props.children}
      {overlay !== null && (<div aria-hidden="true" data-slot="drop-area-overlay" className="border-primary bg-accent/80 text-foreground pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed text-sm font-medium">
          {overlay}
        </div>)}
    </div>);
}
