import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import { CohortContext, SessionContext } from 'contexts/CohortContext';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useAuth from 'hooks/useAuth';
import { trackEvent } from 'utils/eventTracking';
import CohortQuestionnair from 'components/cohorts/onboarding/new-info-forms/CohortQuestionnair';
import InvitePeersModal from 'components/cohorts/home/InvitePeersModal';
import moment from 'moment';
import { firstUpcomingDate } from 'components/cohorts/home/Common';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getSessions, markOnboardingStep } from '../../../../redux/slices/cohort';
import { Session, SessionListItem } from '../../../../@types/cohorts';
import SessionListSidebar from './SessionListSidebar';
import Page from '../../../../components/Page';
import SessionBoard from './SessionBoard';
import SessionList from './SessionList';
import ContentReleasePreview from './ContentReleasePreview';
import { SessionsContainer, SessionListDesktopContainer, LoadingContainer } from './Common';
// ----------------------------------------------------------------------

export default function SessionsTab() {
  const dispatch = useDispatch();
  const [selectedSession, setSelectedSession] = useState(0);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const [invitePeersModalState, setInvitePeersModalState] = useState(false);
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { user } = useAuth();

  const isLearner = user?.type === 'learner';
  const { sessions } = cohort || [];
  let trimmedSessionData: SessionListItem[] = [];

  const filteredSessions: Session[] = useMemo(
    () => sessions?.filter((session) => session.display_in_sessions_tab === true),
    [sessions]
  );

  trimmedSessionData = useMemo(
    () =>
      filteredSessions?.map((session) => ({
        id: session.id,
        name: session.name,
        times: session.times,
        length: session.length,
        number: session.number
      })),
    [filteredSessions]
  );

  useEffect(() => {
    if (cohort && !analyticsSent) {
      sendAnalyticsData('Sessions Page - Page Loaded', {});
      setAnalyticsSent(true);
    }
  }, [cohort?.id]);

  useEffect(() => {
    const sessionNumber = Number(params.get('session')) - 1;
    if (
      filteredSessions &&
      sessionNumber &&
      sessionNumber >= 0 &&
      sessionNumber < filteredSessions.length
    ) {
      setSelectedSession(sessionNumber);
    } else {
      setActivSession();
    }
    return () => setSelectedSession(0);
  }, [sessions]);

  useEffect(() => {
    if (cohort && !sessions?.[0]?.recording_urls) {
      dispatch(getSessions(cohort.id));
    }
  }, [cohort]);

  const setActivSession = useCallback(() => {
    let found = false;
    filteredSessions?.forEach((session, index) => {
      const isPastSession = moment(firstUpcomingDate(session.times)).add(2, 'hours') < moment();
      if (!found && isPastSession && session?.recording_urls?.length > 0) {
        setSelectedSession(index);
      } else {
        found = true;
      }
    });
  }, [filteredSessions]);

  const sendAnalyticsData = useCallback(
    (eventName: string, eventData: any) => {
      trackEvent(cohort, eventName, eventData);
    },
    [cohort]
  );

  const finishInvite = useCallback(() => {
    dispatch(markOnboardingStep(cohort_id, 'onboarding_referral_step_completed'));
    navigate(`/cohorts/${cohort_id}/onboarding-calendar-instructions`);
    setInvitePeersModalState(false);
    sendAnalyticsData('Cohort Onboarding - Invite Team - "Finish" Selected', {});
  }, [cohort_id, dispatch]);

  const cohortSessions = () => {
    if (!cohort?.onboarding_data?.onboarding_questionnaire_step_completed && mode === 'Learner') {
      return <CohortQuestionnair setInvitePeersModalState={setInvitePeersModalState} />;
    }
    if (
      !cohort?.released_for_learners &&
      !cohort?.onboarding_data?.onboarding_referral_step_completed &&
      mode === 'Learner'
    ) {
      return (
        <ContentReleasePreview
          cohort={cohort}
          setInvitePeersModalState={setInvitePeersModalState}
        />
      );
    }

    if (typeof cohort === 'undefined' || !sessions?.[0]?.recording_urls) {
      return (
        <LoadingContainer>
          <LoadingScreen />
        </LoadingContainer>
      );
    }

    if (filteredSessions && filteredSessions.length > 0) {
      return (
        <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
          <SessionsContainer direction="row">
            <SessionListDesktopContainer>
              <SessionList
                isLearner={isLearner}
                onClick={setSelectedSession}
                selectedSession={selectedSession}
                sessionsList={trimmedSessionData}
              />
            </SessionListDesktopContainer>
            <SessionContext.Provider value={{ sessionNumber: selectedSession + 1 }}>
              <SessionBoard
                session={filteredSessions && filteredSessions[selectedSession]}
                isLearner={isLearner}
                isFree={cohort.is_free}
              />
            </SessionContext.Provider>
            <SessionListSidebar
              setSelectedSession={setSelectedSession}
              selectedSession={selectedSession}
              sessionsList={trimmedSessionData}
            />
          </SessionsContainer>
        </AnalyticsContext.Provider>
      );
    }
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  };

  return (
    <CohortContext.Provider
      value={{
        id: cohort?.id,
        cohortName: cohort?.name,
        cohortIntake: cohort?.intake,
        cohort
      }}
    >
      <Page title="Sphere | Sessions">
        <>
          <InvitePeersModal
            invitePeersModalState={invitePeersModalState}
            setInvitePeersModalState={setInvitePeersModalState}
            onFinish={finishInvite}
            trackSegmentEvent={sendAnalyticsData}
          />
          {cohortSessions()}
        </>
      </Page>
    </CohortContext.Provider>
  );
}
