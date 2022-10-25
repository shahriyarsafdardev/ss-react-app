export type Company = {
  id: string;
  name: string;
  number_of_employees: string;
  logo_url: string;
};

export type StudentProfile = {
  id: string;
  peer_id: string;
  slug: string;
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

export type Alumni = {
  id: string;
  enrollment_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  linkedin_url: string;
  company_name: string;
  paid_cohorts: string;
  unpaid_cohorts: string;
  notes: string;
  mailing_list: boolean;
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
  category: string;
  complete: boolean;
  is_private: boolean;
  index?: number;
  thumbnail_image_url?: string;
  description?: string;
  included_in_get_ready_checklist: boolean;
  included_in_session_materials_tab: boolean;
};

export type RecordingUrl = {
  name: string;
  recording_url: string;
};

export type SessionTimestamp = {
  id: string;
  description: string;
  timestamp: string;
  session_time: string;
  thumbnail_url: string;
};

export type Session = {
  id: string;
  name: string;
  number: number;
  survey_completed: boolean;
  collect_feedback: boolean;
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
  materials: SessionMaterial[];
  timestamps: SessionTimestamp[];
  display_in_sessions_tab: boolean;
  custom_name: string;
  networking_session: string;
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
  credit_account: string;
  status: string;
  notes: string;
  stream: string;
  card_added: boolean;
  coupon_code: string;
  referrer_domain?: string;
  time: string;
  last_action_date: string;
  application_accepted_time: string;
  payment_link_opened_time: string;
  paid_time: string;
  cohort_id?: string;
  cohort_code?: string;
  cohort_name?: string;
  source: string;
  admin_labelled_source: string;
  payment_link: string;
};

export type CohortSale = {
  id: string;
  code: string;
  name: string;
  start_date: string;
  seats_sold: string;
  seats_sold_week: string;
  revenue: number;
  revenue_week: number;
};

export type CohortExperience = {
  id: string;
  code: string;
  intake: string;
  name: string;
  start_date: string;
  participants: number;
  live_attendance: number;
  live_async_attendance: number;
};

export type OnboardingData = {
  onboarding_messaging_step_completed: boolean;
  onboarding_networking_step_completed: boolean;
  onboarding_referral_step_completed: boolean;
  onboarding_questionnaire_step_completed: boolean;
  onboarding_calendar_sync_step_completed: boolean;
  checklist_completed: boolean;
};

export type Cohort = {
  id: string;
  name: string;
  code: string;
  intake_name: string;
  session_times: string;
  host_names: string;
  host_full_name: string;
  host_image_url: string;
  is_host: boolean;
  is_free: boolean;
  is_feedback_submitted: boolean;
  released_for_learners: boolean;
  intake: number;
  questions_url: string;
  goodbye_message: string;
  peers: StudentProfile[];
  sessions: Session[];
  code_onboarding_items: CodeOnboardingItem[];
  enrollments: Enrollment[];
  random_peers: StudentProfile[];
  calendar_invite_url: string;
  referral_codes: ReferralCode[];
  start_date: string;
  analytics: any;
  alumni_event: boolean;
  registration_page_url: string;
  new_home_tab: boolean;
  instructor_message: string;
  readings_released: boolean;
  amplitude_events_timeline: AmplitudeEventsTimeline;
  onboarding_data: OnboardingData;
};

export type CodeOnboardingItem = {
  id: string;
  step: number;
  description: string;
  external_link: string;
  is_optional: boolean;
  is_completed: boolean;
};

export type AmplitudeEventsTimeline = {
  start_date: string;
  end_date: string;
  first_session_date: string;
  last_session_date: string;
  next_session: SessionTimeline;
  previous_session: SessionTimeline;
  current_session: SessionTimeline;
  session_times: string[];
};

export type SessionTimeline = {
  id?: string;
  name?: string;
  number?: string;
  date?: string;
};

export type ReferralCode = {
  id: string;
  cohort_id: string;
  code: string;
  referral_message: string;
  referral_notes: string;
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

export type CardType = {
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
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
  email: string;
  company: string;
  position: string;
  attendanceData: string[]; // AttendanceType[]
};

export type CohortAttendanceRecord = {
  totalSessions: number;
  sessionNames: string[];
  sessionAttendanceRecords: SessionAttendanceRecord[];
};

export const AttendanceType = {
  live: 'live',
  recorded: 'recorded',
  none: 'none'
};

export type Account = {
  accountName: string;
  cardExpiry: string;
  cardNumber: string;
  credit_balance: number;
  id: string;
};

export type BillHistory = {
  date: string;
  description: string;
  amount: number;
  id: string;
  invoice: string;
};

export type Subscription = {
  id: string;
  start_date: string | null;
  next_billing_date: string | null;
  active: boolean;
  yearly_credit_amount: number;
};

export type CreditObject = {
  id: string;
  time: string;
  type: string;
  approved: boolean | null;
  attendee_name: string | null;
  cohort_name: string | null;
  cohort_link: string | null;
  credit_amount: number;
};

export type SubscriptionDetail = {
  account: Account;
  history: BillHistory[];
  subscription: Subscription;
  team_discount: number;
};
