import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

const initialState: { [key: string]: any } = {};

const slice = createSlice({
  name: 'sessionFeedback',
  initialState,
  reducers: {
    setModalStateSuccess(state, action) {
      const sessionId: string = action.payload;
      if (sessionId && typeof sessionId === 'string') state[sessionId] = true;
    }
  }
});

export default slice.reducer;

export function updateSessionModalState(sessionId: string) {
  return async () => {
    try {
      dispatch(slice.actions.setModalStateSuccess(sessionId));
    } catch (error) {
      console.log(error);
    }
  };
}
