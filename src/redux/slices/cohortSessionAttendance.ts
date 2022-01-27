import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';

import { CohortAttendanceRecord } from '../../@types/cohorts';

type Datum = {
  cohort_id: string;
  cohortAttendanceRecord: CohortAttendanceRecord;
};

const initialState: { list: Datum[] } = {
  list: []
};

const slice = createSlice({
  name: 'cohortAttendanceRecord',
  initialState,
  reducers: {
    fetchAttendance(state, action) {
      const index = state.list.findIndex((a) => a.cohort_id === action.payload.cohort_id);
      if (index === -1) {
        state.list = [
          ...state.list,
          { cohort_id: action.payload.cohort_id, cohortAttendanceRecord: action.payload.list }
        ];
      } else {
        state.list[index].cohortAttendanceRecord = action.payload.list;
      }
    }
  }
});

export default slice.reducer;

export function getAttendance(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/cohort_session_attendance.json`);

      dispatch(slice.actions.fetchAttendance({ cohort_id: cohortID, list: response.data }));
    } catch (error) {
      console.log(error);
    }
  };
}
