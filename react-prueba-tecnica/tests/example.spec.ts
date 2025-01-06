// @ts-check
import { test, expect } from "@playwright/test";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";
const LOCALHOST_URL = "http://localhost:5173/";

test("app shows random fact and image", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole("heading", { level: 2 }).textContent();
  console.log("Texto del h2:", text);
  console.log(text, "text");
  const image = await page.locator("img");
  const imageSrc = await image?.getAttribute("src");
  if (text?.length === 0 || !text) {
    console.log("text is empty");
  }
  await expect(text?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy();
});
