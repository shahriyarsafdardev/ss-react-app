import { v4 as uuidv4 } from 'uuid';
// utils
import fakeRequest from '../utils/fakeRequest';
import { verify, sign } from '../utils/jwt';
// @types
import { payloadUser } from '../@types/account';
//
import mock from './mock';

// ----------------------------------------------------------------------

const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

const users: payloadUser[] = [
  {
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
    isPublic: true,
    current_company: 'Adobe',
    strengths: ['Strength B', 'Strength C'],
    interests: ['Interest A'],
    linkedin_url: 'https://linkedin.com/demo',
    preferred_pronoun: 'He/him',
    roles: ['role 1'],
    industries: ['industry 1'],
    stream_id: '',
    stream_token: '',
    full_name: 'Jaydon Frankie',
    is_interested_in_networking: true,
    networking_role_preferences: ['option 1'],
    is_interested_in_mentoring: false
  },
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-1',
    first_name: 'Aqib',
    last_name: 'Maqbool',
    email: 'aqibmaqqbool@gmail.com',
    password: 'aqib1234',
    profile_image_url: '/static/mock-images/avatars/avatar_default.jpg',
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
    current_company: 'Adobe',
    strengths: ['Strength B', 'Strength C'],
    interests: ['Interest A'],
    linkedin_url: 'https://linkedin.com/aqibmaqqbool_react_dev',
    preferred_pronoun: 'He/him',
    roles: ['role 1'],
    industries: ['industry 1'],
    stream_id: '',
    stream_token: '',
    full_name: 'Aqib Maqbool',
    is_interested_in_networking: false,
    networking_role_preferences: ['option 2'],
    is_interested_in_mentoring: false
  }
];

// ----------------------------------------------------------------------

mock.onPost('/users/login').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: 'There is no user corresponding to the email address.' }];
    }

    if (user.password !== password) {
      return [400, { message: 'Wrong password' }];
    }

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/account/register').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password, firstName, lastName } = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, { message: 'There already exists an account with the given email address.' }];
    }

    user = {
      id: uuidv4(),
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      profile_image_url: null,
      phoneNumber: null,
      country: null,
      address: null,
      state: null,
      city: null,
      zipCode: null,
      about: null,
      role: 'user',
      isPublic: true,
      current_company: '',
      preferred_pronoun: '',
      strengths: [],
      interests: [],
      roles: [],
      industries: [],
      linkedin_url: '',
      stream_id: '',
      stream_token: '',
      full_name: '',
      is_interested_in_networking: false,
      networking_role_preferences: [],
      is_interested_in_mentoring: false
    };

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/users/my_account').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const data: any = verify(accessToken, JWT_SECRET);
    const userId = typeof data === 'object' ? data?.userId : '';
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/users/change_password').reply(async (config) => {
  try {
    await fakeRequest(500);
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const data: any = verify(accessToken, JWT_SECRET);
    const userId = typeof data === 'object' ? data?.userId : '';
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
