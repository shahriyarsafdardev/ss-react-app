import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { SnackbarProvider } from 'notistack5';
import { BrowserRouter } from 'react-router-dom';

import LoginForm from './LoginForm';
import { AuthProvider } from '../../../contexts/JWTContext';

configure({ adapter: new Adapter() });

describe('Login Form', () => {
  it('should mount the component', () => {
    const wrapper = mount(
      <BrowserRouter>
        <SnackbarProvider>
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </SnackbarProvider>
      </BrowserRouter>
    );
    wrapper.unmount();
  });

  it('shallow render the login form', () => {
    const wrapper = shallow(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );
  });
});
