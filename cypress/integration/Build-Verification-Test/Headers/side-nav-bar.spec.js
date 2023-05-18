/// <reference types="cypress" />
import tm from '../../../fixtures/test-management.json';

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
  });

  beforeEach(() => {
    cy.window().then((win) => {
      spyWinConsoleLog = cy.spy(win.console, 'log')
    })
  })

  afterEach(() => {
    expect(spyWinConsoleLog).to.not.be.called;
  })

  it('Can verify side nav bar exist', () => {
    cy.get('#nav-hamburger-menu')
      .should('be.visible')
  })
  it('Can click on side nav bar', () => {
    cy.get('#nav-hamburger-menu')
      .click()

    cy.get('#hmenu-content')
      .should('exist')
  })
  it('Can list items in side nav bar', () => {
    const header = tm.sideNavHeader;

    cy.get('#hmenu-content')
      .find('.hmenu-visible')
      .find('.hmenu-title')
      .then(item => {
        for (let i = 0; i < header.length; i++) {
          expect(item[i].innerText).to.eq(header[i]);
        }
      })
  })
  it('Can verify close icon exist', () => {
    cy.get('.nav-sprite.hmenu-close-icon')
      .should('exist')
  })
  it('Can click on close icon', () => {
    cy.get('.nav-sprite.hmenu-close-icon')
      .should('exist')
  })
})
