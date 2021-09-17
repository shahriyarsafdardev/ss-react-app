import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { Cohorts } from '../../@types/cohorts';

// utils
import axios from '../../utils/axios';

const initialState: Cohorts = {
  cohorts: [],
  peers: []
};

const slice = createSlice({
  name: 'cohort',
  initialState,
  reducers: {
    getCohortsSuccess(state, action) {
      state.cohorts = action.payload;
    },
    getPeersSuccess(state, action) {
      state.peers = action.payload.peers;
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
