import { assertVisible } from "../assertions";
import { env } from "../framework/config/env";
import { test } from "../framework/fixtures/app.fixture";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

const displayName = "test_epam_course";

test("registered user can log in from the main page @ui", async ({ page }) => {
  const { TEST_PASSWORD: password, TEST_USERNAME: email } = env;
  if (!email || !password) {
    throw new Error("Set TEST_USERNAME and TEST_PASSWORD in .env to run the login test.");
  }

  const homePage = await new HomePage(page).open();
  await homePage.header.openSignupLogin();

  const loginPage = new LoginPage(page);
  await loginPage.isOpened();
  await loginPage.login({ email, password });

  await homePage.isOpened();
  await assertVisible(homePage.header.loggedInAs(displayName));
});
