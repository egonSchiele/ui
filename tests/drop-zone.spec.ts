import { Buffer } from "node:buffer";
import {
  expect,
  test,
  type Locator,
  type Page,
  type JSHandle,
  type FileChooser,
} from "@playwright/test";

type TestFile = {
  name: string;
  mimeType: string;
  buffer: Buffer;
};

const image: TestFile = {
  name: "image.png",
  mimeType: "image/png",
  buffer: Buffer.from("test"),
};

async function fileTransfer(page: Page): Promise<JSHandle<DataTransfer>> {
  return page.evaluateHandle((): DataTransfer => {
    const transfer: DataTransfer = new DataTransfer();
    transfer.items.add(new File(["test"], "drop.png", { type: "image/png" }));
    return transfer;
  });
}

async function pasteFiles(
  target: Locator,
  transfer: JSHandle<DataTransfer>,
): Promise<void> {
  await target.evaluate(
    (element: Element, clipboardData: DataTransfer): void => {
      element.dispatchEvent(
        new ClipboardEvent("paste", {
          bubbles: true,
          cancelable: true,
          clipboardData,
        }),
      );
    },
    transfer,
  );
}

test("picker selection enforces types and resets for selecting the same file twice", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-dropzone--default&viewMode=story");
  const input: Locator = page.getByLabel("Files for Images", { exact: true });
  await input.setInputFiles(image);
  await input.setInputFiles(image);
  await expect(page.getByText("Received: image.png, image.png")).toBeVisible();
  await input.setInputFiles({
    name: "text.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("text"),
  });
  await expect(
    page.getByText("Rejected: text.txt is not an accepted file type."),
  ).toBeVisible();
});
test("internal drag advertises eligibility before decoding only on drop", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-dropzone--default&viewMode=story");
  const zone: Locator = page.getByRole("group", {
    name: "Images",
    exact: true,
  });
  const transfer: JSHandle<DataTransfer> = await page.evaluateHandle(
    (): DataTransfer => {
      const data: DataTransfer = new DataTransfer();
      data.setData("application/x-demo-names", "invalid");
      return data;
    },
  );
  await zone.dispatchEvent("dragenter", { dataTransfer: transfer });
  await zone.dispatchEvent("dragover", { dataTransfer: transfer });
  await expect(zone).toHaveAttribute("data-drag-active", "true");
  await expect(page.getByText("Rejected: none")).toBeVisible();
  await zone.dispatchEvent("drop", { dataTransfer: transfer });
  await expect(zone).not.toHaveAttribute("data-drag-active");
  await expect(
    page.getByText("Rejected: The dropped data could not be read."),
  ).toBeVisible();
  await transfer.evaluate((data: DataTransfer): void => {
    data.setData("application/x-demo-names", '["fixture"]');
  });
  await zone.dispatchEvent("drop", { dataTransfer: transfer });
  await expect(page.getByText("Received: fixture")).toBeVisible();
});
test("nested zones handle a drop exactly once", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  await page.goto("/iframe.html?id=ui-dropzone--nested&viewMode=story");
  const transfer: JSHandle<DataTransfer> = await fileTransfer(page);
  await page
    .getByRole("group", { name: "Inner", exact: true })
    .dispatchEvent("drop", { dataTransfer: transfer });
  await expect(page.getByText("Outer: 0; inner: 1")).toBeVisible();
});
test("file drops reject excess files and disabled zones ignore them", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-dropzone--default&viewMode=story");
  const transfer: JSHandle<DataTransfer> = await fileTransfer(page);
  await transfer.evaluate((data: DataTransfer): void => {
    data.items.add(new File(["test"], "second.png", { type: "image/png" }));
  });
  await page
    .getByRole("group", { name: "Images", exact: true })
    .dispatchEvent("drop", { dataTransfer: transfer });
  await expect(page.getByText("Received: drop.png")).toBeVisible();
  await expect(
    page.getByText("Rejected: Choose one file at a time."),
  ).toBeVisible();
  await page.goto("/iframe.html?id=ui-dropzone--disabled&viewMode=story");
  const disabledTransfer: JSHandle<DataTransfer> = await fileTransfer(page);
  await page
    .getByRole("group", { name: "Images", exact: true })
    .dispatchEvent("drop", { dataTransfer: disabledTransfer });
  await expect(page.getByText("Received: none")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Choose file for Images" }),
  ).toBeDisabled();
});
test("paste is scoped to the focused zone and leaves text editing alone", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-dropzone--default&viewMode=story");
  const transfer: JSHandle<DataTransfer> = await fileTransfer(page);
  await pasteFiles(
    page.getByRole("textbox", { name: "Outside text" }),
    transfer,
  );
  await pasteFiles(page.getByRole("textbox", { name: "Caption" }), transfer);
  await expect(page.getByText("Received: none")).toBeVisible();
  const zone: Locator = page.getByRole("group", {
    name: "Images",
    exact: true,
  });
  await zone.focus();
  await pasteFiles(zone, transfer);
  await expect(page.getByText("Received: drop.png")).toBeVisible();
});
test("active paste accepts outside noneditable targets but never text fields", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-dropzone--active-paste&viewMode=story");
  const transfer: JSHandle<DataTransfer> = await fileTransfer(page);
  await pasteFiles(
    page.getByRole("textbox", { name: "Outside text" }),
    transfer,
  );
  await expect(page.getByText("Received: none")).toBeVisible();
  await pasteFiles(page.locator("body"), transfer);
  await expect(page.getByText("Received: drop.png")).toBeVisible();
});
test("interactive children do not open the picker; zone keyboard access does", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-dropzone--default&viewMode=story");
  let pickerCount: number = 0;
  page.on("filechooser", (): void => {
    pickerCount += 1;
  });
  await page.getByRole("button", { name: "Child action" }).click();
  await expect(page.getByText("Child clicks: 1")).toBeVisible();
  expect(pickerCount).toBe(0);
  const zone: Locator = page.getByRole("group", {
    name: "Images",
    exact: true,
  });
  await zone.focus();
  const chooser: Promise<FileChooser> = page.waitForEvent("filechooser");
  await zone.press("Enter");
  await (await chooser).setFiles(image);
  await expect(page.getByText("Received: image.png")).toBeVisible();
  expect(pickerCount).toBe(1);
});

