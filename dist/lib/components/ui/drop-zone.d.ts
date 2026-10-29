import * as React from "react";
import { type DropZoneChoice, type DropZoneRejection } from "../../components/ui/drop-zone-files";
export type { DropZoneChoice, DropZoneRejection };
export type DropZoneDecodeResult<Value> = {
    ok: true;
    value: Value;
} | {
    ok: false;
    message: string;
};
export type DropZoneInternalDrop<Value> = {
    mimeType: string;
    decode: (payload: string) => DropZoneDecodeResult<Value>;
    onDrop: (value: Value) => void;
};
type FileTargetProps = {
    className?: string;
    accept?: string;
    multiple?: boolean;
    folders?: boolean;
    disabled?: boolean;
    pasteActive?: boolean;
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
    prompt: string;
    children: React.ReactNode;
};
export declare function DropZone<Value = never>(props: DropZoneProps<Value>): React.JSX.Element;
export declare function DropArea(props: DropAreaProps): React.JSX.Element;
