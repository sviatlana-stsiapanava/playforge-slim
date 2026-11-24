import { assertTextEquals, assertVisible } from "../assertions";
import { env } from "../framework/config/env";
import { test } from "../framework/fixtures/app.fixture";
import { LoginPage } from "../pages/LoginPage";

const displayName = "test_epam_course";
const wrongPassword = "wrong_password";
const loginErrorText = "Your email or password is incorrect!";

// Covers TC-LOGIN-LOGOUT-001 and TC-LOGIN-LOGOUT-002 from test-cases/login-logout.md
test("user can log in, log out, and is rejected with a wrong password @ui", async ({ page }) => {
  const { TEST_PASSWORD: password, TEST_USERNAME: email } = env;
  if (!email || !password) {
    throw new Error("Set TEST_USERNAME and TEST_PASSWORD in .env to run the auth test.");
  }

  const loginPage = await new LoginPage(page).open();
  await loginPage.login({ email, password });
  await assertVisible(loginPage.header.loggedInAs(displayName));

  await loginPage.header.logoutCurrentUser();
  await loginPage.isOpened();
  await assertVisible(loginPage.loginForm);

  await loginPage.login({ email, password: wrongPassword });
  await assertTextEquals(loginPage.loginError, loginErrorText);
});
