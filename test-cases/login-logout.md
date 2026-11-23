# Test Cases: Login and logout

Requirement: A user logs in with valid credentials and logs out; after logout the login form is visible again, and logging in with a wrong password shows an error message.
Open questions: none (starting page `/login`, credentials, and exact error text confirmed by the user; only the wrong-password negative case is in scope).

## Case table
| ID | Title | Level | Priority | Preconditions | Test data | Steps | Expected result |
|----|-------|-------|----------|---------------|-----------|-------|-----------------|
| TC-LOGIN-LOGOUT-001 | Valid login then logout returns to the login form | e2e | P1 | App running; user not authenticated; on the login page | Email `test_epam_course@test.com`, password `test_course` | 1. Open the login page. 2. Log in with the valid credentials. 3. Confirm the user is logged in. 4. Log out. | User is shown as logged in after step 3; after logout the login form is visible again |
| TC-LOGIN-LOGOUT-002 | Wrong password after logout shows an error | e2e | P1 | TC-LOGIN-LOGOUT-001 completed (user logged out, login form visible) | Email `test_epam_course@test.com`, password `wrong_password` | 1. Log in with the valid email and the wrong password. | Error message "Your email or password is incorrect!" is visible; user stays logged out |

## Coverage checklist
- [ ] R1 Valid credentials log the user in — TC-LOGIN-LOGOUT-001
- [ ] R2 Logout ends the session and shows the login form — TC-LOGIN-LOGOUT-001
- [ ] R3 Wrong password is rejected with an error — TC-LOGIN-LOGOUT-002
- [ ] O1 Logged-in state visible after valid login — TC-LOGIN-LOGOUT-001
- [ ] O2 Login form visible after logout — TC-LOGIN-LOGOUT-001
- [ ] O3 Exact error text shown for wrong password — TC-LOGIN-LOGOUT-002
