import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

const initialState: { mode: string } = {
  mode: 'Member'
};

const slice = createSlice({
  name: 'instructorView',
  initialState,
  reducers: {
    updateViewState(state, action) {
      if (['Member', 'Instructor'].includes(action.payload)) {
        state.mode = action.payload;
      } else {
        state.mode = 'Member';
      }
    }
  }
});

export default slice.reducer;

export function updateInstructorViewState(mode: string) {
  dispatch(slice.actions.updateViewState(mode));
}
