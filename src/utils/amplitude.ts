import amplitude from 'amplitude-js';
import axios from 'utils/axios';

const AMPLITUDE_API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY;

const amplitudeInstance = () => amplitude.getInstance();

export const initAmplitude = () => {
  amplitudeInstance().init(AMPLITUDE_API_KEY || '');
};

export const setAmplitudeUserDevice = (installationToken: string) => {
  amplitudeInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = (userSlug: string | null) => {
  amplitudeInstance().setUserId(userSlug);
};

export const setAmplitudeUserProperties = (properties: any) => {
  amplitudeInstance().setUserProperties(properties);
};

export const addAmplitudeUserProperty = (key: string, value: string) => {
  const identificationData = new amplitude.Identify().set(key, value);
  amplitudeInstance().identify(identificationData);
};

export const isSessionStarted = (eventProperties: any) => {
  const localStorageTime = localStorage.getItem(
    `sphere-latest-action-time-${eventProperties[GENERIC_EVENTS.cohort_code]?.toLowerCase()}`
  );
  const oldTime = localStorageTime ? new Date(localStorageTime) : null;
  const currentTime = new Date();

  localStorage.setItem(
    `sphere-latest-action-time-${eventProperties[GENERIC_EVENTS.cohort_code]?.toLowerCase()}`,
    currentTime.toString()
  );
  let differenceInTime = 0;
  differenceInTime = oldTime ? Math.floor(Math.abs(+oldTime - +currentTime) / (1000 * 60 * 60)) : 0;
  return !oldTime || differenceInTime >= 2;
};

export const sendAmplitudeData = async (eventType: string, eventProperties: any) => {
  let updatedEventProperties = eventProperties;
  if (!eventProperties[GENERIC_EVENTS.cohort_code]) {
    updatedEventProperties = {
      ...eventProperties,
      ...emptyCohortGenericProperties
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
      data.append('user_id', eventProperties['Referree Email']);
      data.append('event_type', 'Cohort Registration - Invited by Referral');
      data.append('event_properties', JSON.stringify(eventProperties));
      await axios.post(`/segments/trigger_segment_event.json`, data);
    } catch (error) {
      console.log(error);
    }
  }
};

export const setSegmentUserProperties = (user: any) => {
  window.analytics?.identify(user?.slug, {
    email: user?.email,
    full_name: user?.displayName,
    type: user?.type,
    company: user?.current_company,
    position: user?.current_position,
    industry: user?.current_industry_category_selections?.join(),
    live_attandance: `${user?.user_live_attendance_percentage}%`
  });
};

export const EVENT_TYPES = {
  page_type: 'Page Type',
  questions_tab: 'Questions Tab',
  page_view: 'Page view',
  peers_tab: 'Peers Tab',
  sessions_tab: 'Sessions Tab',
  home_tab: 'Home Tab',
  attendance_tab: 'Attendance Tab',
  registrations_tab: 'Registrations Tab',
  messaging_tab: 'Messaging Tab',
  account_settings_tab: 'Account Settings'
};

export const SESSION_EVENTS = {
  session_page_action: 'Sessions Page Action',
  session_number: 'Session Number',
  category: 'Category',
  action: 'Action',
  resources_tab: 'Resources Tab',
  recording_video_player: 'Recording Video Player',
  slides_tab: 'Slides Tab',
  summary_tab: 'Summary Tab',
  zoom_preview: 'Zoom Preview',
  opened_zoom_link: 'Opened Zoom Link'
};

export const RESOURCES_EVENTS = {
  opened: 'Opened Tab',
  opened_link: 'Opened Link'
};

export const SLIDE_EVENTS = {
  opened: 'Opened Tab',
  downloaded_pdf: 'Download PDF',
  full_screen_view: 'Opened Full Screen View',
  navigated_left: 'Navigated Left',
  navigated_right: 'Navigated Right'
};

export const ONBOARDING_EVENTS = {
  event_type: 'Onboarding Event',
  event: 'Event',
  category: 'Category',
  description: 'Description'
};

export const trackOnboardingEvent = (eventType: string, eventData: any, cohort?: any) => {
  const newEventData = {
    ...setGenericEventProperties(cohort),
    ...eventData
  };
  sendAmplitudeData(ONBOARDING_EVENTS.event_type, newEventData);
};

export const REFERRAL_EVENTS = {
  event_type: 'Referral Event',
  copy_event_type: "Sidebar - Referral Preview - 'Copy Link' Selected",
  open_modal_event_type: 'Sidebar - Referral Preview - Email Invite Modal Opened',
  email_sent_event_type: 'Sidebar - Referral Preview - Email Invite Sent',
  referee_first_name: 'Referee First Name',
  referee_full_name: 'Referee Full Name',
  referee_email: 'Referee Email',
  event: 'Event',
  category: 'Category',
  description: 'Description',
  referrer_code: 'Referrer Code',
  invite_full_name: 'Invite Full Name',
  invite_email: 'Invite Email',
  registration_flow: 'Registration Flow'
};

export const trackReferralEvent = (eventType: string, eventData: any, cohort?: any) => {
  const newEventData = {
    ...setGenericEventProperties(cohort),
    ...eventData
  };
  sendAmplitudeData(eventType, newEventData);
};

export const trackSessionsPageEvent = (
  sessionNumber: number,
  eventType: string,
  eventData?: string,
  cohort?: any
) => {
  const amplitudeData = {
    ...setGenericEventProperties(cohort),
    [SESSION_EVENTS.session_number]: sessionNumber
  };

  sendAmplitudeData(SESSION_EVENTS.session_page_action, {
    ...amplitudeData,
    [SESSION_EVENTS.category]: eventType,
    [SESSION_EVENTS.action]: eventData
  });
};

export const PEERS_PAGE_EVENTS = {
  peers_page_action: 'Peers Page Action',
  grid_view: 'Grid View',
  filters_applied: 'Filters applied',
  view_selection: 'View Selection',
  modal_open_event: 'Opened Member Details Modal',
  member_details_modal: 'Learner Details Modal',
  opened_linked_in: 'Opened LinkedIn'
};

export const trackPeersPageEvent = (eventType: string, eventData?: string, cohort?: any) => {
  const amplitudeData = {
    ...setGenericEventProperties(cohort)
  };

  sendAmplitudeData(PEERS_PAGE_EVENTS.peers_page_action, {
    ...amplitudeData,
    [SESSION_EVENTS.category]: eventType,
    [SESSION_EVENTS.action]: eventData
  });
};

export const HOME_PAGE_EVENTS = {
  home_page_action: 'Home Page Action',
  category: 'Category',
  action: 'Action',
  cohort_timeline: 'Cohort Timeline',
  session_number: 'Session Number',
  to_do_list: 'To-Do List',
  network_suggestion: 'Network Suggestion',
  zoom_preview: 'Zoom Preview',
  opened_zoom_link: 'Opened Zoom Link',
  source: 'Source',
  joined_zoom_session: 'Join Zoom Session'
};

export const trackHomePageEvents = (
  sessionNumber: number | undefined,
  eventType: string,
  eventData?: string,
  source?: string,
  cohort?: any
) => {
  const amplitudeData = {
    ...setGenericEventProperties(cohort),
    [HOME_PAGE_EVENTS.session_number]: sessionNumber,
    [HOME_PAGE_EVENTS.source]: source || 'from_portal'
  };

  sendAmplitudeData(HOME_PAGE_EVENTS.home_page_action, {
    ...amplitudeData,
    [HOME_PAGE_EVENTS.category]: eventType,
    [HOME_PAGE_EVENTS.action]: eventData
  });
};

export const MESSAGING_EVENTS = {
  message_tab_action: 'Messaging Tab Action',
  category: 'Category',
  action: 'Action'
};

export const trackMessagingEvents = (eventCategory: string, eventData: string, cohort?: any) => {
  sendAmplitudeData(MESSAGING_EVENTS.message_tab_action, {
    ...setGenericEventProperties(cohort),
    [MESSAGING_EVENTS.category]: eventCategory,
    [MESSAGING_EVENTS.action]: eventData
  });
};

export const QnA_EVENTS = {
  qna_page_action: 'QnA Page Action',
  page_type: 'QnA Page',
  action: 'Action',
  category: 'Category'
};

export const trackQnAEvents = (eventCategory: string, eventData: string, cohort?: any) => {
  sendAmplitudeData(QnA_EVENTS.qna_page_action, {
    ...setGenericEventProperties(cohort),
    [QnA_EVENTS.category]: eventCategory,
    [QnA_EVENTS.action]: eventData
  });
};

export const REGISTRATION_EVENTS = {
  registrant_email: 'Registrant Email',
  source: 'Source',
  price: 'Price',
  amount_paid: 'Amount Paid',
  referree_email: 'Referree Email',
  referree_name: 'Referree Name',
  linkedIn_url: 'LinkedIn URL',
  first_name: 'First Name',
  last_name: 'Last Name',
  company_is_enterprise_customer: 'Company is Enterprise Customer',
  company_has_sphere_alumni: 'Company has Sphere Alumni'
};

export const trackRegistrationEvent = (cohort: any, eventType: string, eventData: any) => {
  sendAmplitudeData(eventType, {
    ...eventData,
    ...setGenericEventProperties(cohort)
  });
};

export const NEW_HOME_TAB_EVENTS = {
  reading_number: 'Reading Number',
  reading_name: 'Reading Name',
  session_number: 'Session Number'
};

export const trackNewHomeTabEvent = (cohort: any, eventType: string, eventData: any) => {
  const newEventData = {
    ...eventData,
    ...setGenericEventProperties(cohort)
  };
  sendAmplitudeData(eventType, newEventData);
};

export const trackPageViewEvent = (cohort: any, pageType: string) => {
  sendAmplitudeData(EVENT_TYPES.page_view, {
    [EVENT_TYPES.page_type]: pageType,
    ...setGenericEventProperties(cohort)
  });
};

export const trackSidebarEvent = (cohort: any, eventType: string) => {
  sendAmplitudeData(eventType, {
    ...setGenericEventProperties(cohort)
  });
};

export const CODE_PAGE_EVENTS = {
  resource_name: 'Resource Name'
};

export const trackGenericEvent = (cohort: any, eventType: string, eventData?: any) => {
  const eventProperties = eventData || null;
  sendAmplitudeData(eventType, {
    ...eventProperties,
    ...setGenericEventProperties(cohort)
  });
};

export const GENERIC_EVENTS = {
  cohort_name: 'Cohort Name',
  cohort_code: 'Cohort Code',
  cohort_intake: 'Cohort Intake',
  cohort_intake_number: 'Cohort Intake Number',
  days_before_first_session: 'Days Before First Session',
  days_after_first_session: 'Days After First Session',
  days_after_last_session: 'Days After Last Session',
  hours_before_next_session: 'Hours Before Next Session',
  hours_after_previous_session: 'Hours After Previous Session',
  is_during_session: 'Is During Session'
};

export const RESOURCE_SHARE_EVENTS = {
  shared_with: 'Shared With'
};

export const setGenericEventProperties = (cohort: any) => ({
  [GENERIC_EVENTS.cohort_name]: cohort?.name,
  [GENERIC_EVENTS.cohort_code]: cohort?.code,
  [GENERIC_EVENTS.cohort_intake]: cohort?.intake_name,
  [GENERIC_EVENTS.cohort_intake_number]: cohort?.intake,
  [GENERIC_EVENTS.days_before_first_session]:
    cohort?.amplitude_events_timeline?.days_before_first_session,
  [GENERIC_EVENTS.days_after_first_session]:
    cohort?.amplitude_events_timeline?.days_after_first_session,
  [GENERIC_EVENTS.days_after_last_session]:
    cohort?.amplitude_events_timeline?.days_after_last_session,
  [GENERIC_EVENTS.hours_before_next_session]:
    cohort?.amplitude_events_timeline?.hours_before_next_session,
  [GENERIC_EVENTS.hours_after_previous_session]:
    cohort?.amplitude_events_timeline?.hours_after_previous_session,
  [GENERIC_EVENTS.is_during_session]: cohort?.amplitude_events_timeline?.is_during_session
});

const emptyCohortGenericProperties = {
  [GENERIC_EVENTS.cohort_name]: 'none',
  [GENERIC_EVENTS.cohort_code]: 'none',
  [GENERIC_EVENTS.cohort_intake]: 'none',
  [GENERIC_EVENTS.cohort_intake_number]: 'none',
  [GENERIC_EVENTS.days_before_first_session]: 'none',
  [GENERIC_EVENTS.days_after_first_session]: 'none',
  [GENERIC_EVENTS.days_after_last_session]: 'none',
  [GENERIC_EVENTS.hours_before_next_session]: 'none',
  [GENERIC_EVENTS.hours_after_previous_session]: 'none',
  [GENERIC_EVENTS.is_during_session]: 'none'
};
