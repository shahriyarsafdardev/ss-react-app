const serverUrl = Cypress.env('serverUrl');

describe('todo app', () => {
  beforeEach(() => {
    // fixtures
    // cy.fixture('cohorts/cohorts.json').as('cohortsData');
    // cy.fixture('todos/add.json').as('addTodoJSON');
    // cy.fixture('todos/all_after.json').as('updatedJSON');

    // network stub
    cy.server();
    // cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('getAllCohorts');
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
    const email = 'aqibmaqqbool@gmail.com';
    const password = 'aqib1234';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);

    cy.intercept('POST', `${serverUrl}/users/login`, { fixture: 'cohorts/login.json' }).as('login');
    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    console.log('url ->>>', serverUrl);
    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');

    // cy.fixture('cohorts/login.json').as('loginData');
    // console.log('url ->>>', serverUrl);
    // cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
    cy.get('[data-testid=loginBtn]').click();
    // cy.get('.MuiLoadingButton-root').click();

    // cy.pause();
    cy.wait('@login');
    // await page.click("input[name='email']");
    // await page.type("input[name='email']", 'aqibmaqqbool@gmail.com');

    // await page.click("input[name='password']");
    // await page.type("input[name='password']", 'aqib1234');
    // cy.route('post', `${serverUrl}/login.json`, '@loginData').as('login');

    // cy.intercept('GET', `${serverUrl}/cohorts.json`, {
    //   fixture: 'cohorts/cohorts.json'
    // }).as('cohorts');
    // cy.route(
    //   'GET',
    //   'https://scholarsite-staging.herokuapp.com/api/v1/cohorts.json',
    //   '@cohortsData'
    // ).as('cohorts');

    // cy.visit('http://localhost:3000/cohorts/8864c717-587d-472a-929a-8e5f298024da-1/sessions');
    // cy.wait('@login');
    // asserts
    // cy.get('.input').type('drink a beverage');
    // cy.get('.button').contains('Submit').click();
    // http://localhost:3000/__cypress/xhrs/https://scholarsite-staging.herokuapp.com/api/v1/cohorts
    // cy.wait('@addTodo');
    // cy.wait('@getAllTodos');
    // cy.get('li').its('length').should('eq', 4);
    // cy.get('li').eq(0).contains('go for a walk');
    // cy.get('li').eq(3).contains('drink a beverage');
  });

  // it('should toggle a todo correctly', () => {
  //   cy.fixture('cohorts/cohorts.json').as('cohortsData');
  //   cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
  //   cy.wait('@cohorts');
  //   //   cy.get('li')
  //   //     .eq(0)
  //   //     .contains('go for a walk')
  //   //     .should('have.css', 'text-decoration', 'none solid rgb(74, 74, 74)');
  //   //   cy.get('li').eq(0).contains('go for a walk').click();
  //   //   cy.get('li')
  //   //     .eq(0)
  //   //     .contains('go for a walk')
  //   //     .should('have.css', 'text-decoration', 'line-through solid rgb(74, 74, 74)');
  // });
});
