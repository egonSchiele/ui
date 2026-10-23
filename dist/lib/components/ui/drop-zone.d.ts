import * as React from "react";
export type DropZoneRejection = {
    file?: File;
    code: "file-type" | "too-many-files" | "invalid-payload";
    message: string;
};
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
export type DropZoneProps<Value = never> = {
    label: string;
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
export declare function DropZone<Value = never>(props: DropZoneProps<Value>): React.JSX.Element;
