import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

// utils
import axios from '../../utils/axios';

const initialState = {
  cohorts: []
};

const slice = createSlice({
  name: 'cohort',
  initialState,
  reducers: {
    getCohortsSuccess(state, action) {
      state.cohorts = action.payload;
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
