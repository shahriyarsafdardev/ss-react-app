import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { Cohort } from '../../@types/cohorts';

// utils
import axios from '../../utils/axios';

type CohortState = {
  cohorts: Cohort[];
};

const initialState: CohortState = {
  cohorts: []
};

const slice = createSlice({
  name: 'cohort',
  initialState,
  reducers: {
    getCohortsSuccess(state, action) {
      state.cohorts = action.payload;
    },
    getPeersSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, peers: action.payload.peers };
      }
    },
    getSessionsSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, sessions: action.payload.sessions };
      }
    }
  }
});

export default slice.reducer;

export function getCohorts() {
  return async () => {
    try {
      const response = await axios.get('/cohorts');
      dispatch(slice.actions.getCohortsSuccess(response.data.cohortsData));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPeers(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/peers`);
      dispatch(slice.actions.getPeersSuccess(response.data.peersData));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSessions(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/sessions`);
      dispatch(slice.actions.getSessionsSuccess(response.data.sessionsData));
    } catch (error) {
      console.log(error);
    }
  };
}
