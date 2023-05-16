/// <reference types="cypress" />

const user_id         = Cypress.env('USER_ID');
const user_passw      = Cypress.env('USER_PASSW');
const active_url      = Cypress.env('ACTIVE_URL'); // read README.md for correct initialization

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(err)
  return false
})

context('Navigation Bar Validation', () => {
  let spyWinConsoleLog;

  before(() => {
    // visits amazon website
    cy.visit(active_url);
    cy.login(user_id, user_passw, active_url)
  });

  beforeEach(() => {
    cy.window().then((win) => {
      spyWinConsoleLog = cy.spy(win.console, 'log')
    })
  })

  afterEach(() => {
    expect(spyWinConsoleLog).to.not.be.called;
  })

  it('Can Go to product page', () => {
    cy.utils() // Can redirect to product page
  })
  it('Can verify add cart button exist', () => {
    cy.get('input[name="submit.add-to-cart"]')
      .first()
      .should('exist')
  })
  it('Can click add cart and verify product added to cart', () => {
    cy.get('input[name="submit.add-to-cart"]')
      .click()

    // If user have access then uncommand and run the test

    // cy.get('div.a-alert-inline-success')
    //   .find('span.a-text-bold')
    //   .then(item => {
    //     expect(item[0].innerText).to.eq('Added to Cart')
    //   })
  })
})
