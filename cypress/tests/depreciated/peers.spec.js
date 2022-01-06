// const serverUrl = Cypress.env('serverUrl');

// // FEEDBACK
// // Think we should use test ids here, rather than a list

// describe('peers tab flow', () => {
//   beforeEach(() => {
//     // network stub
//     cy.server();
//   });

//   it('should log user into app', () => {
//     cy.login();
//   });

//   it('should take user to peers tab', () => {
//     cy.fixture('peer/peers.json').as('peersData');
//     cy.route(
//       'GET',
//       `${serverUrl}/cohorts/9550cc85-305a-438c-a115-e791a16c91f0/peers.json`,
//       '@peersData'
//     ).as('peers');

//     cy.get('#peers-1').click({
//       multiple: true,
//       force: true
//     });
//     cy.get('[data-testid=peers-grid]').children().should('have.length', 11);
//     //checks for correct name
//     cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-name]').should(
//       'have.text',
//       'Daniel Fragiadakis'
//     );
//     //checks for correct company
//     cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-company]').should(
//       'have.text',
//       'Upwork'
//     );
//     //checks for correct current position
//     cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-position]').should(
//       'have.text',
//       'Economist'
//     );
//   });

//   it('should take user to list view and check user have right data', () => {
//     cy.get('[data-testid=view-mode]').click();
//     cy.get('[data-testid=peer-table-view]').click();
//     cy.get('[data-testid=peers-list]').children().should('have.length', 11);
//     //check if user have right user name
//     cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-name]').should(
//       'have.text',
//       'Daniel Fragiadakis'
//     );
//     //check if user company is correct
//     cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-company]').should(
//       'have.text',
//       'Upwork'
//     );
//     //check if user current position is correct
//     cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-position]').should(
//       'have.text',
//       'Economist'
//     );
//     //check if user strength is correct
//     cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-strength]').should(
//       'have.text',
//       'Aaaaa'
//     );
//     //check if user interest is correct
//     cy.get('[data-testid=peer-9550cc85-305a-438c-a115-e791a16c91f0-interest]').should(
//       'have.text',
//       'Aaaaa'
//     );
//   });

//   it('should open the modal', () => {
//     cy.get('[data-testid=student-row-9550cc85-305a-438c-a115-e791a16c91f0]').click();
//     //company is correct
//     cy.get('[data-testid=company-name]').should('have.text', 'Upwork');
//     //email is correct
//     cy.get('[data-testid=user-email]').should('have.text', 'danfragiadakis@upwork.com');
//     //strengths are displayed correctly
//     cy.get('[data-testid=strength-0]').should('have.text', 'Aaaaa');
//     //interests are displayed correctly
//     cy.get('[data-testid=interest-0]').should('have.text', 'Aaaaa');
//     //discord url is correct
//     cy.get('[data-testid=discord-url]')
//       .should('have.attr', 'href')
//       .and('equal', 'https://discordapp.com/users/876953098659192852');
//     //linkedin url is correct
//     cy.get('[data-testid=linkedin-url]')
//       .should('have.attr', 'href')
//       .and('equal', 'https://www.linkedin.com/in/daniel-fragiadakis-678ba890');
//     //name is correct on Discord and Linkedin social links
//     cy.get('[data-testid=discord-text]').should('have.text', 'Message Daniel on Discord');
//     cy.get('[data-testid=linkedin-text]').should('have.text', 'Connect with Daniel on LinkedIn');
//     cy.get('[data-testid=close-modal]').click({ force: true });
//   });

//   // FEEDBACK
//   // need to break this block down into and it block for each type of filter
//   //filter by companies
//   it('alows users to filter by company', () => {
//     cy.get('[data-testid=company-select]').click();
//     //selects upwork from list
//     cy.get('[data-value=Upwork]').click();
//     cy.get('[data-testid=peers-list]').children().should('have.length', 1);
//     //unselect upwork and selects dropbox
//     cy.get('[data-value=Upwork]').click();
//     cy.get('[data-value=Dropbox]').click();
//     cy.get('[data-testid=peers-list]').children().should('have.length', 2);
//     //selects amazon and adobe
//     cy.get('[data-value=Amazon]').click();
//     cy.get('[data-value=Adobe]').click();
//     cy.get('[data-testid=peers-list]').children().should('have.length', 4);
//     cy.get('.MuiBackdrop-root').click({
//       multiple: true,
//       force: true
//     });
//   });
//   //filter by strengths
//   it('alows users to filter by strength', () => {
//     cy.get('[data-testid=strength-select]').click();
//     cy.get('[data-value=Teststrength1]').click();
//     cy.get('[data-testid=peers-list]').children().should('have.length', 1);
//     cy.get('[data-value=Test1]').click();
//     cy.get('[data-testid=peers-list]').children().should('have.length', 2);
//     cy.get('.MuiBackdrop-root').click({
//       multiple: true,
//       force: true
//     });
//   });
//   //filter by interests
//   it('alows users to filter by interest', () => {
//     cy.get('[data-testid=interest-select]').click();
//     cy.get('[data-value=Testinterest1]').click();
//     cy.get('[data-testid=peers-list]').children().should('have.length', 1);
//     cy.get('.MuiBackdrop-root').click({
//       multiple: true,
//       force: true
//     });
//   });
// });
