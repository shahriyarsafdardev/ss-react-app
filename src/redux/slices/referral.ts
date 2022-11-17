import { createSlice } from '@reduxjs/toolkit';
import axiosV2 from 'utils/axiosV2';
import { Referral } from '../../@types/referral';
import { dispatch } from '../store';

const initialState: { referral: Referral } = {
  referral: {
    referrals_count: {
      enrolled_referrals_count: 0,
      total_referrals_count: 0
    },
    referrals_details: {
      transactions: [],
      invites: [],
      enrolled_referrals: []
    },
    credit_balance: 0
  }
};

const slice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    populateReferral(state, action) {
      state.referral = action.payload.data;
    },
    updateReferralsCount(state, action) {
      state.referral.referrals_count = action.payload;
    },
    updateReferralsDetails(state, action) {
      state.referral.referrals_details = action.payload;
    },
    updateCreditBalance(state, action) {
      state.referral.credit_balance = action.payload;
    }
  }
});

export default slice.reducer;

export function getReferralsCount() {
  return async () => {
    try {
      const response = await axiosV2.get('/referrals.json');
      dispatch(slice.actions.updateReferralsCount(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReferralsDetails() {
  return async () => {
    try {
      const response = await axiosV2.get('/credit_transactions.json');
      dispatch(slice.actions.updateReferralsDetails(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAccountDetails(creditAccountID: string) {
  return async () => {
    try {
      const response = await axiosV2.get(`/credit_account/${creditAccountID}.json`);
      dispatch(slice.actions.updateReferralsDetails(response?.data?.credit_balance));
    } catch (error) {
      console.log(error);
    }
  };
}

export function createReferral(cohortID: string, refereeEmail: string) {
  return async () => {
    try {
      await axiosV2.post('/referrals.json', {
        cohort_id: cohortID,
        referee_email: refereeEmail
      });
    } catch (error) {
      console.log(error);
    }
  };
}
