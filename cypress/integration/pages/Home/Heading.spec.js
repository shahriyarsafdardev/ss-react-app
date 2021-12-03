import sessionFixture from '../../../fixtures/session/sessions.json';
import userFixture from '../../../fixtures/login/login.json';
import cohortsFixture from '../../../fixtures/cohorts/cohorts.json'
import moment from 'moment';

describe('Home > Heading', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
  });

  context('When the current time is more than two hours before the first session starts', () => {
    before(() => {
      var dateTime = moment(sessionFixture.sessions[0].time).subtract(2, 'hours');
      cy.clock(new Date(dateTime.format()));
    });

    it('Displays a personalised welcome message', () => {
      // here is a sudo code example of what the assertion should look like
      // heading
      //   .text()
      //   .should.eq(
      //     `👋 Hi ${userFixture.first_name}, welcome to the ${cohortsFixture.code} Cohort!`
      //   );
      cy.get('.MuiTypography-h3')
      .should('contain','👋 Hi' )
      .and('contain', userFixture.user.first_name)
      .and('contain',', welcome to the ')
      .and('contain', cohortsFixture.cohorts[0].code)
      .and('contain', 'Cohort!')
    });
  });

  context('When the current time is less than one hour before the first session starts', () => {
    before(() => {
      var dateTime = moment(sessionFixture.sessions[0].time).subtract(1, 'hours');
      cy.clock(new Date(dateTime.format()));
    });

    it('Displays a personalised get ready message', () => {
      cy.get('.MuiTypography-h3')
      .should('contain','🔴 Get ready, Session')
      .and('contain', sessionFixture.sessions[0].number)
      .and('contain',' is starting soon!')
    });
  });

  context('When the first session is completed and current time is more then one hour before the second session starts ', () => {
    before(() => {
      var dateTime = moment(sessionFixture.sessions[0].time).add(1, 'hours');
      cy.clock(new Date(dateTime.format()));
      var dateTime = moment(sessionFixture.sessions[1].time).subtract(1, 'hours');
      cy.clock(new Date(dateTime.format()));
    });

    it('Displays a personalised Welcome back message', () => {
      cy.get('.MuiTypography-h3')
      .should('contain','👋 Welcome back ')
      .and('contain', userFixture.user.first_name)
      .and('contain',', we hope you enjoyed Session ')
      .and('contain',sessionFixture.sessions[0].number)
    });
  });

  context('When all Sessions are completed', () => {
    before(() => {
      var dateTime = moment(sessionFixture.sessions[1].time).add(1, 'hours');
      cy.clock(new Date(dateTime.format()));
    });

    it('Displays a personalised Completed message', () => {
      cy.get('.MuiTypography-h3')
      .should('contain','🎉 Congratulations, you’ve completed the ')
      .and('contain', cohortsFixture.cohorts[0].code)
      .and('contain', 'cohort!')
    });
  });
});
