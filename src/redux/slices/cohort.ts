import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { Cohort } from '../../@types/cohorts';
import { setSession } from '../../utils/jwt';

// utils
import axios from '../../utils/axios';

type CohortState = {
  cohorts: Cohort[];
};

const initialState: CohortState = {
  cohorts: []
};
const setAuthorizationToken = () => {
  const accessToken = window.localStorage.getItem('accessToken');
  setSession(accessToken);
};

const slice = createSlice({
  name: 'cohort',
  initialState,
  reducers: {
    getCohortsSuccess(state, action) {
      state.cohorts = action.payload;
    },
    getPeersSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, peers: action.payload.peers };
      }
    },

    getSessionsSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, sessions: action.payload.sessions };
      }
    },

    updateOnboardingStatusSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, isOnboarded: true };
      }
    },
    updateSessionMaterialCheckStatus(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].sessions;
        const targetSessionIndex = updated.findIndex(
          (session) => session.id === action.payload.sessionID
        );

        if (targetSessionIndex !== -1) {
          let targetGroupIndex = -1;
          let targetMaterialIndex = -1;

          updated[targetSessionIndex].session_materials.map((group, i) =>
            group.session_materials.map((material, j) => {
              if (material.id === action.payload.materialId) {
                targetGroupIndex = i;
                targetMaterialIndex = j;
              }
            })
          );

          if (targetMaterialIndex !== -1) {
            updated[targetSessionIndex].session_materials[targetGroupIndex].session_materials[
              targetMaterialIndex
            ].complete = action.payload.result;
            state.cohorts[targetCohortIndex].sessions = updated;
          }
        }
      }
    },
    updateSessionFeedbackStatusSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].sessions;
        const targetSessionIndex = updated.findIndex(
          (session) => session.id === action.payload.sessionID
        );

        if (targetSessionIndex !== -1) {
          updated[targetSessionIndex].survey_completed = true;
          state.cohorts[targetCohortIndex].sessions = updated;
        }
      }
    }
  }
});

export default slice.reducer;

export function getCohorts() {
  return async () => {
    try {
      setAuthorizationToken();
      const response = await axios.get('/cohorts.json');
      dispatch(slice.actions.getCohortsSuccess(response.data.cohorts));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPeers(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/peers.json`);
      dispatch(slice.actions.getPeersSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSessions(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/sessions.json`);
      dispatch(slice.actions.getSessionsSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateOnboardingStatus(cohortID: string) {
  return async () => {
    try {
      setAuthorizationToken();
      dispatch(slice.actions.updateOnboardingStatusSuccess(cohortID));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateSessionFeedbackStatus(cohortID: string, sessionID: string) {
  return async () => {
    try {
      dispatch(slice.actions.updateSessionFeedbackStatusSuccess({ cohortID, sessionID }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateMaterialStatus(
  cohortID: string | undefined,
  sessionID: string | undefined,
  materialId: string,
  value: boolean
) {
  return async () => {
    try {
      const response = await axios.post(
        `/cohort_sessions/${sessionID}/session_materials/${materialId}/submit_checklist.json`,
        {
          complete: value
        }
      );
      const result = response.data;
      dispatch(
        slice.actions.updateSessionMaterialCheckStatus({
          cohortID,
          sessionID,
          materialId,
          result
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
