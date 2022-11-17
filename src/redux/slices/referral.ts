import { createSlice } from '@reduxjs/toolkit';
import axiosV2 from 'utils/axiosV2';
import { Referral } from '../../@types/referral';
import { dispatch } from '../store';
import { setSession } from '../../utils/jwt';

const initialState: { referral: Referral } = {
  referral: {
    referrals_count: {
      enrolled_referrals_count: 0,
      total_referrals_count: 0
    },
    referrals_details: [],
    credit_balance: 0
  }
};

const setAuthorizationToken = async () => {
  const accessToken = window.localStorage.getItem('accessToken');
  setSession(accessToken);
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
      await setAuthorizationToken();
      const response = await axiosV2.get('/referrals.json');
      dispatch(slice.actions.updateReferralsCount(response?.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReferralsDetails(creditAccountID: string) {
  return async () => {
    try {
      const response = await axiosV2.get(`/credit_transactions.json`, {
        params: {
          credit_account_id: creditAccountID
        }
      });
      dispatch(slice.actions.updateReferralsDetails(response?.data?.referrals_details));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAccountDetails(creditAccountID: string) {
  return async () => {
    try {
      const response = await axiosV2.get(`/credit_accounts/${creditAccountID}.json`);
      dispatch(slice.actions.updateCreditBalance(response?.data?.credit_balance));
    } catch (error) {
      console.log(error);
    }
  };
}
