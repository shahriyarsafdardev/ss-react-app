import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import referralReducer from './slices/referral';
import pathReducer from './slices/path';
import cohortReducer from './slices/cohort';
import accountSubscription from './slices/accountSubscription';
import notificationReducer from './slices/notification';
import profileOptionsReducer from './slices/profileOptions';
import sessionFeedbackReducer from './slices/sessionFeedback';
import instructorViewReducer from './slices/viewMode';
import cohortAttendanceRecordReducer from './slices/cohortSessionAttendance';
import cohortCreditReducer from './slices/businessCredit';
import adminRegistrationsReducer from './slices/adminRegistrations';
import eventReducer from './slices/event';
import courseReducer from './slices/course';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const appReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  calendar: calendarReducer,
  cohort: cohortReducer,
  subscription: accountSubscription,
  notification: notificationReducer,
  profileOptions: profileOptionsReducer,
  sessionFeedback: sessionFeedbackReducer,
  instructorView: instructorViewReducer,
  cohortSessionAttendance: cohortAttendanceRecordReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  cohortCredit: cohortCreditReducer,
  adminRegistrations: adminRegistrationsReducer,
  referral: referralReducer,
  path: pathReducer,
  event: eventReducer,
  course: courseReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export { rootPersistConfig, rootReducer };

export const resetStore = () => ({
  type: 'RESET_STORE'
});
