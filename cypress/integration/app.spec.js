describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should open constructor page by default', () => {
    cy.contains('Соберите бургер');
  });
});