export type Event = {
  id: string;
  name: string;
  description: string;
  time: string;
  thumbnail_url: string;
  recording_url: string;
  hosts: EventHost[];
};

export type EventHost = {
  name: string;
  picture_url: string;
  position: string;
  company: string;
};
