import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/authentication';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER'
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  let newUser: AuthUser;
  switch (action.type) {
    case 'INITIALIZE':
      newUser = action.payload.user;
      newUser = {
        ...newUser,
        displayName: `${newUser?.first_name} ${newUser?.last_name}`,
        photoURL: newUser?.profile_image_url
      };
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: newUser
      };
    case 'LOGIN':
      newUser = action.payload.user;
      newUser = {
        ...newUser,
        displayName: `${newUser?.first_name} ${newUser?.last_name}`,
        photoURL: newUser?.profile_image_url
      };
      return {
        ...state,
        isAuthenticated: true,
        user: newUser
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    case 'REGISTER':
      newUser = action.payload.user;
      newUser = {
        ...newUser,
        displayName: `${newUser?.first_name} ${newUser?.last_name}`,
        photoURL: newUser?.profile_image_url
      };
      return {
        ...state,
        isAuthenticated: true,
        user: newUser
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          setSession(accessToken);

          const response = await axios.get('/users/my_account');
          const { user } = response.data;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`/users/login`, {
      email,
      password
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: Types.Login,
      payload: {
        user
      }
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: Types.Register,
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  const resetPassword = async (email: string) => {
    const response = await axios.post(`/users/reset_password`, {
      email
    });
  };

  const changePassword = async (password: string) => {
    const response = await axios.post(`/users/change_password`, {
      password
    });
  };

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
