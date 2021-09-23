import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';
import { Cohort } from '../../@types/cohorts';

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
      const data = [
        {
          id: 'cohort-1',
          name: 'The Economics of Digital Platforms'
        }
      ];
      dispatch(slice.actions.getCohortsSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPeers(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/peers.json`);
      dispatch(slice.actions.getPeersSuccess(response.data));
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
