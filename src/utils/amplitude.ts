import amplitude from 'amplitude-js';

const AMPLITUDE_API_KEY = 'a78620e8cb9578648244418f888fc26b';

const amplitudeInstance = () => amplitude.getInstance();

export const initAmplitude = () => {
  amplitudeInstance().init(AMPLITUDE_API_KEY);
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
  event_name: 'Sessions Page Action',
  cohort_name: 'cohort-name',
  cohort_intake_number: 'cohort-intake-number',
  session_number: 'session-number',
  category: 'category',
  action: 'action',
  resources_tab: 'Resources Tab',
  slides_tab: 'Slides Tab'
};

export const RESOURCES_EVENTS = {
  opened: 'Opened',
  opened_link: 'Opened Link'
};

export const SLIDE_EVENTS = {
  opened: 'Opened',
  downloaded_pdf: 'Download PDF',
  full_screen_view: 'Opened Full Screen View',
  navigated_left: 'Navigated Left',
  navigated_right: 'Navigated Right'
};
