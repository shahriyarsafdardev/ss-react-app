const serverUrl = Cypress.env('serverUrl');

describe('peers tab flow', () => {
  beforeEach(() => {
    // network stub
    cy.server();
    cy.viewport(1400, 700);
  });
  it('should log user into app', () => {
    cy.fixture('cohorts/cohorts.json').as('cohortsData');
    cy.fixture('login/login.json').as('loginData');
    cy.fixture('session/sessions.json').as('sessionData');
    cy.fixture('session/onboarding.json').as('onboardingData');
    cy.route('GET', `${serverUrl}/cohorts.json`, '@cohortsData').as('cohorts');
    cy.route(
      'GET',
      `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/sessions.json`,
      '@sessionData'
    ).as('sessions');
    cy.route('POST', `${serverUrl}/users/login`, '@loginData').as('login');
    cy.route('GET', `${serverUrl}/cohorts/onboarding_complete.json`, '@onboardingData').as(
      'onboarding_complete'
    );

    cy.visit('/');
    const email = 'aqibmaqqbool@gmail.com';
    const password = 'aqib1234';
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);

    cy.get('[data-testid=loginBtn]').click();

    cy.wait('@login');
    cy.wait(3000);
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

    cy.get('#peer-grid-9550cc85-305a-438c-a115-e791a16c91f0').then((peerContainer) => {
      expect(peerContainer.children().length).to.eq(4);
      expect(peerContainer.children()[1].textContent).to.eq('Daniel Fragiadakis');
      expect(peerContainer.children()[2].textContent).to.eq('Upwork');
      expect(peerContainer.children()[3].textContent).to.eq('Economist');
      expect(peerContainer.children()[0]?.children[2].src).to.eq(
        'https://scholarsite-public.s3.eu-west-2.amazonaws.com/daniel-fragiadakis-3e73b9'
      );
    });
  });
  it('should take user to list view', () => {
    cy.get('[data-testid=user-filters]').children().eq(0).click();
    cy.get('#table-view').click();
    cy.get('#peer-list-container').children().should('have.length', 11);

    cy.get('#student-row-9550cc85-305a-438c-a115-e791a16c91f0').then((peerContainer) => {
      expect(peerContainer.children().length).to.eq(5);
      expect(peerContainer.children()[0].children[0].children[1].textContent).to.eq(
        'Daniel Fragiadakis'
      );
      expect(peerContainer.children()[1].textContent).to.eq('Upwork');
      expect(peerContainer.children()[2].textContent).to.eq('Economist');
      expect(peerContainer.children()[0]?.children[0].children[0].children[0].src).to.eq(
        'https://scholarsite-public.s3.eu-west-2.amazonaws.com/daniel-fragiadakis-3e73b9'
      );
      expect(peerContainer.children()[3].children[0].children[0].textContent).to.eq('Aaaaa');
      expect(peerContainer.children()[4].children[0].children[0].textContent).to.eq('Aaaaa');
    });
  });
  it('should open the modal', () => {
    cy.get('#student-row-9550cc85-305a-438c-a115-e791a16c91f0').click();

    cy.get('#student-modal').then((modalContainer) => {
      expect(modalContainer.children()[0].children[1].children[1].textContent).to.eq('Upwork');
      expect(modalContainer.children()[0].children[2].children[1].textContent).to.eq(
        'danfragiadakis@upwork.com'
      );
      expect(modalContainer.children()[0].children[3].children[2].children[0].textContent).to.eq(
        'Aaaaa'
      );
      expect(modalContainer.children()[0].children[5].children[2].children[0].textContent).to.eq(
        'Aaaaa'
      );
      expect(modalContainer.children()[0].children[5].children[2].children).to.have.length(8);
      expect(modalContainer.children()[1].children[1].children[1].href).to.eq(
        'https://discordapp.com/users/876953098659192852'
      );
      expect(modalContainer.children()[1].children[1].children[1].children[0].textContent).to.eq(
        'Message Daniel on Discord'
      );
      expect(modalContainer.children()[1].children[2].children[1].href).to.eq(
        'https://www.linkedin.com/in/daniel-fragiadakis-678ba890'
      );
      expect(modalContainer.children()[1].children[2].children[1].children[0].textContent).to.eq(
        'Connect with Daniel on LinkedIn'
      );
      cy.get('[data-testid=close-modal]').click();
    });
  });
  it('should test peers with filters', () => {
    cy.get('[data-testid=user-filters]').children().eq(1).click();
    cy.get('[data-value=Upwork]').click();
    // cy.get('.css-dzh2z7-MuiBackdrop-root-MuiModal-backdrop').click();
    cy.get('#peer-list-container').children().should('have.length', 1);
    // cy.get('[data-testid=user-filters]').children().eq(1).click();
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
    cy.get('[data-testid=user-filters]').children().eq(2).click();
    cy.get('[data-value=Teststrength1]').click();
    cy.get('#peer-list-container').children().should('have.length', 1);
    cy.get('[data-value=Test1]').click();
    cy.get('#peer-list-container').children().should('have.length', 2);
    cy.get('.MuiBackdrop-root').click({
      multiple: true,
      force: true
    });
    cy.get('[data-testid=user-filters]').children().eq(3).click();
    cy.get('[data-value=Testinterest1]').click();
    cy.get('#peer-list-container').children().should('have.length', 1);
    cy.get('.MuiBackdrop-root').click({
      multiple: true,
      force: true
    });
  });
});
