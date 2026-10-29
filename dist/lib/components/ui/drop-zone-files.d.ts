export type DropZoneRejection = {
    file?: File;
    code: "file-type" | "too-many-files" | "invalid-payload" | "unreadable";
    message: string;
};
export type DropZoneChoice = {
    accepted: true;
    file: File;
} | {
    accepted: false;
    rejection: DropZoneRejection;
};
export type FoundFile = {
    file: File;
} | {
    rejection: DropZoneRejection;
};
export type DroppedFolderReader = {
    next: () => Promise<DroppedEntry[]>;
};
export type DroppedEntry = {
    kind: "file";
    name: string;
    path: string;
    file: () => Promise<File>;
} | {
    kind: "folder";
    name: string;
    path: string;
    reader: () => DroppedFolderReader;
};
export type DroppedItem = {
    entry: DroppedEntry | null;
    file: File | null;
};
type ChooseOptions = {
    accept?: string;
    multiple?: boolean;
};
export declare function chooseFiles(found: FoundFile[], { accept, multiple }: ChooseOptions): DropZoneChoice[];
export declare function inHiddenFolder(file: File): boolean;
export declare function readDroppedItems(items: DroppedItem[]): Promise<FoundFile[]>;
export declare function droppedEntry(entry: FileSystemEntry): DroppedEntry;
export {};