test("drag activity survives movement over a child until the final leave", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  await page.goto("/iframe.html?id=ui-dropzone--default&viewMode=story");
  const zone: Locator = page.getByRole("group", {
    name: "Images",
    exact: true,
  });
  const child: Locator = page.getByRole("button", { name: "Child action" });
  const transfer: JSHandle<DataTransfer> = await fileTransfer(page);
  await zone.dispatchEvent("dragenter", { dataTransfer: transfer });
  await child.dispatchEvent("dragenter", { dataTransfer: transfer });
  await zone.dispatchEvent("dragleave", { dataTransfer: transfer });
  await expect(zone).toHaveAttribute("data-drag-active", "true");
  await child.dispatchEvent("dragleave", { dataTransfer: transfer });
  await expect(zone).not.toHaveAttribute("data-drag-active");
});

test("disabled zones prevent native file navigation without accepting nested drops", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  for (const example of [
    { story: "disabled", label: "Images", result: "Received: none" },
    { story: "nested-disabled", label: "Inner", result: "Outer: 0; inner: 0" },
  ]) {
    await page.goto(
      `/iframe.html?id=ui-dropzone--${example.story}&viewMode=story`,
    );
    const zone: Locator = page.getByRole("group", {
      name: example.label,
      exact: true,
    });
    await expect(zone).toBeVisible();
    const prevented: boolean[] = await zone.evaluate(
      (element: Element): boolean[] => {
        const dataTransfer: DataTransfer = new DataTransfer();
        dataTransfer.items.add(
          new File(["test"], "drop.png", { type: "image/png" }),
        );
        return ["dragover", "drop"].map((type: string): boolean => {
          const event: DragEvent = new DragEvent(type, {
            dataTransfer,
            bubbles: true,
            cancelable: true,
          });
          element.dispatchEvent(event);
          return event.defaultPrevented;
        });
      },
    );
    await expect(zone).not.toHaveAttribute("data-drag-active");
    expect(prevented).toEqual([true, true]);
    await expect(page.getByText(example.result)).toBeVisible();
  }
});

