import routes from './../../src/routes';

describe('Constructor page works correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  const dropIngredientByTypeToConstructor = type => {
    cy.get(`[data-testid="ingredientCard"][data-type="${type}"]`).first().trigger('dragstart');
    cy.get('[data-testid="constructor"]').trigger('drop');
  };

  describe('Ingredient modal works correctly', () => {
    const openModal = () => {
      cy.get('[data-testid="ingredientCard"]').first().click();
    };

    it('Should open ingredient modal', () => {
      openModal();
      cy.get('[data-testid="modal"]').should('be.visible');
    });

    it('Should shown ingredient data', () => {
      cy.get('[data-testid="modal"] img').should('exist');
      cy.get('[data-testid="modal"] [data-testid="ingredientName"]').should('exist');
      cy.get('[data-testid="modal"]').contains('Калории');
      cy.get('[data-testid="modal"]').contains('Белки');
      cy.get('[data-testid="modal"]').contains('Жиры');
      cy.get('[data-testid="modal"]').contains('Углеводы');
    });

    it('Should close ingredient modal', () => {
      cy.get('[data-testid="modalCloseBtn"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('Should close modal on ESC press', () => {
      openModal();
      cy.document().trigger('keydown', { key: 'Escape'});
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });


  describe('Drag & Drop ingredient works correctly', () => {
    it('Should drop bun in constructor', () => {
      dropIngredientByTypeToConstructor('bun');
      cy.get('[data-testid="orderItem"]').should('have.length', 2);
    });

    it('Should drop filling in constructor', () => {
      dropIngredientByTypeToConstructor('main');
      cy.get('[data-testid="orderItem"]').should('have.length', 3);
    });

    it('Should move ingredient in constuctor', () => {
      dropIngredientByTypeToConstructor('sauce');
      cy.get('[data-testid="orderItem"][data-type="sauce"] [data-testid="orderItemDragIcon"]')
        .trigger('dragstart')
      cy.get('[data-testid="orderItem"]').eq(1)
        .trigger('dragenter')
        .trigger('drop');
      cy.get('[data-testid="orderItem"]').eq(1).invoke('attr', 'data-type').should('eq', 'sauce');
    });
  });

  describe('Constructor works correctly', () => {
    it('Should update ingredient counter', () => {
      cy.get('[data-testid="ingredientCard"]').last().trigger('dragstart');
      cy.get('[data-testid="constructor"]').trigger('drop');
      cy.get('[data-testid="ingredientCard"] [data-testid="ingredientCounter"]').last().contains(1);
    });

    it('Should remove ingredient', () => {
      cy.get('[data-testid="orderItem"]').its('length').then(length => {
        cy.get('[data-testid="orderItem"][data-type="main"] .constructor-element__action')
          .first()
          .click();
        cy.get('[data-testid="orderItem"]').should('have.length', length - 1);
      });
    });

    it('Should shown correct order price', () => {
      cy.get('[data-testid="orderItem"] .constructor-element__price').then(prices => {
        let calculedValue = 0;
        prices.each((index, el) => {
          calculedValue += +el.innerText;
        });
        cy.get('[data-testid="orderPrice"]').should('have.text', calculedValue);
      });
    });
  });

  describe('Create order works correctly', () => {
    beforeEach(() => {
      cy.intercept(routes.orders, (req) => {
        req.alias = 'createOrder';
        req.reply({
          fixture: 'order',
          delay: 1000,
        });
      });
    });

    it('Should redirect to login if refreshToken is undefined', () => {
      cy.getCookie('refreshToken').then(value => {
        if (!value) {
          cy.get('[data-testid="createOrderBtn"]').click();
          cy.url().should('include', 'login');
        }
      })
    });

    it('Should create order if refreshToken exist', () => {
      cy.getCookie('refreshToken').then(value => {
        if (value) {
          cy.get('[data-testid="createOrderBtn"]').click();
          cy.url().should('eq', 'http://localhost:3000/#/');

          cy.wait('@createOrder').then(() => {
            cy.get('[data-testid="orderItem"]').should('not.exist');
            cy.get('[data-testid="orderPrice"]').should('not.exist');
            cy.get('[data-testid="modal"]').should('be.visible');
          });
        }
      })
    });
  });
});
