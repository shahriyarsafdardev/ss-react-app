import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { dispatch } from '../store';
import { Notification } from '../../@types/cohorts';
import { setSession } from '../../utils/jwt';

// utils
import axios from '../../utils/axios';

type NotificationState = {
  notifications: Notification[];
};

const initialState: NotificationState = {
  notifications: []
};
const setAuthorizationToken = () => {
  const accessToken = window.localStorage.getItem('accessToken');
  setSession(accessToken);
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationsSuccess(state, action) {
      state.notifications = action.payload;
    },
    addNotificationStatus(state, action) {
      if (action.payload.notification) {
        state.notifications = [action.payload.notification, ...state.notifications];
      }
    }
  }
});

export default slice.reducer;

export function getNotifications() {
  return async () => {
    try {
      setAuthorizationToken();
      const response = await axios.get('/notifications.json');
      dispatch(slice.actions.getNotificationsSuccess(response.data.notifications));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addNotifications(notifications: Notification[]) {
  return async () => {
    try {
      dispatch(slice.actions.getNotificationsSuccess(notifications));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addNotification(notification: Notification) {
  return async () => {
    try {
      dispatch(
        slice.actions.addNotificationStatus({
          notification
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function markAsRead(type: string, id: string | undefined) {
  return async () => {
    try {
      setAuthorizationToken();
      const response = await axios.post('/notifications/mark_read.json', {
        channel_id: id,
        notification_id: id,
        type
      });
      dispatch(slice.actions.getNotificationsSuccess(response.data.notifications));
    } catch (error) {
      console.log(error);
    }
  };
}
