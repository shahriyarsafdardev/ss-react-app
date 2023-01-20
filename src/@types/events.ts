export type Event = {
  id: string;
  name: string;
  description: string;
  time: string;
  thumbnail_url: string;
  recording_url: string;
  hosts: EventHost[];
  access_type: string;
  is_registered: boolean;
  cohort_id: string | null;
};

export type EventHost = {
  name: string;
  picture_url: string;
  position: string;
  company: string;
};
