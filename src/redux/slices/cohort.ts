import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { groupByIntake } from 'layouts/dashboard/Common';
import { dispatch } from '../store';
import { Cohort, Enrollment, ReferralCode } from '../../@types/cohorts';
import { setSession } from '../../utils/jwt';

// utils
import axios from '../../utils/axios';

type CohortState = {
  cohorts: Cohort[];
  errors: any;
};

const initialState: CohortState = {
  cohorts: [],
  errors: []
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
      const intakeCategories = groupByIntake(action.payload);
      let sortedCohorts: Cohort[] = [];
      intakeCategories.forEach((category) => {
        sortedCohorts = [
          ...sortedCohorts,
          ...action.payload.filter((c: Cohort) => c.intake_name === category)
        ];
      });
      state.cohorts = sortedCohorts;
    },
    getPeersSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      const filteredPeers = action.payload.peers.filter(
        (student: any) =>
          student.type &&
          student.type === 'learner' &&
          student.is_onboarded &&
          student.id !== action.payload.userID
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = {
          ...updated,
          peers: action.payload.peers,
          random_peers: _.sampleSize(filteredPeers, 4)
        };
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
    getCodesSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, referral_codes: action.payload.codes };
      }
    },
    getEnrollmentsSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, enrollments: action.payload.enrollments };
      }
    },
    getAnalyticsSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, analytics: action.payload.analytics };
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
    updatePeersMatch(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].peers;
        const targetPeerAIndex = updated.findIndex((peer) => peer.id === action.payload.peer_a_id);
        const targetPeerBIndex = updated.findIndex((peer) => peer.id === action.payload.peer_b_id);

        if (targetPeerAIndex !== -1 && targetPeerBIndex !== -1) {
          updated[targetPeerAIndex].matchings = action.payload.result.peer_a_matches;
          updated[targetPeerBIndex].matchings = action.payload.result.peer_b_matches;
          state.cohorts[targetCohortIndex].peers = updated;
        }
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
    updateRegistrationSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].enrollments;
        const targetEnrollmentIndex = updated.findIndex(
          (enrollment) => enrollment.id === action.payload.enrollment.id
        );

        if (targetEnrollmentIndex !== -1) {
          updated[targetEnrollmentIndex] = action.payload.enrollment;
          state.cohorts[targetCohortIndex].enrollments = updated;
        }
      }
    },
    deleteApplicationSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].enrollments;

        state.cohorts[targetCohortIndex].enrollments = updated.filter(
          (enrollment) => enrollment.id !== action.payload.enrollmentID
        );
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
    },
    addErrors(state, action) {
      state.errors = action.payload.error;
    },
    clearErrors(state) {
      state.errors = [];
    }
  }
});

export default slice.reducer;

// Actions
export const { clearErrors } = slice.actions;

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

export function acceptApplication(cohortID: string, enrollmentID: string) {
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

export function rejectApplication(cohortID: string, enrollmentID: string) {
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

export function markApplicationAsPaid(cohortID: string, enrollmentID: string) {
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

export function resetApplicationStatus(cohortID: string, enrollmentID: string) {
  return async () => {
    try {
      const response = await axios.post(
        `/cohorts/${cohortID}/enrollments/${enrollmentID}/reset_status.json`
      );

      dispatch(
        slice.actions.updateRegistrationSuccess({ cohort_id: cohortID, enrollment: response.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function notInterestedApplication(cohortID: string, enrollmentID: string) {
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

export function paymentRemindApplication(cohortID: string, enrollmentID: string) {
  return async () => {
    try {
      const response = await axios.post(
        `/cohorts/${cohortID}/enrollments/${enrollmentID}/payment_reminder.json`
      );

      dispatch(
        slice.actions.updateRegistrationSuccess({ cohort_id: cohortID, enrollment: response.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteApplication(cohortID: string, enrollmentID: string) {
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

export function updateApplication(cohortID: string, enrollment: Enrollment) {
  return async () => {
    try {
      const response = await axios.put(`/cohorts/${cohortID}/enrollments/${enrollment.id}.json`, {
        enrollment
      });
      dispatch(
        slice.actions.updateRegistrationSuccess({ cohort_id: cohortID, enrollment: response.data })
      );
    } catch (error) {
      dispatch(slice.actions.addErrors({ error }));
      console.log(error);
    }
  };
}

export function getPeers(cohortID: string, userID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/peers.json`);
      const { peers } = response.data;
      const { cohort_id } = response.data;

      dispatch(slice.actions.getPeersSuccess({ peers, cohort_id, userID }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getEnrollments(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/enrollments.json`);
      dispatch(slice.actions.getEnrollmentsSuccess(response.data));
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

export function getAnalytics(cohort_id: string, instructor_name: string) {
  return async () => {
    try {
      const response = await axios.get(
        `/analytics?page_name=${instructor_name}&cohort_id=${cohort_id}`
      );
      dispatch(slice.actions.getAnalyticsSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateReferralCodes(cohortID: string, codes: ReferralCode[], onError: Function) {
  return async () => {
    try {
      const response = await axios.post(`/cohorts/${cohortID}/referral_codes/update_codes.json`, {
        codes
      });
      dispatch(slice.actions.getCodesSuccess(response.data));
    } catch (error: any) {
      onError(error?.error);
      console.log(error);
    }
  };
}

export function getReferralCodes(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/referral_codes.json`);
      dispatch(slice.actions.getCodesSuccess(response.data));
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

export function matchUsers(peer_a_id: string, peer_b_id: string, cohortID: string) {
  return async () => {
    try {
      const response = await axios.post(`/cohorts/${cohortID}/match.json`, {
        peer_a_id,
        peer_b_id
      });
      const result = response.data;
      dispatch(
        slice.actions.updatePeersMatch({
          cohortID,
          peer_b_id,
          peer_a_id,
          result
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
