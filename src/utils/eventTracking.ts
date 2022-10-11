import axios from 'utils/axios';
import {
  cohortInstructorEventsTimeline,
  currentSessionEventsTimeline,
  emptyCohortGenericProperties,
  isSessionStarted,
  nextSessionEventsTimeline,
  previousSessionEventsTimeline,
  sessionEventsDaysTimeline
} from './eventTrackingHelper';

export const setSegmentUserProperties = (user: any) => {
  window.analytics?.identify(user?.id, {
    ID: user?.id,
    Slug: user?.slug,
    Email: user?.email,
    'First Name': user?.first_name,
    'Last Name': user?.last_name,
    Attended: user?.attended_cohorts,
    Attendance: `${user?.attendance}%`,
    'Company ID': user?.current_company_id,
    'Company Name': user?.current_company
  });
};

export const sendSegmentData = async (eventType: string, eventProperties: any) => {
  if (isSessionStarted(eventProperties)) {
    window.analytics?.track('Sphere Portal - Session Started', eventProperties);
  }

  window.analytics?.track(eventType, eventProperties);

  if (eventType === 'Cohort Registration - Personal Info Page - Page Loaded') {
    try {
      const data = new FormData();
      data.append('user_id', window.analytics?.user().anonymousId());
      data.append('event_type', 'Backend Cohort Registration - Personal Info Page - Page Loaded');
      data.append('event_properties', JSON.stringify(eventProperties));
      await axios.post(`/segments/trigger_segment_event.json`, data);
    } catch (error) {
      console.log(error);
    }
  }

  if (eventType === 'Cohort Registration - Send Invitation Page - Referral Invite Sent') {
    try {
      const data = new FormData();
      data.append('user_id', eventProperties['Referee Email']);
      data.append('event_type', 'Cohort Registration - Invited by Referral');
      data.append('event_properties', JSON.stringify(eventProperties));
      await axios.post(`/segments/trigger_segment_event.json`, data);
    } catch (error) {
      console.log(error);
    }
  }
};

export const genericEventProperties = (cohort: any) =>
  cohort
    ? {
        'Cohort ID': cohort?.id,
        'Cohort Code': cohort?.code,
        'Cohort Intake': cohort?.intake_name,
        'Cohort Intake Number': cohort?.intake,
        'Cohort Name': cohort?.name,
        ...cohortInstructorEventsTimeline(cohort),
        ...sessionEventsDaysTimeline(cohort),
        ...previousSessionEventsTimeline(cohort),
        ...nextSessionEventsTimeline(cohort),
        ...currentSessionEventsTimeline(cohort)
      }
    : emptyCohortGenericProperties;

export const trackEvent = (cohort: any, eventType: string, eventData?: any) => {
  const eventProperties = eventData || null;
  sendSegmentData(eventType, { ...eventProperties, ...genericEventProperties(cohort) });
};
