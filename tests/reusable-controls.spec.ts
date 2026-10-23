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
  await expect(field).toHaveValue("0.1");
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
      name: "Model",
      exact: true,
    });
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
    await page.getByRole("button", { name: "Clear selection" }).click();
    await expect(trigger).toHaveText("Search models");
    await page.getByRole("button", { name: "Select third externally" }).click();
    await expect(trigger).toHaveText("Third model");
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
  await link.focus();
  await expect(page.getByRole("tooltip")).toHaveText("Browse images");
  await page.goto(
    "/iframe.html?id=ui-simpletooltip--icon-trigger&viewMode=story",
  );
  await expect(page.getByRole("button")).toHaveCount(1);
  await page.getByRole("button", { name: "Help" }).focus();
  await expect(page.getByRole("tooltip")).toHaveText("Help with this field");
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
