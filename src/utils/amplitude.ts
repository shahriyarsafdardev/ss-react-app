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

export const sendAmplitudeData = (eventType: string, eventProperties: any) => {
  amplitudeInstance().logEvent(eventType, eventProperties);
};

export const EVENT_TYPES = {
  page_view: 'Page view',
  peers_tab: 'Peers Tab',
  opened_modal: 'Peer modal viewed',
  peers_filters: 'Peer Filters'
};
