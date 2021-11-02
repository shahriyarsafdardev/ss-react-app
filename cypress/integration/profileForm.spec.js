const serverUrl = Cypress.env('serverUrl');

describe('Profile Form', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });
  it('should log user into app', () => {
    cy.login();
  });
  //open user profile settings
  it('should open user profile form', () => {
    cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');
    cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldsData').as(
      'select_fields_data'
    );
    cy.get('[alt="Aqib Maqbool"]').click();
    cy.get('#user-settings').click();
    cy.wait('@select_fields_data');
  });
  it('should check the input fields have right data', () => {
    cy.form();
  });
  it('should check the select fields for right data', () => {
    cy.get('#multiple-checkbox-company').click();
    //check that all the companies are displayed in select
    cy.get('#menu-current_company').then((companyList) => {
      expect(companyList.children()[2].children[0].children).to.have.length(10);
    });
    cy.get('.MuiBackdrop-root').click({
      multiple: true,
      force: true
    });
    //check that all the interests are displayed in select
    cy.get('#interest-multiselect').click();
    cy.get('#react-select-2-listbox').then((interestList) => {
      expect(interestList.children()[0].children).to.have.length(4);
    });
    cy.get('#root').click({ force: true });
    //check that all the strengths are displayed in select
    cy.get('#strength-multiselect').click();
    cy.get('#react-select-3-listbox').then((strengthList) => {
      expect(strengthList.children()[0].children).to.have.length(6);
    });
    cy.get('#root').click({ force: true });
  });
  it('should update the company and show mocked response', () => {
    cy.fixture('AccountSettings/profileForm.json').as('updatedProfile');
    cy.get('#multiple-checkbox-company').click({ force: true });
    //select company
    cy.get('[data-value="Test company 1"]').click({ force: true });
    cy.route('POST', `${serverUrl}/users/update_user_profile.json`, '@updatedProfile').as(
      'update_user_profile'
    );
    //select interests
    cy.get('#interest-multiselect').click();
    cy.get('#react-select-2-input').type('Test {enter}');
    cy.get('#react-select-2-input').type('Test {enter}');
    cy.get('#interest-multiselect').then((field) => {
      expect(field.children()[2].children[0].children).to.have.length(4);
    });
    //select strengths
    cy.get('#strength-multiselect').click();
    cy.get('#react-select-3-input').type('Test A {enter}');
    cy.get('#react-select-3-input').type('Test B {enter}');
    cy.get('#strength-multiselect').then((field) => {
      expect(field.children()[2].children[0].children).to.have.length(5);
    });
    cy.get('#btn-submit').click();
    cy.wait('@update_user_profile');
  });
  it('should change the password', () => {
    cy.fixture('AccountSettings/changePassword.json').as('passwordChange');
    cy.route('POST', `${serverUrl}/users/change_password`, '@passwordChange').as('change_password');
    //click on change password tab
    cy.get('[data-testid=change_password]').click();
    //type new password
    cy.get('[data-testid=new-password]').type('123456');
    //check if field has correct data
    cy.get('[data-testid=new-password]').should('have.value', '123456');
    //type new password again for confirmation
    cy.get('[data-testid=confirm-new-password]').type('123456');
    //check if field has correct data
    cy.get('[data-testid=confirm-new-password]').should('have.value', '123456');
    //click on save changes button
    cy.get('[data-testid=btn-submit-change-password]').click();
  });
  it('should not change the password if password doesnot match and display a message', () => {
    //type new password
    cy.get('[data-testid=new-password]').type('123456');
    //check if field has correct data
    cy.get('[data-testid=new-password]').should('have.value', '123456');
    //type new password again for confirmation
    cy.get('[data-testid=confirm-new-password]').type('654321');
    //check if field has correct data
    cy.get('[data-testid=confirm-new-password]').should('have.value', '654321');
    //click on save changes button
    cy.get('[data-testid=btn-submit-change-password]').click();
    cy.contains('Passwords must match').should('be.visible');
  });
});
