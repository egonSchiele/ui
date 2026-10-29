var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function rejected(rejection) {
    return { accepted: false, rejection };
}
// Applies `accept` and `multiple` to the files a selection found, keeping
// their order.
export function chooseFiles(found, { accept, multiple }) {
    let acceptedCount = 0;
    return found.map((item) => {
        if ("rejection" in item) {
            return rejected(item.rejection);
        }
        const { file } = item;
        if (!matchesAccept(file, accept)) {
            return rejected({
                file,
                code: "file-type",
                message: `${file.name} is not an accepted file type.`,
            });
        }
        if (!multiple && acceptedCount > 0) {
            return rejected({
                file,
                code: "too-many-files",
                message: "Choose one file at a time.",
            });
        }
        acceptedCount += 1;
        return { accepted: true, file };
    });
}
// Hidden files and folders, such as .DS_Store and .git.
function isHidden(name) {
    return name.startsWith(".");
}
// True when any folder on a picked file's relative path is hidden.
function inHiddenFolder(file) {
    return file.webkitRelativePath.split("/").some(isHidden);
}
function byRelativePath(left, right) {
    return left.webkitRelativePath.localeCompare(right.webkitRelativePath);
}
// The files a folder pick returned, in path order, as a folder drop gives
// them. Hidden files and the files in hidden folders are left out. A
// file pick has no relative paths, so it keeps the browser's order.
export function pickedFolderFiles(files) {
    return files
        .filter((file) => !inHiddenFolder(file))
        .sort(byRelativePath);
}
function unreadable(path, error) {
    console.error(`DropZone could not read ${path}.`, error);
    return {
        rejection: { code: "unreadable", message: `${path} could not be read.` },
    };
}
function byName(left, right) {
    return left.name.localeCompare(right.name);
}
// A folder's reader returns at most 100 entries per call in Chrome, so
// the walk reads until a call returns none.
function readAllEntries(reader) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = [];
        for (;;) {
            const batch = yield reader.next();
            if (batch.length === 0) {
                return entries;
            }
            entries.push(...batch);
        }
    });
}
function readEntry(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (entry.kind === "file") {
                return [{ file: yield entry.file() }];
            }
            const entries = yield readAllEntries(entry.reader());
            const visible = entries
                .filter((child) => !isHidden(child.name))
                .sort(byName);
            const found = yield Promise.all(visible.map(readEntry));
            return found.flat();
        }
        catch (error) {
            return [unreadable(entry.path, error)];
        }
    });
}
function readItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        if (item.entry !== null && item.entry.kind === "folder") {
            return readEntry(item.entry);
        }
        return item.file === null ? [] : [{ file: item.file }];
    });
}
// The files a drop carried, with each dropped folder replaced by the
// files inside it, subfolders included. A dropped file keeps its place
// among the folders. Hidden files and folders inside a folder are left
// out, and a read that fails becomes an "unreadable" rejection.
export function readDroppedItems(items) {
    return __awaiter(this, void 0, void 0, function* () {
        const found = yield Promise.all(items.map(readItem));
        return found.flat();
    });
}
function readerOf(folder) {
    const reader = folder.createReader();
    return {
        next: () => new Promise((resolve, reject) => {
            reader.readEntries((entries) => {
                resolve(entries.map(droppedEntry));
            }, reject);
        }),
    };
}
// Wraps a browser FileSystemEntry. The DOM types have no guard for the
// two kinds, so `isDirectory` decides and the casts follow it.
export function droppedEntry(entry) {
    if (entry.isDirectory) {
        const folder = entry;
        return {
            kind: "folder",
            name: entry.name,
            path: entry.fullPath,
            reader: () => readerOf(folder),
        };
    }
    const fileEntry = entry;
    return {
        kind: "file",
        name: entry.name,
        path: entry.fullPath,
        file: () => new Promise((resolve, reject) => {
            fileEntry.file(resolve, reject);
        }),
    };
}
