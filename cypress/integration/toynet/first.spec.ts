/* eslint-disable no-magic-numbers */

describe('The first test', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('renders the correct number of elements', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.contains('Try it').click();
    cy.contains(/router/i);
    cy.contains(/r0/);

    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid=plus-icon]').first().click();
      cy.wait(500);
    }

    cy.contains(/r6/i).should('not.exist');
  });
});