import { createSlice } from '@reduxjs/toolkit';
import axiosV2 from 'utils/axiosV2';
import { Event } from '../../@types/events';
import { dispatch } from '../store';

type EventState = {
  upcomingEvents: Event[];
  totalUpcomingEvents: number;
  pastEvents: Event[];
  totalPastEvents: number;
  communityEvent: {
    id: string;
    name: string;
  };
};

const initialState: EventState = {
  upcomingEvents: [],
  totalUpcomingEvents: 0,
  pastEvents: [],
  totalPastEvents: 0,
  communityEvent: {
    id: '',
    name: ''
  }
};

const slice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getEventsSuccess(state, action) {
      state.upcomingEvents = action.payload.upcoming;
      state.totalUpcomingEvents = action.payload.total_upcoming;
      state.totalPastEvents = action.payload.total_past;
      state.pastEvents = action.payload.past;
    },
    getAllEventsSuccess(state, action) {
      if (action.payload.category === 'upcoming') {
        state.upcomingEvents = action.payload.data.events;
        state.totalUpcomingEvents = action.payload.data.total_events;
      } else if (action.payload.category === 'past') {
        state.pastEvents = action.payload.data.events;
        state.totalPastEvents = action.payload.data.total_events;
      }
    },
    updateEvent(state, action) {
      const targetEventIndex = state.upcomingEvents.findIndex(
        (event) => event.id === action.payload.eventID
      );
      if (targetEventIndex !== -1) {
        const updated: Event = state.upcomingEvents[targetEventIndex];
        state.upcomingEvents[targetEventIndex] = {
          ...updated,
          ...action.payload.properties
        };
      }
    },
    updateCommunityEvent(state, action) {
      state.communityEvent = { ...action.payload };
    },
    removeCommunityEvent(state) {
      state.communityEvent.id = '';
      state.communityEvent.name = '';
    }
  }
});

export default slice.reducer;

export function getEvents() {
  return async () => {
    try {
      const response = await axiosV2.get('/events.json');
      dispatch(slice.actions.getEventsSuccess(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllEvents(category: string) {
  return async () => {
    try {
      const response = await axiosV2.get(`/events/all_events.json?type=${category}`);
      dispatch(slice.actions.getAllEventsSuccess({ category, data: response?.data }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateEventProperties(eventID: string, eventProperties: any) {
  return async () => {
    try {
      dispatch(slice.actions.updateEvent({ eventID, properties: eventProperties }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setCommunityEvent(eventID: string, eventName: string) {
  return async () => {
    try {
      dispatch(slice.actions.updateCommunityEvent({ id: eventID, name: eventName }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function resetCommunityEvent() {
  return async () => {
    try {
      dispatch(slice.actions.removeCommunityEvent());
    } catch (error) {
      console.log(error);
    }
  };
}
