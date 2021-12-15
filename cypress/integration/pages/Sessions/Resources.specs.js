// import sessionFixture from '../../../fixtures/session/sessions.json';
// describe('Sessions > Resources', () => {
//   before(() => {
//     cy.server();
//     cy.login();
//     cy.get('#sessions-1').click({ multiple: true, force: true });
//     cy.get('[data-testid=session-resources]').click({ force: true });
//   });

//   context('When session resources are not uploaded', () => {
//     it('Displays correct text in message', () => {
//       cy.get('[data-testid=session-description]').then((description) => {
//         const html = description.html();
//         expect(html).to.eq(sessionFixture.sessions[0].description);
//       });
//     });
//   });

//   context('When session resources are uploaded', () => {
//     it('Displays correct session description', () => {});
//   });
// });
