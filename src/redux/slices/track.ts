import { createSlice } from '@reduxjs/toolkit';
import axiosV2 from 'utils/axiosV2';
import { dispatch } from '../store';
import { Course, Track } from '../../@types/course';

const initialState: { track: Track } = {
  track: {
    id: '',
    name: '',
    description: '',
    slug: '',
    cohorts: []
  }
};

const slice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    populateTrack(state, action) {
      state.track = action.payload;
    },
    getSessionsSuccess(state, action) {
      const targetCohortIndex = state.track.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.courseID
      );
      if (targetCohortIndex !== -1) {
        const updated: Course = state.track.cohorts[targetCohortIndex];
        state.track.cohorts[targetCohortIndex] = { ...updated, sessions: action.payload.sessions };
      }
    }
  }
});

export default slice.reducer;

export function getTrackData(trackSlug: string) {
  return async () => {
    try {
      const response = await axiosV2.get(`/tracks/${trackSlug}.json`);
      dispatch(slice.actions.populateTrack(response?.data?.track));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCourseSessions(courseID: string) {
  return async () => {
    try {
      const response = await axiosV2.get(`/tracks/course_sessions.json?course_id=${courseID}`);
      dispatch(slice.actions.getSessionsSuccess({ courseID, sessions: response.data?.sessions }));
    } catch (error) {
      console.log(error);
    }
  };
}
