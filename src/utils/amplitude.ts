import amplitude from 'amplitude-js';

const AMPLITUDE_API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY;

const amplitudeInstance = () => amplitude.getInstance();

export const initAmplitude = () => {
  amplitudeInstance().init(AMPLITUDE_API_KEY || '');
};

export const setAmplitudeUserDevice = (installationToken: string) => {
  amplitudeInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = (userId: string | null) => {
  amplitudeInstance().setUserId(userId);
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
  page_view: 'Page view',
  peers_tab: 'Peers Tab',
  sessions_tab: 'Sessions Tab',
  opened_modal: 'Peer modal viewed',
  peers_filters: 'Peer Filters'
};

export const SESSION_EVENTS = {
  session_page_action: 'Sessions Page Action',
  cohort_name: 'cohort-name',
  cohort_intake_number: 'cohort-intake-number',
  session_number: 'session-number',
  category: 'category',
  action: 'action',
  resources_tab: 'Resources Tab',
  slides_tab: 'Slides Tab',
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
  member_details_modal: 'Member Details Modal',
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
  network_suggestion: 'network-suggestion'
};

export const trackHomePageEvents = (
  cohortName: string,
  intake: number | null,
  sessionNumber: number | undefined,
  eventType: string,
  eventData?: string
) => {
  const amplitudeData = {
    [HOME_PAGE_EVENTS.cohort_name]: cohortName,
    [HOME_PAGE_EVENTS.cohort_intake_number]: intake,
    [HOME_PAGE_EVENTS.session_number]: sessionNumber
  };

  sendAmplitudeData(HOME_PAGE_EVENTS.home_page_action, {
    ...amplitudeData,
    [HOME_PAGE_EVENTS.category]: eventType,
    [HOME_PAGE_EVENTS.action]: eventData
  });
};

const MESSAGING_EVENTS = {
  message_tab_action: 'Messaging Tab Action'
};

export const trackMessagingEvents = (eventCategory: string, eventData: string) => {
  sendAmplitudeData(MESSAGING_EVENTS.message_tab_action, {
    category: eventCategory,
    action: eventData
  });
};
