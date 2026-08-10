import { expect, test } from "@playwright/test";

test.describe("EVOQ experience center smoke", () => {
  test("homepage narrative and rooms open/close", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Enterprises now operate in an age of abundant intelligence.",
      }),
    ).toBeVisible();

    const sections = [
      "section-industry",
      "section-challenge",
      "section-work",
      "section-evoq",
      "section-modes",
      "section-compounding",
      "section-close",
    ];

    for (const id of sections) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }

    await page.getByRole("link", { name: "Step inside Create" }).click();
    await expect(page.getByLabel("Create Room")).toBeVisible();

    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByLabel("Create Room")).toHaveCount(0);
    await expect(page.locator("#section-modes")).toBeVisible();

    await page.getByRole("link", { name: "Step inside Create" }).click();
    await expect(page.getByLabel("Create Room")).toBeVisible();
    await page.getByRole("button", { name: "Start building →" }).click();
    await expect(page).toHaveURL(/\/studio/);
    await expect(
      page.getByRole("heading", { name: "Dream It. Build It." }),
    ).toBeVisible();

    await page.goto("/create");
    await expect(page.getByLabel("Create Room")).toBeVisible();
    await page.getByRole("link", { name: "Back to the full story" }).click();
    await expect(page.getByLabel("Create Room")).toHaveCount(0);

    await page.goto("/transform");
    await expect(page.getByLabel("Transform Room")).toBeVisible();

    await page.goto("/operate");
    await expect(page.getByLabel("Operate Room")).toBeVisible();

    await page.goto("/runtime");
    await expect(
      page.getByRole("heading", { name: "How execution works" }),
    ).toBeVisible();
  });
});
