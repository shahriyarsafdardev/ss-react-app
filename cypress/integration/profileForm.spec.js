const serverUrl = Cypress.env('serverUrl');

describe('Profile Form', () => {
  beforeEach(() => {
    // network stub
    cy.server();
  });
  it('should log user into app', () => {
    cy.login();
  });
  it('should open user profile form', () => {
    cy.fixture('FieldsData/selectFieldsData.json').as('fieldsData');
    cy.route('GET', `${serverUrl}/cohorts/select_fields_data.json`, '@fieldsData').as(
      'select_fields_data'
    );
    cy.get('[alt="Aqib Maqbool"]').click();
    cy.get('#user-settings').click();
    cy.wait(1000);
  });
  it('should check the input fields have right data', () => {
    cy.form();
    cy.wait(3000);
  });
  it('should check the select fields for right data', () => {
    cy.get('#multiple-checkbox-company').click();
    cy.get('#menu-current_company').then((companyList) => {
      expect(companyList.children()[2].children[0].children).to.have.length(10);
    });
    cy.get('.MuiBackdrop-root').click({
      multiple: true,
      force: true
    });
    cy.get('#interest-multiselect').click();
    cy.get('#react-select-2-listbox').then((interestList) => {
      expect(interestList.children()[0].children).to.have.length(4);
    });
    cy.get('#root').click({
      multiple: true,
      force: true
    });
    cy.get('#strength-multiselect').click();
    cy.get('#react-select-3-listbox').then((strengthList) => {
      expect(strengthList.children()[0].children).to.have.length(6);
    });
    cy.get('#root').click({
      multiple: true,
      force: true
    });
  });
  it('should update the company and show mocked response', () => {
    cy.fixture('AccountSettings/profileForm.json').as('updatedProfile');
    cy.get('#multiple-checkbox-company').click({
      multiple: true,
      force: true
    });
    cy.get('[data-value="Test company 1"]').click({
      multiple: true,
      force: true
    });
    cy.route('POST', `${serverUrl}/users/update_user_profile.json`, '@updatedProfile').as(
      'update_user_profile'
    );
    cy.get('#interest-multiselect').click();
    cy.get('#react-select-2-input').type('Test {enter}');
    cy.get('#react-select-2-input').type('Test {enter}');
    cy.get('#interest-multiselect').then((field) => {
      expect(field.children()[2].children[0].children).to.have.length(4);
    });

    cy.get('#strength-multiselect').click();
    cy.get('#react-select-3-input').type('Test A {enter}');
    cy.get('#react-select-3-input').type('Test B {enter}');
    cy.get('#strength-multiselect').then((field) => {
      expect(field.children()[2].children[0].children).to.have.length(5);
    });
    cy.get('#btn-submit').click();
    cy.wait(2000);
    cy.get('#change_password').click();
  });
  it('should change the password', () => {
    cy.fixture('AccountSettings/changePassword.json').as('passwordChange');
    cy.route('POST', `${serverUrl}/users/change_password`, '@passwordChange').as('change_password');
    cy.get('#change_password').click();
    cy.get('[data-testid=new-password]').type('123456');
    cy.get('[data-testid=confirm-new-password]').type('123456');
    cy.get('#btn-submit-change-password').click();
  });
});
