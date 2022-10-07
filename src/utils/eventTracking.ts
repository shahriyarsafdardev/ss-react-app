import axios from 'utils/axios';

export const setSegmentUserProperties = (user: any) => {
  window.analytics?.identify(user?.slug, {
    email: user?.email,
    full_name: user?.displayName,
    type: user?.type,
    company: user?.current_company,
    position: user?.current_position,
    industry: user?.current_industry_category_selections?.join(),
    live_attendance: `${user?.user_live_attendance_percentage}%`
  });
};

export const isSessionStarted = (eventProperties: any) => {
  const localStorageTime = localStorage.getItem(
    `sphere-latest-action-time-${eventProperties['Cohort Code']?.toLowerCase()}`
  );
  const oldTime = localStorageTime ? new Date(localStorageTime) : null;
  const currentTime = new Date();

  localStorage.setItem(
    `sphere-latest-action-time-${eventProperties['Cohort Code']?.toLowerCase()}`,
    currentTime.toString()
  );
  let differenceInTime = 0;
  differenceInTime = oldTime ? Math.floor(Math.abs(+oldTime - +currentTime) / (1000 * 60 * 60)) : 0;
  return !oldTime || differenceInTime >= 2;
};

export const sendAmplitudeData = async (eventType: string, eventProperties: any) => {
  let updatedEventProperties = eventProperties;
  if (!eventProperties['Cohort Code']) {
    updatedEventProperties = {
      ...eventProperties
    };
  }
  if (isSessionStarted(updatedEventProperties)) {
    window.analytics?.track('Sphere Portal - Session Started', updatedEventProperties);
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

const emptyCohortGenericProperties = {
  'Cohort Name': 'none',
  'Cohort Code': 'none',
  'Cohort Intake': 'none',
  'Cohort Intake Number': 'none',
  'Days Before First Session': 'none',
  'Days After First Session': 'none',
  'Days After Last Session': 'none',
  'Hours Before Next Session': 'none',
  'Hours After Previous Session': 'none',
  'Is During Session': 'none'
};

export const trackEvent = (cohort: any, eventType: string, eventData?: any) => {
  let eventProperties = eventData || null;
  eventProperties = cohort
    ? eventProperties
    : { ...eventProperties, ...emptyCohortGenericProperties };
  sendAmplitudeData(eventType, eventProperties);
};
