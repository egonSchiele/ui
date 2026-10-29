export type DropZoneRejection = {
  file?: File;
  code: "file-type" | "too-many-files" | "invalid-payload" | "unreadable";
  message: string;
};

// One file of a selection, in the order the browser gave it.
export type DropZoneChoice =
  | { accepted: true; file: File }
  | { accepted: false; rejection: DropZoneRejection };

// A file a selection carried, or the reason it couldn't be read.
export type FoundFile = { file: File } | { rejection: DropZoneRejection };

// A folder's reader. Each call gives the next batch of entries, and an
// empty batch at the end.
export type DroppedFolderReader = { next: () => Promise<DroppedEntry[]> };

// The parts of a FileSystemEntry the folder walk reads. Tests build these
// directly, because a test can't make a real folder entry.
export type DroppedEntry =
  | { kind: "file"; name: string; path: string; file: () => Promise<File> }
  | {
      kind: "folder";
      name: string;
      path: string;
      reader: () => DroppedFolderReader;
    };

// What one dropped item gave during the drop event. Both must be read
// during the event, because the browser clears the items after it.
export type DroppedItem = { entry: DroppedEntry | null; file: File | null };

type ChooseOptions = { accept?: string; multiple?: boolean };

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

function rejected(rejection: DropZoneRejection): DropZoneChoice {
  return { accepted: false, rejection };
}

// Applies `accept` and `multiple` to the files a selection found, keeping
// their order.
export function chooseFiles(
  found: FoundFile[],
  { accept, multiple }: ChooseOptions,
): DropZoneChoice[] {
  let acceptedCount: number = 0;
  return found.map((item: FoundFile): DropZoneChoice => {
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
function isHidden(name: string): boolean {
  return name.startsWith(".");
}

// True when any folder on a picked file's relative path is hidden.
export function inHiddenFolder(file: File): boolean {
  return file.webkitRelativePath.split("/").some(isHidden);
}

function unreadable(path: string, error: unknown): FoundFile {
  console.error(`DropZone could not read ${path}.`, error);
  return {
    rejection: { code: "unreadable", message: `${path} could not be read.` },
  };
}

function byName(left: DroppedEntry, right: DroppedEntry): number {
  return left.name.localeCompare(right.name);
}

// A folder's reader returns at most 100 entries per call in Chrome, so
// the walk reads until a call returns none.
async function readAllEntries(
  reader: DroppedFolderReader,
): Promise<DroppedEntry[]> {
  const entries: DroppedEntry[] = [];
  for (;;) {
    const batch: DroppedEntry[] = await reader.next();
    if (batch.length === 0) {
      return entries;
    }
    entries.push(...batch);
  }
}

async function readEntry(entry: DroppedEntry): Promise<FoundFile[]> {
  try {
    if (entry.kind === "file") {
      return [{ file: await entry.file() }];
    }
    const entries: DroppedEntry[] = await readAllEntries(entry.reader());
    const visible: DroppedEntry[] = entries
      .filter((child: DroppedEntry): boolean => !isHidden(child.name))
      .sort(byName);
    const found: FoundFile[][] = await Promise.all(visible.map(readEntry));
    return found.flat();
  } catch (error: unknown) {
    return [unreadable(entry.path, error)];
  }
}

async function readItem(item: DroppedItem): Promise<FoundFile[]> {
  if (item.entry !== null && item.entry.kind === "folder") {
    return readEntry(item.entry);
  }
  return item.file === null ? [] : [{ file: item.file }];
}

// The files a drop carried, with each dropped folder replaced by the
// files inside it, subfolders included. A dropped file keeps its place
// among the folders. Hidden files and folders inside a folder are left
// out, and a read that fails becomes an "unreadable" rejection.
export async function readDroppedItems(
  items: DroppedItem[],
): Promise<FoundFile[]> {
  const found: FoundFile[][] = await Promise.all(items.map(readItem));
  return found.flat();
}

function readerOf(folder: FileSystemDirectoryEntry): DroppedFolderReader {
  const reader: FileSystemDirectoryReader = folder.createReader();
  return {
    next: (): Promise<DroppedEntry[]> =>
      new Promise((resolve, reject): void => {
        reader.readEntries(
          (entries: FileSystemEntry[]): void => {
            resolve(entries.map(droppedEntry));
          },
          reject,
        );
      }),
  };
}

// Wraps a browser FileSystemEntry. The DOM types have no guard for the
// two kinds, so `isDirectory` decides and the casts follow it.
export function droppedEntry(entry: FileSystemEntry): DroppedEntry {
  if (entry.isDirectory) {
    const folder = entry as FileSystemDirectoryEntry;
    return {
      kind: "folder",
      name: entry.name,
      path: entry.fullPath,
      reader: (): DroppedFolderReader => readerOf(folder),
    };
  }
  const fileEntry = entry as FileSystemFileEntry;
  return {
    kind: "file",
    name: entry.name,
    path: entry.fullPath,
    file: (): Promise<File> =>
      new Promise((resolve, reject): void => {
        fileEntry.file(resolve, reject);
      }),
  };
}
