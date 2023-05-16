// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user_id, user_passw, location = null) => {
  cy.getCookies().then(cookies => {
    let found = false;
    cookies.forEach(cookie => {
      if (cookie.name.length === 32) {
        found = true;
      }
    });
    let onLoginPage = false;
    cy.get('body').then(item => {
      const el = item[0].querySelector('#ap_email');
      onLoginPage = el ? true : false;

      if (!found || onLoginPage) {
        cy.get('#nav-link-accountList-nav-line-1').click();
        cy.get('#ap_email')
          .click()

        cy.get('#ap_email')
          .type(`${user_id}`);

        cy.get('.a-button-inner > #continue').click();
        cy.get('#ap_password')
          .click()

        cy.get('#ap_password')
          .type(`${user_passw}`);

        cy.get('#signInSubmit').click();

        cy.get('span.nav-line-1.nav-progressive-content').then(item => {
          cy.log(item[0].innerText)
        })

      } else {
        cy.log('Cookie was found')
      }

      if (location) {
        cy.visit(location);
      }
    });
  })
})

Cypress.Commands.add('utils', () => {
  cy.get('#nav-hamburger-menu')
    .click()

  cy.get('#hmenu-content')
    .should('exist')

  cy.get('.hmenu-visible')
    .find('a.hmenu-item')
    .first()
    .click()

  cy.get('.a-carousel .a-link-normal')
    .first()
    .click()
})
