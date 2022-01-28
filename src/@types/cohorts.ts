export type Company = {
  id: string;
  name: string;
  number_of_employees: string;
  logo_url: string;
};

export type StudentProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  current_company: Company;
  current_position: string;
  preferred_pronoun: string;
  linkedin_url: string;
  is_managing_team: boolean;
  city: string;
  country: string;
  current_role_category_selections: string[];
  current_industry_category_selections: string[];
  strengths: string[];
  interests: string[];
  matchings: string[];
  opted_in_for_matching_suggestions: boolean;
  networking_matching_preferences: string[];
  profile_image_url: string;
  bio_text: string;
  type: string | undefined;
  is_onboarded?: boolean;
};

type Tag = {
  name: string;
  color: LabelColor;
};

type LabelColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
export type SurveyContent = {
  question_type: string;
  title: string;
  options?: string[] | any;
  description: string | null;
  submitted_answer: string | null;
  maxLimit?: number;
};

export type Survey = {
  submitted: boolean;
  contents: SurveyContent[];
};

export type SessionMaterial = {
  id: string;
  name: string;
  action_text: string;
  info_text: string;
  action_url: string;
  complete: boolean;
  index?: number;
};
export type GroupedSessionMaterial = {
  category: string;
  session_materials: SessionMaterial[];
};

export type RecordingUrl = {
  name: string;
  recording_url: string;
};

export type Session = {
  id: string;
  name: string;
  number: number;
  survey_completed: boolean;
  length: string;
  times: string[];
  zoom_url: string;
  recording_urls: RecordingUrl[];
  recording_thumbnail_url: string;
  description: string;
  summary: string;
  presentation_pdf_url: string;
  presentation_pdf_downloadable: boolean;
  summary_notes_included: boolean;
  survey: Survey;
  resources: string;
  session_materials: GroupedSessionMaterial[];
  display_in_sessions_tab: boolean;
  custom_name: string;
};

export type SessionListItem = {
  id: string;
  name: string;
  length: string;
  times: string[];
  number: number;
};

export type Notification = {
  id: string;
  description: string;
  title: string | undefined;
  type: string;
  category: string;
  avatar: string;
  link: string;
  channel_id: string;
  cohort_id: string;
  isUnRead: boolean;
  createdAt: Date;
};

export type Enrollment = {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  linkedin_url: string;
  price: number;
  status: string;
  notes: string;
  stream: string;
  card_added: boolean;
  coupon_code: string;
  time: string;
  application_accepted_time: string;
  payment_link_opened_time: string;
  paid_time: string;
};

export type Cohort = {
  id: string;
  name: string;
  code: string;
  intake_name: string;
  session_times: string;
  host_names: string;
  is_host: boolean;
  isOnboarded: boolean;
  released_for_learners: boolean;
  intake: number;
  questions_url: string;
  goodbye_message: string;
  peers: StudentProfile[];
  sessions: Session[];
  enrollments: Enrollment[];
  random_peers: StudentProfile[];
  calendar_invite_url: string;
};

export type Comment = {
  id: string;
  text: string;
  time: Date;
  user_name: string;
  user_image: string;
  image: string;
  user_id: string;
};

export type Question = {
  answer: string;
  answer_audio_url: string;
  answer_date: string;
  answer_id: string;
  answer_video_screenshot: string;
  answer_video_url: string;
  answered: boolean;
  asker_email: string;
  asker_id: string;
  asker_name: string;
  audio_url: string;
  aws_approved: boolean;
  aws_transcription: string | null;
  date: string;
  id: string;
  question_summary: string;
  question_text: string;
  question_type: string;
  slug: string;
  skipped: boolean;
  thumbnail: string;
  user_id: string;
  user_name: string;
  user_organisation_logo: string;
  user_slug: string;
  video_screenshot: string;
  video_url: string;
  comments: Comment[];
};

export type SessionAttendanceRecord = {
  user_id: string;
  name: string;
  position: string;
  attendanceData: string[]; // AttendanceType[]
};

export type CohortAttendanceRecord = {
  totalSessions: number;
  sessionAttendanceRecords: SessionAttendanceRecord[];
};

export const AttendanceType = {
  live: 'live',
  recorded: 'recorded',
  none: 'none'
};
