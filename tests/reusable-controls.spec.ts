import { expect, test, type Locator } from "@playwright/test";

test("number drafts preserve zero and decimals until commit, and Escape restores", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-numberfield--controlled&viewMode=story");
  const field: Locator = page.getByRole("spinbutton", { name: "Guidance" });
  await expect(field).toHaveValue("0");
  await field.fill("1.");
  await expect(field).toHaveValue("1.");
  await expect(page.getByText("Committed: 0", { exact: true })).toBeVisible();
  await field.press("Escape");
  await expect(field).toHaveValue("0");
  await field.fill("1.26");
  await field.press("Enter");
  await expect(field).toHaveValue("1.3");
  await expect(page.getByText("Committed: 1.3", { exact: true })).toBeVisible();
});

test("number commits reject invalid text and clamp bounds", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-numberfield--controlled&viewMode=story");
  const field: Locator = page.getByRole("spinbutton", { name: "Guidance" });
  await field.fill("Infinity");
  await field.press("Tab");
  await expect(field).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("alert")).toHaveText("Enter a finite number.");
  await expect(page.getByText("Committed: 0", { exact: true })).toBeVisible();
  await field.fill("20");
  await field.press("Enter");
  await expect(field).toHaveValue("10");
  await expect(
    page.getByRole("button", { name: "Increase Guidance" }),
  ).toBeDisabled();
});

test("external values replace a draft, empty values remain null, and keyboard steps work", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-numberfield--controlled&viewMode=story");
  const field: Locator = page.getByRole("spinbutton", { name: "Guidance" });
  await field.fill("2.");
  await page.getByRole("button", { name: "Set to five" }).click();
  await expect(field).toHaveValue("5");
  await field.press("Shift+ArrowUp");
  await expect(field).toHaveValue("6");
  await field.press("ArrowDown");
  await expect(field).toHaveValue("5.9");
  await field.fill("");
  await field.press("Enter");
  await expect(
    page.getByText("Committed: default", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Increase Guidance" }).click();
  await expect(field).toHaveValue("0");
  await page.getByRole("button", { name: "Reset to default" }).click();
  await expect(field).toHaveValue("");
});

test("required number rejects empty text and disabled controls stay disabled", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-numberfield--required&viewMode=story");
  const field: Locator = page.getByRole("spinbutton", { name: "Steps" });
  await field.fill("");
  await field.press("Enter");
  await expect(page.getByRole("alert")).toHaveText("Enter a number.");
  await field.press("Escape");
  await expect(field).toHaveValue("4");
  await page.goto("/iframe.html?id=ui-numberfield--disabled&viewMode=story");
  await expect(page.getByRole("spinbutton")).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Increase Steps" }),
  ).toBeDisabled();
});

test("segmented radio keeps its active choice and arrows skip disabled options", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-segmentedcontrol--controlled&viewMode=story",
  );
  const basic: Locator = page.getByRole("radio", { name: "Basic" });
  await basic.click();
  await expect(basic).toBeChecked();
  await basic.focus();
  await page.keyboard.down("ArrowRight");
  await expect(page.getByRole("radio", { name: "Advanced" })).toBeChecked();
  await page.keyboard.up("ArrowRight");
  await page.keyboard.down("ArrowRight");
  await expect(basic).toBeChecked();
  await page.keyboard.up("ArrowRight");
  await expect(page.getByRole("radio", { name: "Expert" })).toBeDisabled();
});

