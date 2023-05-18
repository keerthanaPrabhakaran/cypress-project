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

  it('Can click on side nav bar', () => {
    cy.get('#nav-hamburger-menu')
      .click()

    cy.get('#hmenu-content')
      .should('exist')
  })
  it('Can redirect to another page when clicked on items in nav bar', () => {
    cy.get('.hmenu-visible')
      .find('a.hmenu-item')
      .first()
      .then(item => {
        const href = item[0].getAttribute('href');

        cy.get(item[0])
          .click()
        cy.request('GET', `${href}`).then((response) => {
          expect(response.status).equal(200)
        })
          .as('Redirected')
      })
  })
  it('Can verify product is shown', () => {
    cy.get('.a-carousel-card')
      .should('exist')

    cy.get('.a-carousel .a-link-normal')
      .first()
      .then(item => {
        const href = item[0].getAttribute('href');

        cy.get(item[0])
          .click()

        cy.request('GET', `${href}`).then((response) => {
          expect(response.status).equal(200)
        })
          .as('Redirected')
      })
  })
  it('Can verify star rating exist', () => {
    cy.get('.a-icon-star')
      .should('be.visible')
  })
  it('Can verify price symbol and price exist', () => {
    cy.get('.a-price-symbol')
      .should('be.visible')

    cy.get('.a-price-whole')
      .should('be.visible')
  })
  it('Can verify product title exist', () => {
    cy.get('span#productTitle')
      .should('be.visible')

    cy.get('span#productTitle')
      .invoke('text')
      .then(text => {
        cy.log(`${text}`)
      })

    cy.get('span#productTitle')
      .should('have.css', 'font-weight', '700')
  })
})
