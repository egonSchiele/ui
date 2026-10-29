import { expect, test } from "@playwright/test";
import {
  chooseFiles,
  readDroppedItems,
  type DroppedEntry,
  type DroppedFolderReader,
  type FoundFile,
} from "../lib/components/ui/drop-zone-files";

function fakeFile(path: string): DroppedEntry {
  const name: string = path.split("/").at(-1) ?? path;
  return {
    kind: "file",
    name,
    path,
    file: (): Promise<File> =>
      Promise.resolve(new File(["png"], name, { type: "image/png" })),
  };
}

// A folder whose reader gives `batches` one call at a time, then an empty
// batch, as a browser's reader does.
function fakeFolder(path: string, batches: DroppedEntry[][]): DroppedEntry {
  return {
    kind: "folder",
    name: path.split("/").at(-1) ?? path,
    path,
    reader: (): DroppedFolderReader => {
      const remaining: DroppedEntry[][] = [...batches];
      return {
        next: (): Promise<DroppedEntry[]> =>
          Promise.resolve(remaining.shift() ?? []),
      };
    },
  };
}

function names(found: FoundFile[]): string[] {
  return found.map((item: FoundFile): string =>
    "file" in item ? item.file.name : item.rejection.code,
  );
}

test("a folder walk reads subfolders in name order and every batch", async (): Promise<void> => {
  const folder: DroppedEntry = fakeFolder("/trip", [
    [fakeFile("/trip/c.png"), fakeFolder("/trip/b", [[fakeFile("/trip/b/x.png")]])],
    [fakeFile("/trip/a.png")],
  ]);
  const found: FoundFile[] = await readDroppedItems([
    { entry: folder, file: null },
  ]);
  expect(names(found)).toEqual(["a.png", "x.png", "c.png"]);
});

test("a folder walk skips hidden files and folders", async (): Promise<void> => {
  const folder: DroppedEntry = fakeFolder("/trip", [
    [
      fakeFile("/trip/.DS_Store"),
      fakeFolder("/trip/.git", [[fakeFile("/trip/.git/index.png")]]),
      fakeFile("/trip/a.png"),
    ],
  ]);
  const found: FoundFile[] = await readDroppedItems([
    { entry: folder, file: null },
  ]);
  expect(names(found)).toEqual(["a.png"]);
});

test("a failed read becomes an unreadable rejection", async (): Promise<void> => {
  const broken: DroppedEntry = {
    kind: "file",
    name: "broken.png",
    path: "/trip/broken.png",
    file: (): Promise<File> => Promise.reject(new Error("gone")),
  };
  const folder: DroppedEntry = fakeFolder("/trip", [
    [broken, fakeFile("/trip/fine.png")],
  ]);
  const found: FoundFile[] = await readDroppedItems([
    { entry: folder, file: null },
  ]);
  expect(names(found)).toEqual(["unreadable", "fine.png"]);
  expect(found[0]).toEqual({
    rejection: {
      code: "unreadable",
      message: "/trip/broken.png could not be read.",
    },
  });
});

test("a dropped file keeps its place among the folders", async (): Promise<void> => {
  const first: File = new File(["png"], "first.png", { type: "image/png" });
  const last: File = new File(["png"], "last.png", { type: "image/png" });
  const found: FoundFile[] = await readDroppedItems([
    { entry: fakeFile("/first.png"), file: first },
    { entry: fakeFolder("/trip", [[fakeFile("/trip/middle.png")]]), file: null },
    { entry: null, file: last },
  ]);
  expect(names(found)).toEqual(["first.png", "middle.png", "last.png"]);
});

test("choices keep the selection's order across accepted and rejected files", (): void => {
  const found: FoundFile[] = [
    { file: new File(["png"], "a.png", { type: "image/png" }) },
    { file: new File(["text"], "notes.txt", { type: "text/plain" }) },
    { rejection: { code: "unreadable", message: "x could not be read." } },
    { file: new File(["png"], "b.png", { type: "image/png" }) },
  ];
  const choices = chooseFiles(found, { accept: "image/png", multiple: true });
  expect(
    choices.map((choice): string =>
      choice.accepted ? choice.file.name : choice.rejection.code,
    ),
  ).toEqual(["a.png", "file-type", "unreadable", "b.png"]);
  const single = chooseFiles(found, { accept: "image/png", multiple: false });
  expect(
    single.map((choice): string =>
      choice.accepted ? choice.file.name : choice.rejection.code,
    ),
  ).toEqual(["a.png", "file-type", "unreadable", "too-many-files"]);
});