test("DropZone instructions match file count, paste scope, and caller labels", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  await page.goto("/iframe.html?id=ui-dropzone--default&viewMode=story");
  await expect(
    page.getByRole("group", { name: "Images", exact: true }),
  ).toHaveAccessibleDescription(
    "Drop a file here, or paste while this area is focused.",
  );
  await expect(
    page.getByRole("button", { name: "Choose file for Images" }),
  ).toHaveText("Choose file");
  await page.goto("/iframe.html?id=ui-dropzone--multiple-files&viewMode=story");
  await expect(
    page.getByRole("group", { name: "Images", exact: true }),
  ).toHaveAccessibleDescription(
    "Drop files here, or paste while this area is focused.",
  );
  await expect(
    page.getByRole("button", { name: "Choose files for Images" }),
  ).toHaveText("Choose files");
  await page.goto("/iframe.html?id=ui-dropzone--active-paste&viewMode=story");
  await expect(
    page.getByRole("group", { name: "Images", exact: true }),
  ).toHaveAccessibleDescription("Drop a file here, or paste a file.");
  await page.goto(
    "/iframe.html?id=ui-dropzone--custom-instructions&viewMode=story",
  );
  await expect(
    page.getByRole("group", { name: "Reference image", exact: true }),
  ).toHaveAccessibleDescription(
    "Drag an image from the gallery, paste an image, or browse.",
  );
  const picker: Locator = page.getByRole("button", {
    name: "Browse image for Reference image",
  });
  await expect(picker).toHaveText("Browse image");
  const chooser: Promise<FileChooser> = page.waitForEvent("filechooser");
  await picker.click();
  await (await chooser).setFiles(image);
});

async function mixedTransfer(page: Page): Promise<JSHandle<DataTransfer>> {
  return page.evaluateHandle((): DataTransfer => {
    const transfer: DataTransfer = new DataTransfer();
    transfer.items.add(new File(["png"], "a.png", { type: "image/png" }));
    transfer.items.add(new File(["text"], "notes.txt", { type: "text/plain" }));
    transfer.items.add(new File(["png"], "b.png", { type: "image/png" }));
    return transfer;
  });
}

test("onSelect reports one drop as one ordered selection", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  await page.goto("/iframe.html?id=ui-dropzone--folders&viewMode=story");
  const transfer: JSHandle<DataTransfer> = await mixedTransfer(page);
  await page
    .getByRole("group", { name: "Images", exact: true })
    .dispatchEvent("drop", { dataTransfer: transfer });
  await expect(page.getByText("Selections: 1")).toBeVisible();
  await expect(
    page.getByText(
      "Selection 1: a.png accepted, notes.txt file-type, b.png accepted",
    ),
  ).toBeVisible();
});

test("Choose folder picks a folder's files and leaves out hidden ones", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  await page.goto("/iframe.html?id=ui-dropzone--folders&viewMode=story");
  await expect(
    page.getByRole("group", { name: "Images", exact: true }),
  ).toHaveAccessibleDescription(
    "Drop files or folders here, or paste while this area is focused.",
  );
  await page
    .getByLabel("Folder for Images", { exact: true })
    .setInputFiles("tests/fixtures/picked-folder");
  await expect(page.getByText("Selections: 1")).toBeVisible();
  const line: string =
    (await page.getByText(/^Selection 1:/).textContent()) ?? "";
  expect(line).toContain("a.png accepted");
  expect(line).toContain("b.png accepted");
  expect(line).toContain("notes.txt file-type");
  expect(line).not.toContain("c.png");
  expect(line).not.toContain("DS_Store");
});

test("DropArea shows its overlay during a drag and takes drops and pastes", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  await page.goto("/iframe.html?id=ui-dropzone--area&viewMode=story");
  const content: Locator = page.getByTestId("area-content");
  const area: Locator = page.locator('[data-slot="drop-zone"]');
  await expect(area).not.toHaveAttribute("tabindex");
  const transfer: JSHandle<DataTransfer> = await mixedTransfer(page);
  await content.dispatchEvent("dragenter", { dataTransfer: transfer });
  await content.dispatchEvent("dragover", { dataTransfer: transfer });
  await expect(page.locator('[data-slot="drop-area-overlay"]')).toHaveText(
    "Drop images to add them",
  );
  await content.dispatchEvent("drop", { dataTransfer: transfer });
  await expect(page.locator('[data-slot="drop-area-overlay"]')).toHaveCount(0);
  await expect(
    page.getByText(
      "Selection 1: a.png accepted, notes.txt file-type, b.png accepted",
    ),
  ).toBeVisible();
  await pasteFiles(page.getByRole("textbox", { name: "Area text" }), transfer);
  await expect(page.getByText("Selections: 1")).toBeVisible();
  await pasteFiles(page.locator("body"), transfer);
  await expect(page.getByText("Selections: 2")).toBeVisible();
});
