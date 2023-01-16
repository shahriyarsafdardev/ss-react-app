import { createSlice } from '@reduxjs/toolkit';
import axiosV2 from 'utils/axiosV2';
import { Event } from '../../@types/events';
import { dispatch } from '../store';

type EventState = {
  upcomingEvents: Event[];
  totalUpcomingEvents: number;
  pastEvents: Event[];
  totalPastEvents: number;
};

const initialState: EventState = {
  upcomingEvents: [],
  totalUpcomingEvents: 0,
  pastEvents: [],
  totalPastEvents: 0
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
