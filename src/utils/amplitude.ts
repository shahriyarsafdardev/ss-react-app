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
  // amplitudeInstance().logEvent(eventType, eventProperties);
  // window.analytics?.track(eventType, eventProperties);
};

export const setSegmentUserProperties = (user: any) => {
  window.analytics?.identify(user?.slug, {
    full_name: user?.displayName,
    type: user?.type,
    company: user?.current_company,
    position: user?.current_position,
    industry: user?.current_industry_category_selections?.join(),
    live_attandance: `${user?.user_live_attendance_percentage}%`
  });
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
  account_settings_tab: 'Account Settings'
};

export const SESSION_EVENTS = {
  session_page_action: 'Sessions Page Action',
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
  event: 'event',
  category: 'category',
  description: 'description'
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
  event: 'event',
  category: 'category',
  description: 'description',
  referrer_code: 'referrer_code',
  invite_full_name: 'invite_full_name',
  invite_email: 'invite_email',
  registration_flow: 'registration_flow'
};

export const trackReferralEvent = (eventType: string, eventData: any, cohort?: any) => {
  const newEventData = {
    ...setGenericEventProperties(cohort),
    ...eventData
  };
  sendAmplitudeData(REFERRAL_EVENTS.event_type, newEventData);
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
  message_tab_action: 'Messaging Tab Action'
};

export const trackMessagingEvents = (eventCategory: string, eventData: string, cohort?: any) => {
  sendAmplitudeData(MESSAGING_EVENTS.message_tab_action, {
    ...setGenericEventProperties(cohort),
    category: eventCategory,
    action: eventData
  });
};

export const QnA_EVENTS = {
  qna_page_action: 'QnA Page Action',
  page_type: 'QnA Page',
  action: 'action'
};

export const trackQnAEvents = (eventCategory: string, eventData: string, cohort?: any) => {
  sendAmplitudeData(QnA_EVENTS.qna_page_action, {
    ...setGenericEventProperties(cohort),
    category: eventCategory,
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

export const trackRegistrationEvent = (eventType: string, eventData: any) => {
  sendAmplitudeData(eventType, eventData);
};

export const NEW_HOME_TAB_EVENTS = {
  reading_number: 'Reading Number',
  reading_name: 'Reading Name',
  session_number: 'Session Number'
};

export const trackNewHomeTabEvent = (eventType: string, eventData: any) => {
  sendAmplitudeData(eventType, eventData);
};

export const GENERIC_EVENTS = {
  cohort_name: 'Cohort Name',
  cohort_code: 'Cohort Code',
  cohort_intake: 'Cohort Intake',
  cohort_intake_number: 'Cohort Intake Number',
  days_before_cohort_starts: 'Days Before Cohort Starts',
  days_after_cohort_finished: 'Days After Cohort Starts',
  hours_before_next_session: 'Hours Before Next Session',
  hours_after_previous_session: 'Hours After Previous Session'
};

export const setGenericEventProperties = (cohort: any) => ({
  [GENERIC_EVENTS.cohort_name]: cohort?.name,
  [GENERIC_EVENTS.cohort_code]: cohort?.code,
  [GENERIC_EVENTS.cohort_intake]: cohort?.intake_name,
  [GENERIC_EVENTS.cohort_intake_number]: cohort?.intake,
  [GENERIC_EVENTS.days_before_cohort_starts]:
    cohort?.amplitude_events_timeline?.days_before_cohort_starts,
  [GENERIC_EVENTS.days_after_cohort_finished]:
    cohort?.amplitude_events_timeline?.days_after_cohort_finished,
  [GENERIC_EVENTS.hours_before_next_session]:
    cohort?.amplitude_events_timeline?.hours_before_next_session,
  [GENERIC_EVENTS.hours_after_previous_session]:
    cohort?.amplitude_events_timeline?.hours_after_previous_session
});
