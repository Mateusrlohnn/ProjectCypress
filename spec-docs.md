# 📄 Test Documentation

## Summary

- Total Test Files: **4**
- Total Individual Tests: **53**
- Cypress Files (.cy): **4**

---

## File: **AdminNavegation.cy.js**

**Path:** cypress\e2e\AdminNavegation.cy.js

**Description:** Administrator Usability Tests
**Author:** Mateus Rachadel Lohn

## Describe: **Administrator Navigation**

### Context: **Administrator Navigation**

#### Tests
- https://front.serverest.dev/login
- Should navigate through all top menu options and return to Home
- Should successfully log out when clicking the Logout button
- Should create a random user and display it in the users list
- Should list users and delete a random user from the system
- Should create a product with controlled data to avoid failures
- Should list products and remove a random product

## File: **Login.cy.js**

**Path:** cypress\e2e\Login.cy.js

**Description:** User Login Tests
**Author:** Mateus Rachadel Lohn

## Describe: **Login tests**

### Context: **Login tests**

#### Tests
- https://front.serverest.dev/login
- Should login successfully
- Should not login with invalid credentials
- Should not login with empty email
- Should not login with empty password
- Should not login with empty credentials
- https://front.serverest.dev/login
- Should login when pressing Enter
- Should keep fields filled after login error
- Should allow clearing fields after error
- Should mark email field as invalid without @
- Should mark email field as invalid without domain
- https://front.serverest.dev/login
- Password field should be masked
- Admin checkbox should be unchecked by default
- Error messages should be generic and not expose system details

## File: **Register.cy.js**

**Path:** cypress\e2e\Register.cy.js

**Description:** User Registration Tests
**Author:** Mateus Rachadel Lohn

## Describe: **Registration Tests**

### Context: **Registration Tests**

#### Tests
- https://front.serverest.dev/login
- Should register a regular user
- Should register user with full name (composed name)
- Should register an admin user
- Should not register without name
- Should not register without email
- Should not register without password
- Should not register with invalid email (missing @)
- Should not register with invalid email (missing domain)
- Should keep fields filled after registration error
- Should allow clearing fields manually
- Password field should be masked
- Password should remain masked while typing
- Admin checkbox should be unchecked by default
- Error messages should not expose internal system details

## File: **UserNavegation.cy.js**

**Path:** cypress\e2e\UserNavegation.cy.js

**Description:** User Usability Tests
**Author:** Mateus Rachadel Lohn

## Describe: **User Navigation**

### Context: **User Navigation**

#### Tests
- https://front.serverest.dev/login
- Should test main menu navigation
- Should logout successfully and redirect to login page
- Should open a products details page and return to the home page
- Should navigate between shopping list, cart and home pages
- https://front.serverest.dev/minhaListaDeProdutos
- https://front.serverest.dev/carrinho
- https://front.serverest.dev/home
- https://front.serverest.dev/minhaListaDeProdutos
- https://front.serverest.dev/carrinho
- https://front.serverest.dev/home
- Should allow typing and searching without breaking the UI
- Should show no results message when searching for a non-existing product
- Should log in and add a random product to the cart
- Should add a random product to the shopping list and then clear the list

