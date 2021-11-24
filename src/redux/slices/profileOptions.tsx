import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

type InitialState = {
  role_options: string[];
  industry_options: string[];
  preferred_pronoun_options: string[];
};

const initialState: InitialState = {
  role_options: [],
  industry_options: [],
  preferred_pronoun_options: []
};

const slice = createSlice({
  name: 'profileOptions',
  initialState,
  reducers: {
    populateOptions(state, action) {
      state.industry_options = action.payload.industry_options;
      state.role_options = action.payload.role_options;
      state.preferred_pronoun_options = action.payload.preferred_pronoun_options;
    }
  }
});

export default slice.reducer;

export function setOptions(
  role_options: string[],
  industry_options: string[],
  preferred_pronoun_options: string[]
) {
  return async () => {
    try {
      dispatch(
        slice.actions.populateOptions({ role_options, preferred_pronoun_options, industry_options })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
