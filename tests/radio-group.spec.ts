import { expect, test } from "@playwright/test";

test("label clicks select one option and update the submitted value", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-radiogroup--default&viewMode=story");
  const standard = page.getByRole("radio", { name: "Standard" });
  const express = page.getByRole("radio", { name: "Express" });

  await expect(standard).toBeChecked();
  await page.getByText("Express", { exact: true }).click();
  await expect(express).toBeChecked();
  await expect(standard).not.toBeChecked();
  expect(await page.locator("form").evaluate((form: HTMLFormElement) => new FormData(form).get("shipping"))).toBe("express");
});

test("vertical keyboard navigation wraps and skips disabled options", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-radiogroup--default&viewMode=story");
  const standard = page.getByRole("radio", { name: "Standard" });
  const express = page.getByRole("radio", { name: "Express" });

  await express.click();
  await expect(page.getByRole("radio", { name: "Overnight (unavailable)" })).toBeDisabled();
  await page.keyboard.down("ArrowDown");
  await expect(standard).toBeFocused();
  await expect(standard).toBeChecked();
  await page.keyboard.up("ArrowDown");
});

test("horizontal keyboard navigation selects the next option", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-radiogroup--horizontal&viewMode=story");
  const standard = page.getByRole("radio", { name: "Standard" });
  const express = page.getByRole("radio", { name: "Express" });

  await expect(standard).toBeChecked();
  await standard.focus();
  await page.keyboard.down("ArrowRight");
  await expect(express).toBeFocused();
  await expect(express).toBeChecked();
  await page.keyboard.up("ArrowRight");
});

test("a disabled group keeps its selection and submits no value", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-radiogroup--disabled&viewMode=story");
  await expect(page.getByRole("radio")).toHaveCount(3);
  for (const radio of await page.getByRole("radio").all()) {
    await expect(radio).toBeDisabled();
  }
  // Attempt the label click even though Playwright recognizes its disabled control.
  await page.getByText("Express", { exact: true }).click({ force: true });
  await expect(page.getByRole("radio", { name: "Standard" })).toBeChecked();
  expect(await page.locator("form").evaluate((form: HTMLFormElement) => new FormData(form).has("shipping"))).toBe(false);
});

test("controlled state updates when another option is selected", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-radiogroup--controlled&viewMode=story");
  await expect(page.getByText("Selected: standard")).toBeVisible();
  await page.getByRole("radio", { name: "Express" }).click();
  await expect(page.getByText("Selected: express")).toBeVisible();
});

test("a required group participates in native form validation", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-radiogroup--required&viewMode=story");
  const standard = page.getByRole("radio", { name: "Standard" });
  await expect(standard).not.toBeChecked();
  const form = page.locator("form");

  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(false);
  await standard.click();
  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(true);
});
