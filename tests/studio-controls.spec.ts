import { expect, test, type Locator } from "@playwright/test";

test("compact NumberField restores invalid blur drafts without changing the value", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-numberfield--compact-restore&viewMode=story",
  );
  const field: Locator = page.getByRole("spinbutton", { name: "Width" });
  await expect(
    page.getByRole("button", { name: /Increase|Decrease/ }),
  ).toHaveCount(0);
  for (const draft of ["12a", ""]) {
    await field.fill(draft);
    await page.getByRole("button", { name: "Leave field" }).click();
    await expect(field).toHaveValue("42");
    await expect(page.getByRole("alert")).toHaveCount(0);
    await expect(page.getByText("Value: 42; changes: 0")).toBeVisible();
  }
  await field.fill("12a");
  await field.press("Enter");
  await expect(page.getByRole("alert")).toHaveText("Enter a finite number.");
  await field.press("Tab");
  await expect(field).toHaveValue("42");
  await field.fill("56");
  await field.press("Tab");
  await expect(page.getByText("Value: 56; changes: 1")).toBeVisible();
  await field.press("Shift+ArrowUp");
  await expect(field).toHaveValue("66");
  await field.press("ArrowDown");
  await expect(field).toHaveValue("65");
  await field.fill("0");
  await field.press("Enter");
  await expect(field).toHaveValue("0");
});

test("compact nullable fields preserve null and decimal keyboard stepping", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-numberfield--compact-nullable&viewMode=story",
  );
  const field: Locator = page.getByRole("spinbutton", { name: "Guidance" });
  await expect(field).toHaveValue("");
  await field.press("ArrowUp");
  await expect(field).toHaveValue("0");
  await field.press("ArrowUp");
  await expect(field).toHaveValue("0.1");
  await field.fill("");
  await field.press("Tab");
  await expect(field).toHaveValue("");
});

test("compact slider keeps nullable defaults and forwards invalid blur restoration", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-labeledslider--compact-nullable&viewMode=story",
  );
  const input: Locator = page.getByRole("spinbutton", { name: "Strength" });
  const slider: Locator = page.getByRole("slider", { name: "Strength" });
  await expect(input).toHaveValue("");
  await expect(slider).toHaveAttribute("aria-valuenow", "0.75");
  await expect(
    page.getByText("Value: default; committed: default"),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Increase|Decrease/ }),
  ).toHaveCount(0);
  await input.fill("invalid");
  await input.press("Tab");
  await expect(input).toHaveValue("");
  await input.fill("0.25");
  await input.press("Tab");
  await expect(slider).toHaveAttribute("aria-valuenow", "0.25");
  await expect(page.getByText("Value: 0.25; committed: 0.25")).toBeVisible();
  await input.fill("invalid");
  await page.getByRole("button", { name: "Reset Strength" }).click();
  await expect(input).toHaveValue("");
  await expect(slider).toHaveAttribute("aria-valuenow", "0.75");
});

for (const withLabel of [true, false]) {
  test(`selected renderer preserves full labels and search, label=${withLabel}`, async ({
    page,
  }) => {
    const story: string = withLabel
      ? "selected-display"
      : "selected-display-without-label";
    await page.goto(
      `/iframe.html?id=examples-combobox--${story}&viewMode=story`,
    );
    const name: string = `${withLabel ? "Model: " : ""}Studio model 0 · repository/image-model-0`;
    const trigger: Locator = page.getByRole("button", { name, exact: true });
    await expect(trigger).toHaveText("Model 0");
    await trigger.click();
    await page.getByRole("combobox").fill("repository/image-model-58");
    await expect(page.getByRole("option")).toHaveCount(1);
    await page.getByRole("option").click();
    const updated: Locator = page.getByRole("button", {
      name: `${withLabel ? "Model: " : ""}Studio model 58 · repository/image-model-58`,
      exact: true,
    });
    await expect(updated).toHaveText("Model 58");
    await expect(updated).toBeFocused();
  });
}

for (const width of [800, 600]) {
  for (const modal of [true, false]) {
    test(`nested ComboBox searches, scrolls, selects and closes in Sheet at ${width}px, modal=${modal}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const story: string = modal ? "in-sheet-modal" : "in-sheet-non-modal";
      await page.goto(
        `/iframe.html?id=examples-combobox--${story}&viewMode=story`,
      );
      await page.getByRole("button", { name: "Open settings" }).click();
      const trigger: Locator = page.getByRole("button", {
        name: "Model",
        exact: true,
      });
      await trigger.click();
      const search: Locator = page.getByRole("combobox");
      await search.fill("repository/image-model-58");
      await expect(page.getByRole("option")).toHaveCount(1);
      await search.fill("");
      const list: Locator = page.getByRole("listbox");
      await list.hover();
      await page.mouse.wheel(0, 500);
      await expect
        .poll(
          async (): Promise<number> =>
            list.evaluate((element: HTMLElement): number => element.scrollTop),
        )
        .toBeGreaterThan(0);
      await search.fill("repository/image-model-58");
      await page.getByRole("option").click();
      const selected: Locator = page.getByRole("button", {
        name: "Model: Studio model 58 · repository/image-model-58",
        exact: true,
      });
      await expect(selected).toBeFocused();
      await selected.click();
      await page.getByRole("combobox").press("Escape");
      await expect(page.getByRole("combobox")).toHaveCount(0);
      await expect(
        page.getByRole("dialog", { name: "Settings", exact: true }),
      ).toHaveAttribute("data-state", "open");
      await expect(selected).toBeFocused();
      await page.getByRole("button", { name: "Close", exact: true }).click();
      await expect(
        page.getByRole("button", { name: "Open settings" }),
      ).toBeFocused();
    });
  }
}

test("public Sheet parts open on the right and contain keyboard focus", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=examples-sheet--right&viewMode=story");
  const trigger: Locator = page.getByRole("button", {
    name: "Open",
    exact: true,
  });
  await trigger.click();
  const dialog: Locator = page.getByRole("dialog", {
    name: "Edit profile",
    exact: true,
  });
  const first: Locator = page.getByRole("textbox", {
    name: "Name",
    exact: true,
  });
  const close: Locator = page.getByRole("button", {
    name: "Close",
    exact: true,
  });
  await expect(dialog).toHaveAttribute("data-state", "open");
  await expect(close).toBeInViewport();
  await first.focus();
  await first.press("Shift+Tab");
  await expect(close).toBeFocused();
  await close.press("Tab");
  await expect(first).toBeFocused();
  await first.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
