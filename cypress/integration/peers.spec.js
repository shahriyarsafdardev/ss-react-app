const serverUrl = Cypress.env('serverUrl');

// FEEDBACK
// Think we should use test ids here, rather than a list

describe('peers tab flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });

  it('should log user into app', () => {
    cy.login();
  });

  it('should take user to peers tab', () => {
    cy.fixture('peer/peers.json').as('peersData');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/peers.json`,
      '@peersData'
    ).as('peers');

    cy.get('#peers-1').click({
      multiple: true,
      force: true
    });
    cy.get('#peer-grid-container').children().should('have.length', 11);

    cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-name]').should(
      'have.text',
      'Daniel Fragiadakis'
    );
    cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-company]').should(
      'have.text',
      'Upwork'
    );
    cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-position]').should(
      'have.text',
      'Economist'
    );
  });

  it('should take user to list view and check user have right data', () => {
    cy.get('[data-testid=user-filters]').children().eq(0).click();
    cy.get('#table-view').click();
    cy.get('#peer-list-container').children().should('have.length', 11);
    //check if user have right user name
    cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-name]').should(
      'have.text',
      'Daniel Fragiadakis'
    );
    //check if user company is correct
    cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-company]').should(
      'have.text',
      'Upwork'
    );
    //check if user current position is correct
    cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-position]').should(
      'have.text',
      'Economist'
    );
    //check if user strength is correct
    cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-strength]').should(
      'have.text',
      'Aaaaa'
    );
    //check if user interest is correct
    cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-interest]').should(
      'have.text',
      'Aaaaa'
    );
  });

  it('should open the modal', () => {
    cy.get('#student-row-9550cc85-305a-438c-a115-e791a16c91f0').click();
    cy.get('[data-testid=company-name]').should('have.text', 'Upwork');
    cy.get('[data-testid=user-email]').should('have.text', 'danfragiadakis@upwork.com');

    cy.get('[data-testid=strength-0]').should('have.text', 'Aaaaa');
    cy.get('[data-testid=interest-0]').should('have.text', 'Aaaaa');
    cy.get('[data-testid=discord-url]')
      .should('have.attr', 'href')
      .and('equal', 'https://discordapp.com/users/876953098659192852');
    cy.get('[data-testid=linkedin-url]')
      .should('have.attr', 'href')
      .and('equal', 'https://www.linkedin.com/in/daniel-fragiadakis-678ba890');
    cy.get('[data-testid=discord-text]').should('have.text', 'Message Daniel on Discord');
    cy.get('[data-testid=linkedin-text]').should('have.text', 'Connect with Daniel on LinkedIn');
    cy.get('[data-testid=close-modal]').click({ force: true });
  });

  // FEEDBACK
  // need to break this block down into and it block for each type of filter
  it('alows users to filter by company', () => {
    cy.get('[data-testid=user-filters]').children().eq(1).click();
    cy.get('[data-value=Upwork]').click();
    cy.get('#peer-list-container').children().should('have.length', 1);
    cy.get('[data-value=Upwork]').click();
    cy.get('[data-value=Dropbox]').click();
    cy.get('#peer-list-container').children().should('have.length', 2);
    cy.get('[data-value=Amazon]').click();
    cy.get('[data-value=Adobe]').click();
    cy.get('#peer-list-container').children().should('have.length', 4);
    cy.get('.MuiBackdrop-root').click({
      multiple: true,
      force: true
    });
  });
  it('alows users to filter by strength', () => {
    cy.get('[data-testid=user-filters]').children().eq(2).click();
    cy.get('[data-value=Teststrength1]').click();
    cy.get('#peer-list-container').children().should('have.length', 1);
    cy.get('[data-value=Test1]').click();
    cy.get('#peer-list-container').children().should('have.length', 2);
    cy.get('.MuiBackdrop-root').click({
      multiple: true,
      force: true
    });
  });
  it('alows users to filter by interest', () => {
    cy.get('[data-testid=user-filters]').children().eq(3).click();
    cy.get('[data-value=Testinterest1]').click();
    cy.get('#peer-list-container').children().should('have.length', 1);
    cy.get('.MuiBackdrop-root').click({
      multiple: true,
      force: true
    });
  });
});
