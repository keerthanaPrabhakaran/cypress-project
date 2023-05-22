/// <reference types="cypress" />

const user_id         = Cypress.env('USER_ID');
const invalid_user_id = Cypress.env('INVALID_USER_ID');
const user_passw      = Cypress.env('USER_PASSW');
const invalid_passw   = Cypress.env('INVALID_USER_PASSW');
const active_url      = Cypress.env('ACTIVE_URL');  // read README.md for correct initialization

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(err)
  return false
})

context('Login spec', () => {
  let spyWinConsoleLog;

  before(() => {
    // visits amazon website
    cy.visit(active_url)
  });

  beforeEach(() => {
    cy.window().then((win) => {
      spyWinConsoleLog = cy.spy(win.console, 'log')
    })
  })

  afterEach(() => {
    expect(spyWinConsoleLog).to.not.be.called;
  })

  // for wrong user name with correct password
  it('Can check user cant able to login by using invalid user', () => {
    // login your account
    cy.get('#nav-link-accountList-nav-line-1').click();
    cy.get('#ap_email')
      .click()

    cy.get('#ap_email')
      .type(`${invalid_user_id}`);

    cy.get('.a-button-inner > #continue').click();
    cy.get('#auth-error-message-box').should('be.visible')
  })

  // for correct username but wrong password
  it('Can check user cant able to login by using invalid password', () => {
    cy.visit(`${active_url}`);
    cy.get('#nav-link-accountList-nav-line-1').click();
    cy.get('#ap_email')
      .click()

    cy.get('#ap_email')
      .type(`${user_id}`);

    cy.get('.a-button-inner > #continue').click();
    cy.get('#ap_password')
      .click()

    cy.get('#ap_password')
      .type(`${invalid_passw}`);

    cy.get('#signInSubmit').click();

    cy.get('#auth-error-message-box')
      .should('be.visible');
  })

  // for correct username and correct password(successfull login)
  it('Can login successfuly by using valid credentials', () => {
    cy.visit(`${active_url}`);
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
  })
})
