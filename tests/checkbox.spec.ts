import { expect, test } from "@playwright/test";

test("label clicks and Space toggle the checkbox and its form value", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-checkbox--default&viewMode=story");
  const checkbox = page.getByRole("checkbox", { name: "Email me product updates" });
  const form = page.locator("form");

  await expect(checkbox).not.toBeChecked();
  await page.getByText("Email me product updates").click();
  await expect(checkbox).toBeChecked();
  expect(await form.evaluate((element: HTMLFormElement) => new FormData(element).get("updates"))).toBe("email");

  await checkbox.press("Space");
  await expect(checkbox).not.toBeChecked();
  expect(await form.evaluate((element: HTMLFormElement) => new FormData(element).has("updates"))).toBe(false);
});

test("the indeterminate example stays mixed until clicked", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-checkbox--indeterminate&viewMode=story");
  const checkbox = page.getByRole("checkbox");

  await expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  await checkbox.click();
  await expect(checkbox).toBeChecked();
});

test("disabled checkboxes cannot be changed through their labels", async ({ page }) => {
  for (const story of ["disabled", "disabled-checked"]) {
    await page.goto(`/iframe.html?id=ui-checkbox--${story}&viewMode=story`);
    const checkbox = page.getByRole("checkbox");
    await expect(checkbox).toBeDisabled();
    // Attempt the label click even though Playwright recognizes its disabled control.
    await page.getByText("Email me product updates").click({ force: true });
    await expect(checkbox).toBeChecked({ checked: story === "disabled-checked" });
    expect(await page.locator("form").evaluate((form: HTMLFormElement) => new FormData(form).has("updates"))).toBe(false);
  }
});

test("controlled state updates when toggled", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-checkbox--controlled&viewMode=story");
  await expect(page.getByText("Not subscribed", { exact: true })).toBeVisible();
  await page.getByRole("checkbox").click();
  await expect(page.getByText("Subscribed", { exact: true })).toBeVisible();
});

test("select all tracks individual selections and clears the group", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-checkbox--group-with-select-all&viewMode=story");
  const selectAll = page.getByRole("checkbox", { name: "Select all" });
  const email = page.getByRole("checkbox", { name: "Email", exact: true });

  await expect(selectAll).toHaveAttribute("aria-checked", "mixed");
  await expect(email).toBeChecked();
  await selectAll.click();
  for (const checkbox of await page.getByRole("checkbox").all()) {
    await expect(checkbox).toBeChecked();
  }

  await email.click();
  await expect(selectAll).toHaveAttribute("aria-checked", "mixed");
  await email.click();
  await expect(selectAll).toBeChecked();
  await selectAll.click();
  for (const checkbox of await page.getByRole("checkbox").all()) {
    await expect(checkbox).not.toBeChecked();
  }
});

test("a required checkbox participates in native form validation", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-checkbox--invalid&viewMode=story");
  const checkbox = page.getByRole("checkbox");
  await expect(checkbox).toBeVisible();
  const form = page.locator("form");

  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(false);
  await checkbox.click();
  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(true);
});
