export type Event = {
  id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  thumbnail_url: string;
  recording_url: string;
  hosts: EventHost[];
  access_type: string;
  is_registered: boolean;
  cohort_id: string | null;
  zoom_url?: string;
  cohort_link?: string;
};

export type EventHost = {
  name: string;
  picture_url: string;
  position: string;
  company: string;
};
