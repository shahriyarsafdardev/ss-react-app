import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../store';
import { CreditObject } from '../../@types/cohorts';

type InitialStateType = {
  id: string;
  credit_balance: number;
  history: CreditObject[];
  unapproved: CreditObject[];
};

const initialState: InitialStateType = {
  id: '',
  credit_balance: 0,
  history: [],
  unapproved: []
};

const slice = createSlice({
  name: 'cohortCredit',
  initialState,
  reducers: {
    populateCredit(state, action) {
      const { id, credit_balance, history, unapproved } = action.payload.data;

      state.id = id;
      state.credit_balance = credit_balance;
      state.history = history;
      state.unapproved = unapproved;
    }
  }
});

export default slice.reducer;

export function initializeCredit() {
  return async () => {
    const response = await axios.get('/credit_accounts');
    dispatch(slice.actions.populateCredit({ data: response.data }));
  };
}

export function addCredit(
  accountID: string,
  value: number,
  onSuccess: Function,
  onFailure: Function
) {
  return async () => {
    await axios
      .post(`/credit_accounts/${accountID}/add_credit.json`, {
        amount: value
      })
      .then((response) => {
        dispatch(slice.actions.populateCredit({ data: response.data }));
        onSuccess();
      })
      .catch((err) => {
        onFailure();
      });
  };
}

export function approveCredit(
  accountID: string,
  enrollmentId: string,
  onSuccess: Function,
  onFailure: Function
) {
  return async () => {
    await axios
      .post(`/credit_accounts/${accountID}/approve_application.json`, {
        enrollment_id: enrollmentId
      })
      .then((response) => {
        dispatch(slice.actions.populateCredit({ data: response.data }));
        onSuccess();
      })
      .catch((err) => {
        onFailure();
      });
  };
}

export function rejectCredit(
  accountID: string,
  enrollmentId: string,
  onSuccess: Function,
  onFailure: Function
) {
  return async () => {
    await axios
      .delete(`/credit_accounts/${accountID}/reject_application?enrollment_id=${enrollmentId}`)
      .then((response) => {
        dispatch(slice.actions.populateCredit({ data: response.data }));
        onSuccess();
      })
      .catch((err) => {
        onFailure();
      });
  };
}