for (const width of [1100, 390]) {
  test(`combobox groups, label search, duplicate labels and external reset at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(
      "/iframe.html?id=examples-combobox--controlled-grouped&viewMode=story",
    );
    const trigger: Locator = page.getByRole("button", {
      name: /^Model(?::|$)/,
    });
    await expect(trigger).toHaveAccessibleName("Model: Shared name");
    await trigger.click();
    await expect(page.getByText("Family A", { exact: true })).toBeVisible();
    await expect(page.getByText("Family B", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("option", { name: "Unavailable" }),
    ).toHaveAttribute("aria-disabled", "true");
    await page.getByRole("combobox").fill("Shared name");
    await expect(page.getByRole("option")).toHaveCount(2);
    await page.getByRole("option", { name: "Shared name 8 GB" }).click();
    await expect(page.getByText("Selected key: two")).toBeVisible();
    await expect(trigger).toBeFocused();
    await trigger.click();
    const selectedRow: Locator = page.getByRole("option", {
      name: "Shared name 8 GB",
    });
    await expect(selectedRow).toHaveAttribute("aria-selected", "true");
    await expect(
      selectedRow.locator('[data-slot="combobox-selected"]'),
    ).toBeVisible();
    await expect(
      page
        .getByRole("option", { name: "Shared name 4 GB" })
        .locator('[data-slot="combobox-selected"]'),
    ).toHaveCount(0);
    await page.getByRole("combobox").press("ArrowDown");
    await expect(
      selectedRow.locator('[data-slot="combobox-selected"]'),
    ).toBeVisible();
    await expect(selectedRow).toHaveAttribute("aria-selected", "false");
    await expect(selectedRow).toHaveAccessibleName(/\(current\)$/);
    await page.getByRole("combobox").press("Escape");
    await page.getByRole("button", { name: "Clear selection" }).click();
    await expect(trigger).toHaveText("Search models");
    await expect(trigger).toHaveAccessibleName("Model");
    await page.getByRole("button", { name: "Select third externally" }).click();
    await expect(trigger).toHaveText("Third model");
    await expect(trigger).toHaveAccessibleName("Model: Third model");
    await trigger.click();
    await page.getByRole("combobox").fill("Shared name");
    await page.getByRole("combobox").press("ArrowDown");
    await page.getByRole("combobox").press("Enter");
    await expect(page.getByRole("combobox")).toHaveCount(0);
  });
}

test("combobox loading is announced without options", async ({ page }) => {
  await page.goto("/iframe.html?id=examples-combobox--loading&viewMode=story");
  await page.getByRole("button", { name: "Model" }).click();
  await expect(page.getByRole("status")).toHaveText("Loading options…");
  await expect(page.getByRole("option")).toHaveCount(0);
});

test("tooltip child links and buttons remain one focus target", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-simpletooltip--link-trigger&viewMode=story",
  );
  const link: Locator = page.getByRole("link", { name: "Open library" });
  await expect(page.getByRole("button")).toHaveCount(0);
  await expect(link).not.toHaveAttribute("type");
  await link.focus();
  await expect(page.getByRole("tooltip")).toHaveText("Browse images");
  await page.goto(
    "/iframe.html?id=ui-simpletooltip--icon-trigger&viewMode=story",
  );
  await expect(page.getByRole("button")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Help" })).toHaveAttribute(
    "type",
    "submit",
  );
  await page.getByRole("button", { name: "Help" }).focus();
  await expect(page.getByRole("tooltip")).toHaveText("Help with this field");
  await page.goto(
    "/iframe.html?id=ui-simpletooltip--text-trigger&viewMode=story",
  );
  await expect(
    page.getByRole("button", { name: "More information" }),
  ).toHaveAttribute("type", "button");
});

test("step buttons use the current draft when the committed value is at a bound", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-numberfield--controlled&viewMode=story");
  const field: Locator = page.getByRole("spinbutton", { name: "Guidance" });
  await field.fill("5");
  await page.getByRole("button", { name: "Decrease Guidance" }).click();
  await expect(field).toHaveValue("4.9");
  await field.fill("10");
  await field.press("Enter");
  await field.fill("4");
  await page.getByRole("button", { name: "Increase Guidance" }).click();
  await expect(field).toHaveValue("4.1");
});

test("empty number stepping starts at the minimum, including an uncommitted empty draft", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-numberfield--empty-minimum&viewMode=story",
  );
  const field: Locator = page.getByRole("spinbutton", { name: "Steps" });
  await field.press("ArrowUp");
  await expect(field).toHaveValue("1");
  await page.getByRole("button", { name: "Increase Steps" }).click();
  await expect(field).toHaveValue("2");
  await field.fill("");
  await page.getByRole("button", { name: "Increase Steps" }).click();
  await expect(field).toHaveValue("1");
  await field.fill("");
  await page.getByRole("button", { name: "Decrease Steps" }).click();
  await expect(field).toHaveValue("1");
});

test("number stepping stops at the last reachable grid value without extra commits", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-numberfield--in-form&viewMode=story");
  const field: Locator = page.getByRole("spinbutton", { name: "Strength" });
  await field.fill("1");
  await field.press("Enter");
  await expect(field).toHaveValue("0.95");
  await expect(
    page.getByRole("button", { name: "Increase Strength" }),
  ).toBeDisabled();
  await field.press("ArrowUp");
  await expect(page.getByText("Commits: 1", { exact: true })).toBeVisible();
  await field.fill("0.05");
  await field.press("Enter");
  await expect(
    page.getByRole("button", { name: "Decrease Strength" }),
  ).toBeDisabled();
  await field.press("ArrowDown");
  await expect(page.getByText("Commits: 2", { exact: true })).toBeVisible();
});

test("Enter commits a draft before permitting form submission and blocks invalid text", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-numberfield--in-form&viewMode=story");
  const field: Locator = page.getByRole("spinbutton", { name: "Strength" });
  await field.fill("0.35");
  await field.press("Enter");
  await expect(page.getByText("Commits: 1", { exact: true })).toBeVisible();
  await expect(page.getByText("Submissions: 0", { exact: true })).toBeVisible();
  await field.press("Enter");
  await expect(page.getByText("Submissions: 1", { exact: true })).toBeVisible();
  await field.fill("invalid");
  await field.press("Enter");
  await expect(page.getByRole("alert")).toHaveText("Enter a finite number.");
  await field.fill("");
  await field.press("Enter");
  await expect(page.getByRole("alert")).toHaveText("Enter a number.");
  await expect(page.getByText("Submissions: 1", { exact: true })).toBeVisible();
  await expect(page.getByText("Commits: 1", { exact: true })).toBeVisible();
});

for (const width of [1100, 390]) {
  test(`combobox search ignores opaque keys at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(
      "/iframe.html?id=examples-combobox--opaque-keys&viewMode=story",
    );
    await page.getByRole("button", { name: "Preset" }).click();
    await page.getByRole("combobox").fill("face");
    await expect(page.getByRole("option")).toHaveCount(0);
    await expect(page.getByText("No results found.")).toBeVisible();
    await page.getByRole("combobox").fill("portrait");
    await expect(page.getByRole("option")).toHaveCount(1);
    await page.getByRole("option", { name: "Portrait" }).click();
    await expect(
      page.getByRole("button", { name: "Preset: Portrait" }),
    ).toBeVisible();
  });

  test(`re-enabling an open combobox keeps it closed at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(
      "/iframe.html?id=examples-combobox--temporarily-disabled&viewMode=story",
    );
    const trigger: Locator = page.getByRole("button", {
      name: "Status",
      exact: true,
    });
    await page
      .getByRole("button", { name: "Schedule temporary disable" })
      .click();
    await trigger.click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await expect(trigger).toBeDisabled();
    await expect(page.getByRole("listbox")).toHaveCount(0);
    await expect(trigger).toBeEnabled();
    await expect(page.getByRole("listbox")).toHaveCount(0);
    await expect(page.getByRole("combobox")).toHaveCount(0);
    await trigger.click();
    await expect(page.getByRole("listbox")).toBeVisible();
  });
}

test("stepping never moves an out-of-range draft against the step direction", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-numberfield--empty-minimum&viewMode=story",
  );
  const field: Locator = page.getByRole("spinbutton", { name: "Steps" });
  const increase: Locator = page.getByRole("button", { name: "Increase Steps" });
  const decrease: Locator = page.getByRole("button", { name: "Decrease Steps" });
  await field.fill("60");
  await expect(increase).toBeDisabled();
  await field.press("ArrowUp");
  await expect(field).toHaveValue("60");
  await decrease.click();
  await expect(field).toHaveValue("50");
  await field.fill("0");
  await expect(decrease).toBeDisabled();
  await field.press("ArrowDown");
  await expect(field).toHaveValue("0");
  await increase.click();
  await expect(field).toHaveValue("1");
});

test("blur leaves an untouched empty required field quiet, and Enter still rejects it", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-numberfield--empty-minimum&viewMode=story&args=emptyValue:reject",
  );
  const field: Locator = page.getByRole("spinbutton", { name: "Steps" });
  await field.focus();
  await field.press("Tab");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(field).toHaveAttribute("aria-invalid", "false");
  await field.press("Enter");
  await expect(page.getByRole("alert")).toHaveText("Enter a number.");
});

test("invalid marks the input for a caller-owned validation problem", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-numberfield--empty-minimum&viewMode=story&args=invalid:!true",
  );
  await expect(
    page.getByRole("spinbutton", { name: "Steps" }),
  ).toHaveAttribute("aria-invalid", "true");
});
