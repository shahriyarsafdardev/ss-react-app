import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { groupByIntake } from 'layouts/dashboard/Common';
import { dispatch } from '../store';
import { Cohort, Enrollment, OnboardingData, ReferralCode } from '../../@types/cohorts';
import { setSession } from '../../utils/jwt';

// utils
import axios from '../../utils/axios';

type CohortState = {
  cohorts: Cohort[];
  errors: any;
  referralLink: string;
};

const initialState: CohortState = {
  cohorts: [],
  errors: [],
  referralLink: ''
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
    getCohortsTimelineSuccess(state, action) {
      action.payload.event_timeline.forEach((value: any, index: any) => {
        const targetCohortIndex = state.cohorts.findIndex(
          (cohort) => cohort.id === value.cohort_id
        );
        if (targetCohortIndex !== -1) {
          const updated: Cohort = state.cohorts[targetCohortIndex];
          state.cohorts[targetCohortIndex] = {
            ...updated,
            amplitude_events_timeline: value.amplitude_events_timeline
          };
        }
      });
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
        let updated = state.cohorts[targetCohortIndex].sessions;
        if (state.cohorts[targetCohortIndex].sessions) {
          updated = state.cohorts[targetCohortIndex].sessions;
          action.payload.sessions.forEach((payloadSession: any) => {
            const targetSessionIndex = updated.findIndex(
              (session) => session?.id === payloadSession?.id
            );

            if (targetSessionIndex !== -1) {
              const oldSession = updated?.[targetSessionIndex];
              updated[targetSessionIndex] = payloadSession;
              updated[targetSessionIndex].materials = oldSession.materials;
            }
          });
        } else {
          updated = action.payload.sessions;
        }
        state.cohorts[targetCohortIndex].sessions = updated;
      }
    },
    getBriefSessionsSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, sessions: action.payload.sessions };
      }
    },
    getCodeCheckListSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = {
          ...updated,
          code_onboarding_items: action.payload.code_onboarding_items
        };
      }
    },
    setCodeCheckListSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].code_onboarding_items;
        const targetItemIndex = updated.findIndex((item) => item.id === action.payload.itemID);

        if (targetItemIndex !== -1) {
          updated[targetItemIndex].is_completed = action.payload.status;
          state.cohorts[targetCohortIndex].code_onboarding_items = updated;
        }
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
    updateTimestampSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].sessions;
        const targetSessionIndex = updated.findIndex(
          (session) => session.id === action.payload.sessionID
        );

        if (targetSessionIndex !== -1) {
          let targetTimestampIndex = -1;

          updated[targetSessionIndex].timestamps.map((timestamp, j) => {
            if (timestamp.id === action.payload.timestampID) {
              targetTimestampIndex = j;
            }
          });

          if (targetTimestampIndex !== -1) {
            updated[targetSessionIndex].timestamps[targetTimestampIndex].description =
              action.payload.result.description;
            state.cohorts[targetCohortIndex].sessions = updated;
          }
        }
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
    getCohortResourcesSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const copyCohort: Cohort = state.cohorts[targetCohortIndex];
        copyCohort.resources = action.payload.resources;
        copyCohort.resources_types = action.payload.resources_types;
        state.cohorts[targetCohortIndex] = copyCohort;
      }
    },
    getCohortSessionResourcesSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].resources;
        const targetResourceIndex = updated.findIndex(
          (resource) => resource.session_id === action.payload.sessionID
        );

        if (targetResourceIndex !== -1) {
          updated[targetResourceIndex].materials = action.payload.materials;
          state.cohorts[targetCohortIndex].resources = updated;
        }
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
      const targetCohortIndex = state.cohorts.findIndex((cohort) => cohort.id === action.payload);
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        const updatedOnboarding = updated.onboarding_data;
        const onboardedData = { ...updatedOnboarding, is_onboarded: true };
        state.cohorts[targetCohortIndex] = { ...updated, onboarding_data: onboardedData };
      }
    },
    updateOnboardingStep(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohort_id
      );
      if (targetCohortIndex !== -1) {
        const copyCohort: Cohort = state.cohorts[targetCohortIndex];
        copyCohort.onboarding_data = action.payload.onboarding_data;
        state.cohorts[targetCohortIndex] = copyCohort;
      }
    },
    updateCohortResourceMaterial(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].resources;
        const targetResourceIndex = updated.findIndex(
          (resource) => resource.session_id === action.payload.sessionID
        );

        if (targetResourceIndex !== -1) {
          let targetMaterialIndex = -1;
          const completedMaterialsCount = action.payload.marked
            ? updated[targetResourceIndex].completed_session_materials_count + 1
            : updated[targetResourceIndex].completed_session_materials_count - 1;
          updated[targetResourceIndex].completed_session_materials_count = completedMaterialsCount;

          updated[targetResourceIndex].materials.map((material, j) => {
            if (material.id === action.payload.materialID) {
              targetMaterialIndex = j;
            }
          });

          if (targetMaterialIndex !== -1) {
            updated[targetResourceIndex].materials[targetMaterialIndex].complete =
              action.payload.marked;
            state.cohorts[targetCohortIndex].resources = updated;
          }
        }
      }
    },
    updateFeedbackStatusSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex((cohort) => cohort.id === action.payload);
      if (targetCohortIndex !== -1) {
        const updated: Cohort = state.cohorts[targetCohortIndex];
        state.cohorts[targetCohortIndex] = { ...updated, is_feedback_submitted: true };
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
          let targetMaterialIndex = -1;

          updated[targetSessionIndex].materials.map((material, j) => {
            if (material.id === action.payload.materialId) {
              targetMaterialIndex = j;
            }
          });

          if (targetMaterialIndex !== -1) {
            updated[targetSessionIndex].materials[targetMaterialIndex].complete =
              action.payload.result;
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
    getSessionMaterialsSuccess(state, action) {
      const targetCohortIndex = state.cohorts.findIndex(
        (cohort) => cohort.id === action.payload.cohortID
      );
      if (targetCohortIndex !== -1) {
        const updated = state.cohorts[targetCohortIndex].sessions;
        const targetResourceIndex = updated.findIndex(
          (session) => session.id === action.payload.sessionID
        );

        if (targetResourceIndex !== -1) {
          updated[targetResourceIndex].materials = action.payload.materials;
          state.cohorts[targetCohortIndex].sessions = updated;
        }
      }
    },
    addErrors(state, action) {
      state.errors = action.payload.error;
    },
    clearErrors(state) {
      state.errors = [];
    },
    setReferralLink(state, action) {
      state.referralLink = action.payload.link;
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

export function getCohortsTimeline() {
  return async () => {
    try {
      setAuthorizationToken();
      const response = await axios.get('/cohorts/events_timeline.json');
      dispatch(slice.actions.getCohortsTimelineSuccess(response.data));
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

export function markReadingCompleted(
  cohortID: string,
  sessionID: string,
  materialID: string,
  marked: boolean
) {
  return async () => {
    try {
      await axios
        .post(`/cohorts/${cohortID}/resources/mark_reading.json`, {
          id: materialID,
          marked
        })
        .then((res) => {
          dispatch(
            slice.actions.updateCohortResourceMaterial({
              cohortID,
              sessionID,
              materialID,
              marked
            })
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function markOnboardingStep(cohortID: string, type: string) {
  return async () => {
    try {
      await axios
        .post(`/cohorts/${cohortID}/onboarding/mark_completed_onboarding_step.json`, {
          type
        })
        .then((res) => {
          dispatch(
            slice.actions.updateOnboardingStep({
              cohort_id: cohortID,
              onboarding_data: res.data
            })
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateOnboardingData(cohortID: string, data: any) {
  return async () => {
    try {
      dispatch(
        slice.actions.updateOnboardingStep({
          cohort_id: cohortID,
          onboarding_data: data
        })
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

export function getCohortResources(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/resources.json`);
      dispatch(
        slice.actions.getCohortResourcesSuccess({
          resources: response.data.resources,
          resources_types: response.data.resources_types,
          cohortID
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCohortSessionResources(cohortID: string, sessionID: string) {
  return async () => {
    try {
      const response = await axios.get(
        `/cohorts/${cohortID}/resources/see_more.json?cohort_session_id=${sessionID}`
      );
      dispatch(
        slice.actions.getCohortSessionResourcesSuccess({
          cohortID,
          sessionID,
          materials: response.data.materials
        })
      );
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

export function getBriefSessions(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohorts/${cohortID}/sessions/brief_sessions.json`);
      dispatch(slice.actions.getBriefSessionsSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSessionMaterials(sessionID: string, cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/cohort_sessions/${sessionID}/session_materials.json`);
      dispatch(
        slice.actions.getSessionMaterialsSuccess({ materials: response.data, cohortID, sessionID })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCodeOnboardingCheckList(cohortID: string) {
  return async () => {
    try {
      const response = await axios.get(`/code_onboarding_check_list.json?cohort_id=${cohortID}`);
      dispatch(slice.actions.getCodeCheckListSuccess({ ...response.data, cohortID }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateTimestamp(
  cohortID: string,
  sessionID: string,
  timestampID: string,
  description: string
) {
  return async () => {
    try {
      const response = await axios.post(
        `/session_timestamps/${timestampID}/update_timestamp.json`,
        { description }
      );
      const result = response.data;
      dispatch(
        slice.actions.updateTimestampSuccess({
          cohortID,
          sessionID,
          timestampID,
          result
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function setCodeOnboardingCheckList(itemID: string, status: boolean, cohortID: string) {
  return async () => {
    try {
      setAuthorizationToken();
      await axios.post(`/code_onboarding_check_list.json`, {
        item_id: itemID,
        is_completed: status
      });
      dispatch(slice.actions.setCodeCheckListSuccess({ cohortID, itemID, status }));
    } catch (error: any) {
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

export function updateFeedbackStatus(cohortID: string) {
  return async () => {
    try {
      setAuthorizationToken();
      dispatch(slice.actions.updateFeedbackStatusSuccess(cohortID));
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

export function initializeReferralLink(cohort_id: string) {
  return async () => {
    try {
      setAuthorizationToken();
      const response = await axios.get(`cohorts/${cohort_id}/get_referral_link.json`);
      dispatch(
        slice.actions.setReferralLink({
          link: response.data.link
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
