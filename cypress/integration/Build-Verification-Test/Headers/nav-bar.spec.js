/// <reference types="cypress" />

const active_url      = Cypress.env('ACTIVE_URL'); // read README.md for correct initialization

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(err)
  return false
})

context('Navigation Bar Validation', () => {
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

  it('Can check amazon logo exist', () => {
    cy.get('a.nav-logo-sprites')
      .should('be.visible')

    cy.get('a.nav-logo-sprites')
      .should('have.attr', 'aria-label', 'amazon.in')
  })
  it('Can verify location exist', () => {
    cy.get('#nav-global-location-popover-link')
      .should('be.visible')
  })
  it('Can Verify search field exist', () => {
    cy.get('.nav-search-field ')
      .should('be.visible')
  })
  it('Can Verify search icon exist', () => {
    cy.get('#nav-search-submit-button ')
      .should('be.visible')
  })
  it('Can Verify language dropdown exist', () => {
    cy.get('#icp-nav-flyout')
      .should('be.visible')
  })
  it('Can Verify account list dropdown exist', () => {
    cy.get('#nav-link-accountList ')
      .should('be.visible')
  })
  it('Can Verify orders link exist', () => {
    cy.get('#nav-orders')
      .should('be.visible')
  })
  it('Can Verify cart icon exist', () => {
    cy.get('#nav-cart')
      .should('be.visible')
  })
  it('Can Verify cart count exist', () => {
    cy.get('#nav-cart-count')
      .should('be.visible')
  })
})
