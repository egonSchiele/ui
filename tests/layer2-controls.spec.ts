import { expect, test, type Locator, type Page } from "@playwright/test";
test("scalar Slider reports keyboard changes, commits, external resets, and bounds", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-slider--default&viewMode=story");
  const slider: Locator = page.getByRole("slider", { name: "Volume" });
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "30");
  await expect(page.getByText("Value: 30; committed: 30")).toBeVisible();
  await page.keyboard.press("End");
  await expect(slider).toHaveAttribute("aria-valuenow", "100");
  await page.getByRole("button", { name: "Reset volume" }).click();
  await expect(slider).toHaveAttribute("aria-valuenow", "0");
});
test("nullable LabeledSlider shows the default without committing it", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-labeledslider--default&viewMode=story");
  const slider: Locator = page.getByRole("slider", { name: "Strength" });
  const input: Locator = page.getByRole("spinbutton", { name: "Strength" });
  await expect(input).toHaveValue("");
  await expect(input).toHaveAttribute("placeholder", "0.75");
  await expect(slider).toHaveAttribute("aria-valuenow", "0.75");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(input).toHaveValue("0.8");
  await expect(page.getByText("Value: 0.8; committed: 0.8")).toBeVisible();
  await input.fill("0");
  await input.press("Enter");
  await expect(slider).toHaveAttribute("aria-valuenow", "0");
  await input.fill("0.25");
  await input.press("Tab");
  await expect(slider).toHaveAttribute("aria-valuenow", "0.25");
  await page.getByRole("button", { name: "Reset Strength" }).click();
  await expect(input).toHaveValue("");
  await expect(slider).toHaveAttribute("aria-valuenow", "0.75");
  await input.fill("0.");
  await page.getByRole("button", { name: "External update" }).click();
  await expect(input).toHaveValue("0.5");
  await expect(slider).toHaveAttribute("aria-valuenow", "0.5");
});
test("disabled LabeledSlider cannot change from keyboard or reset", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-labeledslider--disabled&viewMode=story");
  await expect(
    page.getByRole("spinbutton", { name: "Strength" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Reset Strength" }),
  ).toBeDisabled();
  await expect(page.getByRole("slider")).toHaveAttribute("data-disabled", "");
});
test("Progress distinguishes zero, determinate, and unknown progress", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-progress--zero&viewMode=story");
  await expect(
    page.getByRole("progressbar", { name: "Preparing files" }),
  ).toHaveAttribute("aria-valuenow", "0");
  await page.goto("/iframe.html?id=ui-progress--default&viewMode=story");
  await expect(
    page.getByRole("progressbar", { name: "Preparing files" }),
  ).toHaveAttribute("aria-valuenow", "45");
  await page.goto("/iframe.html?id=ui-progress--indeterminate&viewMode=story");
  await expect(
    page.getByRole("progressbar", { name: "Preparing files" }),
  ).not.toHaveAttribute("aria-valuenow");
  await expect(page.getByText("In progress")).toBeVisible();
});
test("ScrollArea exposes the viewport and supports keyboard scrolling", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-scrollarea--default&viewMode=story");
  const viewport: Locator = page.getByRole("region", { name: "Files" });
  await viewport.focus();
  await viewport.press("PageDown");
  await expect
    .poll(
      async (): Promise<number> =>
        viewport.evaluate((element: HTMLElement): number => element.scrollTop),
    )
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Scroll to last file" }).click();
  await expect
    .poll(
      async (): Promise<boolean> =>
        viewport.evaluate(
          (element: HTMLElement): boolean =>
            element.scrollTop + element.clientHeight >=
            element.scrollHeight - 1,
        ),
    )
    .toBe(true);
});
test("panels emit completed keyboard changes with stable panel ids", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-resizable--default&viewMode=story");
  const handle: Locator = page.getByRole("separator", {
    name: "Resize sidebar",
  });
  await expect(
    page.getByText("Saved sidebar: 30%; user changes: 0"),
  ).toBeVisible();
  await handle.focus();
  await handle.press("ArrowRight");
  await expect(
    page.getByText("Saved sidebar: 35%; user changes: 1"),
  ).toBeVisible();
  await handle.press("Enter");
  await expect(
    page.getByText("Saved sidebar: 0%; user changes: 2"),
  ).toBeVisible();
  await handle.press("Enter");
  await expect(
    page.getByText("Saved sidebar: 35%; user changes: 3"),
  ).toBeVisible();
});
test("vertical panels use vertical resize keys", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  await page.goto("/iframe.html?id=ui-resizable--vertical&viewMode=story");
  const handle: Locator = page.getByRole("separator", {
    name: "Resize sidebar",
  });
  await expect(handle).toHaveAttribute("aria-orientation", "horizontal");
  await handle.focus();
  await handle.press("ArrowDown");
  await expect(
    page.getByText("Saved sidebar: 35%; user changes: 1"),
  ).toBeVisible();
});
test("panel drag persists only after pointer release", async ({
  page,
}: {
  page: Page;
}): Promise<void> => {
  await page.goto("/iframe.html?id=ui-resizable--default&viewMode=story");
  const handle: Locator = page.getByRole("separator", {
    name: "Resize sidebar",
  });
  const bounds: { x: number; y: number; width: number; height: number } | null =
    await handle.boundingBox();
  if (!bounds) {
    throw new Error("Resize handle is not visible");
  }
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(bounds.x + 80, bounds.y + bounds.height / 2, {
    steps: 5,
  });
  await expect(
    page.getByText("Saved sidebar: 30%; user changes: 0"),
  ).toBeVisible();
  await page.mouse.up();
  await expect(page.locator("output")).toContainText("user changes: 1");
  await expect(page.locator("output")).not.toContainText("Saved sidebar: 30%");
});
test("context menu supports keyboard invocation, disabled entries, submenus, and focus restoration", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-contextmenu--default&viewMode=story");
  const trigger: Locator = page.getByRole("button", { name: "File actions" });
  await trigger.focus();
  await trigger.press("Shift+F10");
  await expect(page.getByRole("menu")).toBeVisible();
  await expect(
    page.getByRole("menuitem", { name: "Unavailable" }),
  ).toHaveAttribute("aria-disabled", "true");
  await expect(
    page.getByRole("menuitem", { name: "Open", exact: false }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem", { name: "Move to" })).toBeFocused();
  await page.keyboard.press("Home");
  await page.keyboard.press("Enter");
  await expect(page.getByText("Action: Opened")).toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click({ button: "right" });
  await page.getByRole("menuitem", { name: "Move to" }).hover();
  await page.getByRole("menuitem", { name: "Archive", exact: true }).click();
  await expect(page.getByText("Action: Archived")).toBeVisible();
});
