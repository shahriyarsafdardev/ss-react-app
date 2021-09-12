import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from 'components/authentication/login/LoginForm';
import { AuthProvider } from 'contexts/JWTContext';
import { SnackbarProvider } from 'notistack5';
import { BrowserRouter } from 'react-router-dom';
import { sign } from 'utils/jwt';
import { act } from 'react-dom/test-utils';
import { LocalStorageMock } from '@react-mock/localstorage';
import { LocalizationProvider } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from '../redux/store';

import App from 'App';
import LoadingScreen from 'components/LoadingScreen';
import { CollapseDrawerProvider } from 'contexts/CollapseDrawerContext';
import { SettingsProvider } from 'contexts/SettingsContext';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';

const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

const server = setupServer(
  // mocked response that returns a valid user and calculated access token
  rest.post('http://localhost/api/account/login', async (req, res, ctx) => {
    const user = {
      id: '8864c717-587d-472a-929a-8e5f298024da-0',
      first_name: 'Jaydon',
      last_name: 'Frankie',
      email: 'demo@minimals.cc',
      password: 'demo1234',
      profile_image_url: '/static/mock-images/avatars/avatar_default.jpg',
      phoneNumber: '+40 777666555',
      country: 'United States',
      address: '90210 Broadway Blvd',
      state: 'California',
      city: 'San Francisco',
      zipCode: '94116',
      about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
      role: 'admin',
      isPublic: true
    };

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return res(ctx.json({ user, accessToken }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it performs a user login', async () => {
  window.scrollTo = jest.fn();

  act(() => {
    const { container } = render(
      <LocalStorageMock>
        <HelmetProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SettingsProvider>
                  <CollapseDrawerProvider>
                    <BrowserRouter>
                      <AuthProvider>
                        <App />
                      </AuthProvider>
                    </BrowserRouter>
                  </CollapseDrawerProvider>
                </SettingsProvider>
              </LocalizationProvider>
            </PersistGate>
          </ReduxProvider>
        </HelmetProvider>,
      </LocalStorageMock>
    );
  });

  // act(() => {
  //   const { container } = render(
  //     <LocalStorageMock>
  //       <BrowserRouter>
  //         <SnackbarProvider>
  //           <AuthProvider>
  //             <LoginForm />
  //           </AuthProvider>
  //         </SnackbarProvider>
  //       </BrowserRouter>
  //     </LocalStorageMock>
  //   );
  // });

  userEvent.type(screen.getByTestId('email'), 'demo@minimals.cc');
  userEvent.type(screen.getByTestId('password'), 'demo1234');
  act(async () => {
    await fireEvent.click(screen.getByTestId('loginBtn'));
  });

  // await waitFor(() => container.querySelector('h6'));

  // expect(container.querySelector('input')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toBeDisabled();
});
