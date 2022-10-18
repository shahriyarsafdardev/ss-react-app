import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { SubscriptionDetail } from '../../@types/cohorts';
import { dispatch } from '../store';

const initialState: { subscription_detail: SubscriptionDetail } = {
  subscription_detail: {
    account: {
      accountName: '',
      cardExpiry: '',
      cardNumber: '',
      credit_balance: 0,
      id: ''
    },
    history: [],
    subscription: {
      id: '',
      name: '',
      start_date: '',
      next_billing_date: '',
      active: false,
      yearly_credit_amount: 0
    }
  }
};

const slice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    populateSubscription(state, action) {
      state.subscription_detail = action.payload.data;
    },
    updateSubscription(state, action) {
      state.subscription_detail = action.payload.data;
    }
  }
});

export default slice.reducer;

export function initializeSubscription() {
  return async () => {
    const response = await axios.get('/account_subscriptions.json');
    dispatch(slice.actions.populateSubscription({ data: response.data }));
  };
}

export function updateSubscription(data: SubscriptionDetail) {
  dispatch(slice.actions.updateSubscription({ data }));
}
