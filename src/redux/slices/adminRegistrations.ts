import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { Enrollment, CohortSale } from '../../@types/cohorts';
import axios from '../../utils/axios';
import { setSession } from '../../utils/jwt';

const initialState: { enrollments: Enrollment[]; cohort_sales: CohortSale[] } = {
  enrollments: [],
  cohort_sales: []
};

const setAuthorizationToken = () => {
  const accessToken = window.localStorage.getItem('accessToken');
  setSession(accessToken);
};

const slice = createSlice({
  name: 'adminRegistrations',
  initialState,
  reducers: {
    setEnrollments(state, action) {
      state.enrollments = action.payload.enrollments;
    },

    setCohortSales(state, action) {
      state.cohort_sales = action.payload.cohort_sales;
    },

    updateRegistrationSuccess(state, action) {
      const updated = state.enrollments;
      const targetEnrollmentIndex = updated.findIndex(
        (enrollment) => enrollment.id === action.payload.enrollment.id
      );

      if (targetEnrollmentIndex !== -1) {
        updated[targetEnrollmentIndex] = action.payload.enrollment;
        state.enrollments = updated;
      }
    },
    deleteApplicationSuccess(state, action) {
      const updated = state.enrollments;

      state.enrollments = updated.filter(
        (enrollment) => enrollment.id !== action.payload.enrollmentID
      );
    }
  }
});

export default slice.reducer;

export function initializeEnrollments() {
  return async () => {
    try {
      setAuthorizationToken();
      const response = await axios.get(`cohorts/enrollments_monthly_data.json`);
      dispatch(slice.actions.setEnrollments({ enrollments: response.data.enrollments }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function initializeSales() {
  return async () => {
    try {
      setAuthorizationToken();
      const response = await axios.get('cohorts/cohort_sales.json');
      dispatch(slice.actions.setCohortSales({ cohort_sales: response.data.cohort_sales }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function acceptApplicationByAdmin(cohortID: string, enrollmentID: string) {
  return async () => {
    try {
      const response = await axios.post(
        `/cohorts/${cohortID}/enrollments/${enrollmentID}/accept_application.json`
      );

      dispatch(
        slice.actions.updateRegistrationSuccess({ cohort_id: cohortID, enrollment: response.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function rejectApplicationByAdmin(cohortID: string, enrollmentID: string) {
  return async () => {
    try {
      const response = await axios.post(
        `/cohorts/${cohortID}/enrollments/${enrollmentID}/reject_application.json`
      );

      dispatch(
        slice.actions.updateRegistrationSuccess({ cohort_id: cohortID, enrollment: response.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function markAsPaidByAdmin(cohortID: string, enrollmentID: string) {
  return async () => {
    try {
      const response = await axios.post(
        `/cohorts/${cohortID}/enrollments/${enrollmentID}/mark_as_paid.json`
      );

      dispatch(
        slice.actions.updateRegistrationSuccess({ cohort_id: cohortID, enrollment: response.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function notInterestedApplicationByAdmin(cohortID: string, enrollmentID: string) {
  return async () => {
    try {
      const response = await axios.post(
        `/cohorts/${cohortID}/enrollments/${enrollmentID}/not_interested.json`
      );

      dispatch(
        slice.actions.updateRegistrationSuccess({ cohort_id: cohortID, enrollment: response.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteApplicationByAdmin(cohortID: string, enrollmentID: string) {
  return async () => {
    try {
      await axios.delete(
        `/cohorts/${cohortID}/enrollments/${enrollmentID}/delete_application.json`
      );

      dispatch(slice.actions.deleteApplicationSuccess({ cohortID, enrollmentID }));
    } catch (error) {
      console.log(error);
    }
  };
}
