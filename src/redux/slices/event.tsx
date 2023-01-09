import { createSlice } from '@reduxjs/toolkit';
import axiosV2 from 'utils/axiosV2';
import { dispatch } from '../store';

type Event = {
  name: string;
  time: string;
  description: string;
};

type EventState = {
  events: Event[];
};

const initialState: EventState = {
  events: []
};

const slice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getEventsSuccess(state, action) {
      state.events = action.payload;
    }
  }
});

export default slice.reducer;

export function getEvents() {
  return async () => {
    try {
      const response = await axiosV2.get('/events.json');
      dispatch(slice.actions.getEventsSuccess(response?.data?.events));
    } catch (error) {
      console.log(error);
    }
  };
}
