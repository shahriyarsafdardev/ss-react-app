import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../store';
import { CreditObject } from '../../@types/cohorts';

type InitialStateType = {
  credit_balance: number;
  history: CreditObject[];
  unapproved: CreditObject[];
};

const initialState: InitialStateType = {
  credit_balance: 0,
  history: [],
  unapproved: []
};

const slice = createSlice({
  name: 'cohortCredit',
  initialState,
  reducers: {
    credit(state, action) {},
    initialize(state, action) {
      const { credit_balance, history, unapproved } = action.payload.data;

      state.credit_balance = credit_balance;
      state.history = history;
      state.unapproved = unapproved;
    }
  }
});

export default slice.reducer;

export function topUpCredit() {
  // dispatch(slice.actions.credit());
}

export function initializeCredit() {
  return async () => {
    const response = await axios.get('/credit_accounts');
    dispatch(slice.actions.initialize({ data: response.data }));
  };
}
