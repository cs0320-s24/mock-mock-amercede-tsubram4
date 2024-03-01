import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("on page load, i see a button", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submit Command" })
  ).toBeVisible();
});

test("after I click the button, its label need not increment", async ({
  page,
}) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submit Command" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.getByRole("button", { name: "Submit Command" })
  ).toBeVisible();
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submit Command" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Command not found");
});

test("after I enter mode once, mode changes", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="We are now in verbose mode"')
  ).toBeVisible();
});

test("after I enter mode twice, mode reverts", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator(
      '.repl-history >> text="Command: mode Output: We are now in brief mode"'
    )
  ).toBeVisible();
});

test("entering view before load_file outputs helpful message", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="File is not loaded"')
  ).toBeVisible();
});

test("entering load_file outputs load message", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="Loaded csv successfully"')
  ).toBeVisible();
});

test("entering nothing outputs helpful message", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="Command not found"')
  ).toBeVisible();
});

test("entering search before load_file outputs helpful message", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="File is not loaded"')
  ).toBeVisible();
});

test("combination of gibberish and all 4 commands", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("access");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="Command not found"')
  ).toBeVisible();

  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="File is not loaded"')
  ).toBeVisible();

  await page.getByLabel("Command input").fill("load_file");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="Loaded csv successfully"')
  ).toBeVisible();

  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator(
      '.repl-history >> text="applebananacherrydogelephantfoxgreenbluered"'
    )
  ).toBeVisible();

  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="dogcatfrogbatdogantgoatbirddog"')
  ).toBeVisible();

  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator('.repl-history >> text="We are now in verbose mode"')
  ).toBeVisible();

  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator(
      '.repl-history >> text="Command: view Output: apple,banana,cherry,dog,elephant,fox,green,blue,red"'
    )
  ).toBeVisible();

  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button", { name: "Submit Command" }).click();
  await expect(
    page.locator(
      '.repl-history >> text="Command: search Output: dog,cat,frog,bat,dog,ant,goat,bird,dog"'
    )
  ).toBeVisible();
});
