import { expect, test, type Locator } from "@playwright/test";

test("pending buttons block activation and preserve explicit disabled state", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=examples-button-states--pending-actions-example&viewMode=story",
  );
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("button", { name: "Toggle pending" }).click();
  for (const name of ["Saving…", "Keep label"]) {
    const pendingButton: Locator = page.getByRole("button", { name });
    await expect(pendingButton).not.toHaveAttribute("disabled");
    await expect(pendingButton).toHaveAttribute("aria-busy", "true");
    await expect(pendingButton).toHaveAttribute("aria-disabled", "true");
    await pendingButton.dispatchEvent("click");
    await pendingButton.focus();
    await pendingButton.press("Enter");
    await pendingButton.press(" ");
  }
  for (const name of ["Opening…", "Composing…"]) {
    const link: Locator = page.getByRole("link", { name });
    await expect(link).toHaveAttribute("aria-busy", "true");
    await expect(link).toHaveAttribute("aria-disabled", "true");
    await expect(link).toHaveAttribute("tabindex", "-1");
    await link.dispatchEvent("click");
    await link.focus();
    await link.press("Enter");
  }
  await expect(page.getByText("Activations: 1")).toBeVisible();
  expect(new URL(page.url()).hash).toBe("");
  await page.getByRole("button", { name: "Toggle pending" }).click();
  await expect(
    page.getByRole("button", { name: "Save", exact: true }),
  ).toBeEnabled();
  await expect(
    page.getByRole("button", { name: "Unavailable" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("link", { name: "Composed link" }),
  ).toHaveAttribute("href", "#child-target");
  await page.getByRole("link", { name: "Composed link" }).click();
  await expect(page.getByText("Activations: 2")).toBeVisible();
});

test("a button keeps focus while its own click makes it pending", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=examples-button-states--self-pending-action-example&viewMode=story",
  );
  const queue: Locator = page.getByRole("button", { name: "Queue" });
  await queue.focus();
  await queue.press("Enter");
  const queuing: Locator = page.getByRole("button", { name: "Queuing…" });
  await expect(queuing).toHaveAttribute("aria-disabled", "true");
  await expect(queuing).toBeFocused();
  await queuing.press("Enter");
  await expect(page.getByText("Queued: 1")).toBeVisible();
  await page.getByRole("button", { name: "Finish" }).click();
  await queue.focus();
  await queue.press("Enter");
  await expect(page.getByText("Queued: 2")).toBeVisible();
});

test("compact headings name sections and accept explicit focus targets", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=typography-sectionheading--compact&viewMode=story",
  );
  const section: Locator = page.getByRole("region", { name: "Preview" });
  const heading: Locator = section.getByRole("heading", {
    name: "Preview",
    level: 2,
  });
  await page.getByRole("button", { name: "Focus preview heading" }).click();
  await expect(heading).toBeFocused();
  await expect(
    section.getByRole("button", { name: "Download image" }),
  ).toBeInViewport();
  await expect(
    section.getByRole("button", { name: "Save to library" }),
  ).toBeInViewport();
});

test("helper text provides a static accessible field description", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=typography-helpertext--field-description&viewMode=story",
  );
  await expect(
    page.getByRole("textbox", { name: "Image title" }),
  ).toHaveAccessibleDescription(
    "A short title helps you find the image later.",
  );
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("full-width segments share available space and retain arrow-key selection", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=ui-segmentedcontrol--full-width&viewMode=story",
  );
  const group: Locator = page.getByRole("radiogroup", {
    name: "Settings tier",
  });
  const groupWidth: number = await group.evaluate(
    (element: HTMLElement): number => element.getBoundingClientRect().width,
  );
  expect(groupWidth).toBe(320);
  const widths: number[] = await group
    .getByRole("radio")
    .evaluateAll((elements: HTMLElement[]): number[] =>
      elements.map(
        (element: HTMLElement): number => element.getBoundingClientRect().width,
      ),
    );
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1);
  await group.getByRole("radio", { name: "Basic" }).focus();
  await page.keyboard.down("ArrowRight");
  await expect(group.getByRole("radio", { name: "Advanced" })).toBeChecked();
  await page.keyboard.up("ArrowRight");
  await page.keyboard.down("ArrowRight");
  await expect(group.getByRole("radio", { name: "Basic" })).toBeChecked();
  await page.keyboard.up("ArrowRight");
});

for (const custom of [true, false]) {
  test(`field backgrounds ${custom ? "use their own token" : "fall back to the input token"} while borders stay independent`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=examples-field-background--${custom ? "custom" : "fallback"}&viewMode=story`,
    );
    const fields: Locator[] = [
      page.getByRole("textbox", { name: "Title", exact: true }),
      page.getByRole("textbox", { name: "Description" }),
      page.getByRole("spinbutton", { name: "Count" }),
    ];
    for (const field of fields) {
      await expect(field).toHaveCSS(
        "background-color",
        custom ? "rgb(20, 30, 40)" : "rgb(60, 70, 80)",
      );
      await expect(field).toHaveCSS("border-top-color", "rgb(60, 70, 80)");
    }
  });
}

test("banners forward alert semantics and allow paragraph plus action content", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=ui-banner--rich-content&viewMode=story");
  const alert: Locator = page.getByRole("alert", {
    name: "The image could not be saved.",
  });
  await expect(alert.getByRole("button", { name: "Try again" })).toBeVisible();
  await expect(alert.locator("p p, p div")).toHaveCount(0);
});

test("long default ComboBox labels stay inside the trigger and preserve their accessible name", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=examples-combobox--long-selected-label&viewMode=story",
  );
  const trigger: Locator = page.getByRole("button", {
    name: "Model: Long repository name / illustration-model-version-with-detailed-configuration",
    exact: true,
  });
  await expect(trigger).toBeVisible();
  const label: Locator = trigger.locator("span");
  await expect(label).toHaveCSS("text-overflow", "ellipsis");
  await expect(label).toHaveCSS("overflow-x", "hidden");
  expect(
    await label.evaluate(
      (element: HTMLElement): boolean =>
        element.scrollWidth > element.clientWidth,
    ),
  ).toBe(true);
  expect(
    await trigger.evaluate(
      (element: HTMLElement): boolean =>
        element.scrollWidth <= element.clientWidth,
    ),
  ).toBe(true);
  await trigger.click();
  await expect(
    page.getByRole("option", {
      name: "Long repository name / illustration-model-version-with-detailed-configuration",
    }),
  ).toBeVisible();
});
