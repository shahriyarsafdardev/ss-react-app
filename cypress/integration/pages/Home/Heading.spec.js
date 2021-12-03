import Heading from './pages/Home/Heading';
import sessionFixture from '../fixtures/session/sessions.json';
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

    it('Displays a personalised welcome messager', () => {
      // here is a sudo code example of what the assertion should look like
      // heading
      //   .text()
      //   .should.eq(
      //     `👋 Hi ${userFixture.first_name}, welcome to the ${cohortsFixture.code} Cohort!`
      //   );
    });
  });
});
