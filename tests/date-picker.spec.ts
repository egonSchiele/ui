import { expect, test } from "@playwright/test";

test("selecting a date closes the calendar, restores focus, and submits a local date", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-datepicker--default&viewMode=story");
  const trigger = page.getByRole("button", { name: "Appointment date" });

  await expect(trigger).toHaveText("Pick a date");
  await trigger.click();
  await page.getByRole("button", { name: /October 15th, 2026/ }).click();

  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toHaveText("October 15th, 2026");
  await expect(trigger).toBeFocused();
  expect(await page.locator("form").evaluate((form: HTMLFormElement) =>
    new FormData(form).get("appointment")
  )).toBe("2026-10-15");

  await trigger.click();
  await expect(page.getByRole("grid", { name: "October 2026" })).toBeVisible();
  await expect(page.getByRole("button", { name: /October 15th, 2026/ })).toBeFocused();
});

test("controlled selection can be cleared externally", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-datepicker--controlled&viewMode=story");
  const trigger = page.getByRole("button", { name: "Appointment date" });

  await trigger.click();
  await page.getByRole("button", { name: /October 15th, 2026/ }).click();
  await expect(page.getByText("Selected date: 2026-10-15")).toBeVisible();
  await page.getByRole("button", { name: "Clear date" }).click();
  await expect(trigger).toHaveText("Pick a date");
  await expect(page.getByText("Selected date: None")).toBeVisible();
});

test("selecting the current day clears an uncontrolled value", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-datepicker--with-initial-date&viewMode=story");
  const trigger = page.getByRole("button", { name: "Appointment date" });

  await trigger.click();
  await page.getByRole("button", { name: /October 5th, 2026/ }).click();
  await expect(trigger).toHaveText("Pick a date");
  await expect(page.locator('input[name="appointment"]')).toHaveValue("");
});

test("disabled pickers cannot open and do not submit a value", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-datepicker--disabled&viewMode=story");
  await expect(page.getByRole("button", { name: "Appointment date" })).toBeDisabled();
  await page.getByText("Appointment date", { exact: true }).click({ force: true });
  await expect(page.getByRole("dialog")).toBeHidden();
  expect(await page.locator("form").evaluate((form: HTMLFormElement) =>
    new FormData(form).has("appointment")
  )).toBe(false);
});

test("disabled dates cannot be selected", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-datepicker--disabled-dates&viewMode=story");
  await page.getByRole("button", { name: "Appointment date" }).click();

  await expect(page.getByRole("button", { name: /October 2nd, 2026/ })).toBeDisabled();
  await expect(page.getByRole("button", { name: /October 10th, 2026/ })).toBeDisabled();
  await page.getByRole("button", { name: /October 10th, 2026/ }).click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator('input[name="appointment"]')).toHaveValue("");
  await page.getByRole("button", { name: /October 6th, 2026/ }).click();
  await expect(page.locator('input[name="appointment"]')).toHaveValue("2026-10-06");
});

test("keyboard navigation selects a day and Escape dismisses without changing it", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-datepicker--with-initial-date&viewMode=story");
  const trigger = page.getByRole("button", { name: "Appointment date" });

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: /October 5th, 2026/ })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: /October 6th, 2026/ })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveText("October 6th, 2026");

  await trigger.click();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveText("October 6th, 2026");
});

test("month and year dropdowns navigate to the chosen date", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-datepicker--month-and-year-dropdowns&viewMode=story");
  await page.getByRole("button", { name: "Appointment date" }).click();
  await page.getByRole("combobox", { name: /year/i }).selectOption("2000");
  await page.getByRole("combobox", { name: /month/i }).selectOption("0");
  await page.getByRole("button", { name: /January 15th, 2000/ }).click();
  await expect(page.locator('input[name="appointment"]')).toHaveValue("2000-01-15");
});

test("locale applies to both the displayed date and the calendar", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-datepicker--localized&viewMode=story");
  const trigger = page.getByRole("button", { name: "Appointment date" });

  await expect(trigger).toHaveText("5 octobre 2026");
  await trigger.click();
  await expect(page.getByRole("grid", { name: "octobre 2026" })).toBeVisible();
});

test("the standalone calendar supports selecting a single day", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-calendar--default&viewMode=story");
  await page.getByRole("button", { name: /October 15th, 2026/ }).click();
  await expect(page.getByRole("gridcell", { name: /October 15th, 2026/ })).toHaveAttribute("aria-selected", "true");
});

test("the standalone calendar can extend a range across two months", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-calendar--date-range&viewMode=story");
  await expect(page.getByRole("grid")).toHaveCount(2);
  await page.getByRole("button", { name: /November 12th, 2026/ }).click();
  await expect(page.getByRole("button", { name: /October 5th, 2026/ })).toHaveAttribute("data-range-start", "true");
  await expect(page.getByRole("button", { name: /October 12th, 2026/ })).toHaveAttribute("data-range-middle", "true");
  await expect(page.getByRole("button", { name: /November 12th, 2026/ })).toHaveAttribute("data-range-end", "true");
});
