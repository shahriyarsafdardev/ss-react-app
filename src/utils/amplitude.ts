import amplitude from 'amplitude-js';

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

export const sendAmplitudeData = (eventType: string, eventProperties: any) => {
  amplitudeInstance().logEvent(eventType, eventProperties);
};

export const EVENT_TYPES = {
  questions_tab: 'Questions Tab',
  page_view: 'Page view',
  peers_tab: 'Peers Tab',
  sessions_tab: 'Sessions Tab',
  home_tab: 'Home Tab',
  attendance_tab: 'Attendance Tab',
  registrations_tab: 'Registrations Tab',
  messaging_tab: 'Messaging Tab',
  account_settings_tab: 'Account Settings',
  cohort_name: 'cohort-name',
  cohort_intake_number: 'cohort-intake-number'
};

export const SESSION_EVENTS = {
  session_page_action: 'Sessions Page Action',
  cohort_name: 'cohort-name',
  cohort_intake_number: 'cohort-intake-number',
  session_number: 'session-number',
  category: 'category',
  action: 'action',
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
  cohort_name: 'cohort-name',
  cohort_intake_number: 'cohort-intake-number',
  event: 'event',
  category: 'category',
  description: 'description'
};

export const trackOnboardingEvent = (eventType: string, eventData: any) => {
  sendAmplitudeData(ONBOARDING_EVENTS.event_type, eventData);
};

export const REFERRAL_EVENTS = {
  event_type: 'Referral Event',
  cohort_name: 'cohort-name',
  cohort_intake_number: 'cohort-intake-number',
  event: 'event',
  category: 'category',
  description: 'description',
  referrer_code: 'referrer_code',
  invite_full_name: 'invite_full_name',
  invite_email: 'invite_email',
  registration_flow: 'registration_flow'
};

export const trackReferralEvent = (eventType: string, eventData: any) => {
  sendAmplitudeData(REFERRAL_EVENTS.event_type, eventData);
};

export const trackSessionsPageEvent = (
  cohortName: string,
  intake: number | null,
  sessionNumber: number,
  eventType: string,
  eventData?: string
) => {
  const amplitudeData = {
    [SESSION_EVENTS.cohort_name]: cohortName,
    [SESSION_EVENTS.cohort_intake_number]: intake,
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

export const trackPeersPageEvent = (
  cohortName: string,
  intake: number | null,
  eventType: string,
  eventData?: string
) => {
  const amplitudeData = {
    [SESSION_EVENTS.cohort_name]: cohortName,
    [SESSION_EVENTS.cohort_intake_number]: intake
  };

  sendAmplitudeData(PEERS_PAGE_EVENTS.peers_page_action, {
    ...amplitudeData,
    [SESSION_EVENTS.category]: eventType,
    [SESSION_EVENTS.action]: eventData
  });
};

export const HOME_PAGE_EVENTS = {
  home_page_action: 'Home Page Action',
  cohort_name: 'cohort-name',
  cohort_intake_number: 'cohort-intake-number',
  category: 'category',
  action: 'action',
  cohort_timeline: 'cohort-timeline',
  session_number: 'session-number',
  to_do_list: 'to-do-list',
  network_suggestion: 'network-suggestion',
  zoom_preview: 'Zoom Preview',
  opened_zoom_link: 'Opened Zoom Link',
  source: 'source',
  joined_zoom_session: 'Join Zoom Session'
};

export const trackHomePageEvents = (
  cohortName: string,
  intake: number | null,
  sessionNumber: number | undefined,
  eventType: string,
  eventData?: string,
  source?: string
) => {
  const amplitudeData = {
    [HOME_PAGE_EVENTS.cohort_name]: cohortName,
    [HOME_PAGE_EVENTS.cohort_intake_number]: intake,
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
  message_tab_action: 'Messaging Tab Action'
};

export const trackMessagingEvents = (
  cohortName: string,
  intake: number | null,
  eventCategory: string,
  eventData: string
) => {
  sendAmplitudeData(MESSAGING_EVENTS.message_tab_action, {
    [EVENT_TYPES.cohort_name]: cohortName,
    [EVENT_TYPES.cohort_intake_number]: intake,
    category: eventCategory,
    action: eventData
  });
};

export const QnA_EVENTS = {
  qna_page_action: 'QnA Page Action',
  page_type: 'QnA Page',
  action: 'action'
};

export const trackQnAEvents = (
  cohortName: string,
  intake: number | null,
  eventCategory: string,
  eventData: string
) => {
  sendAmplitudeData(QnA_EVENTS.qna_page_action, {
    [EVENT_TYPES.cohort_name]: cohortName,
    [EVENT_TYPES.cohort_intake_number]: intake,
    category: eventCategory,
    [QnA_EVENTS.action]: eventData
  });
};

export const REGISTRATION_EVENTS = {
  registrant_email: 'Registrant Email',
  cohort_name: 'Cohort Name',
  cohort_code: 'Cohort Code',
  cohort_intake_number: 'Cohort Intake Number',
  cohort_intake: 'Cohort Intake',
  source: 'Source',
  price: 'Price'
};

export const trackRegistrationEvent = (eventType: string, eventData: any) => {
  sendAmplitudeData(eventType, eventData);
};
