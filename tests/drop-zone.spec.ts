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
    page.getByRole("button", { name: "Choose files for Images" }),
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
