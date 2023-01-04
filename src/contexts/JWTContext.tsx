import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { StreamChat, LiteralStringForUnion } from 'stream-chat';
import { setAmplitudeUserId } from 'utils/amplitude';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'redux/store';

import { setOptions } from 'redux/slices/profileOptions';
import axios from '../utils/axios';
import { ParticipantProfile } from '../@types/user';
import { setSession } from '../utils/jwt';
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
  const navigate = useNavigate();
  const reduxDispatcher = useDispatch();
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const apiKey = process.env.REACT_APP_STREAM_API_KEY || process.env.STREAM_API_KEY;
  const client = StreamChat.getInstance<
    Record<string, unknown>,
    Record<string, unknown>,
    LiteralStringForUnion,
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>,
    { image?: string }
  >(apiKey!);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          setSession(accessToken);

          const response = await axios.get('/users/my_account');
          const {
            user,
            role_options,
            industry_options,
            source_options,
            preferred_pronoun_options
          } = response.data;
          connectStream(user);

          reduxDispatcher(
            setOptions(role_options, industry_options, source_options, preferred_pronoun_options)
          );

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

  const connectStream = async (user: any) => {
    if (user?.stream_token) {
      if (client.user) {
        await client.disconnectUser();
      }
      await client.connectUser(
        {
          id: user?.stream_id || user?.id
        },
        user?.stream_token
      );
    }
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(`/users/login`, {
      email,
      password
    });

    const {
      accessToken,
      user,
      role_options,
      industry_options,
      source_options,
      preferred_pronoun_options
    } = response.data;

    setAmplitudeUserId(user?.slug);
    connectStream(user);
    setSession(accessToken);
    dispatch({
      type: Types.Login,
      payload: {
        user
      }
    });
    reduxDispatcher(
      setOptions(role_options, industry_options, source_options, preferred_pronoun_options)
    );
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
    if (client.user) {
      await client.disconnectUser();
    }
    navigate('/');
  };

  const resetPassword = async (email: string) => {
    await axios.post(`/users/reset_password`, {
      email
    });
  };

  const updatePassword = async (password: string, reset_password_token: string | null) => {
    await axios.post(`/users/update_password.json`, {
      password,
      reset_password_token
    });
  };

  const changePassword = async (password: string) => {
    await axios.post(`/users/change_password`, {
      password
    });
  };

  const updateProfile = async (user: ParticipantProfile) => {
    const { user: stateUser } = state;
    // only update the new fields, and keep old data as it is
    user = { ...stateUser, ...user };

    dispatch({
      type: Types.Initial,
      payload: {
        isAuthenticated: true,
        user
      }
    });
  };

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
        changePassword,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
