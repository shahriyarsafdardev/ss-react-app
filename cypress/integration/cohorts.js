const serverUrl = Cypress.env('serverUrl');

describe('todo app', () => {
  beforeEach(() => {
    // fixtures
    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    // cy.fixture('todos/add.json').as('addTodoJSON');
    // cy.fixture('todos/all_after.json').as('updatedJSON');

    // network stub
    cy.server();
    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('getAllCohorts');
    // cy.visit('/');
    // cy.get('h1').contains('Todo List');
  });

  // it('should display the todo list', () => {
  //   cy.get('li').its('length').should('eq', 3);
  //   cy.get('li').q(0).contains('go for a walk');
  // });

  it('should add a new todo to the list', () => {
    // network stubs
    // cy.server();
    // await page.waitForSelector("input[name='email']");
    cy.visit('/');
    it.only('fills input', () => {
      const email = 'aqibmaqqbool@gmail.com';
      cy.get("input[name='email']").type(email).should('have.value', email);
      cy.get("input[name='password']").type('aqib1234');
    });
    cy.fixture('cohorts/login.json').as('loginData');
    cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
    cy.get('.MuiLoadingButton-root').click();
    // cy.pause();
    cy.wait('@login');
    // await page.click("input[name='email']");
    // await page.type("input[name='email']", 'aqibmaqqbool@gmail.com');

    // await page.click("input[name='password']");
    // await page.type("input[name='password']", 'aqib1234');
    // cy.route('post', `${serverUrl}/login.json`, '@loginData').as('login');
    // cy.visit('/');
    // cy.wait('@login');
    // asserts
    // cy.get('.input').type('drink a beverage');
    // cy.get('.button').contains('Submit').click();
    // cy.wait('@addTodo');
    // cy.wait('@getAllTodos');
    // cy.get('li').its('length').should('eq', 4);
    // cy.get('li').eq(0).contains('go for a walk');
    // cy.get('li').eq(3).contains('drink a beverage');
  });

  // it('should toggle a todo correctly', () => {
  //   cy.get('li')
  //     .eq(0)
  //     .contains('go for a walk')
  //     .should('have.css', 'text-decoration', 'none solid rgb(74, 74, 74)');
  //   cy.get('li').eq(0).contains('go for a walk').click();
  //   cy.get('li')
  //     .eq(0)
  //     .contains('go for a walk')
  //     .should('have.css', 'text-decoration', 'line-through solid rgb(74, 74, 74)');
  // });
});
