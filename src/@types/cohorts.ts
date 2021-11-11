export type Company = {
  id: string;
  name: string;
  logo_url: string;
};

export type StudentProfile = {
  id: string;
  first_name: string;
  last_name: string;
  current_company: Company;
  current_position: string;
  strengths: string[];
  interests: string[];
  profile_image_url: string;
};

type Tag = {
  name: string;
  color: LabelColor;
};

type LabelColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
export type SurveyContent = {
  question_type: string;
  title: string;
  options?: string[];
  submitted_answer: string | null;
};

export type Survey = {
  submitted: boolean;
  contents: SurveyContent[];
};

export type SessionMaterial = {
  name: string;
  action_text: string;
  info_text: string;
  action_url: string;
  complete: boolean;
};

export type Session = {
  id: string;
  name: string;
  number: number;
  survey_completed: boolean;
  length: string;
  time: string;
  zoom_url: string;
  recording_url: string;
  recording_thumbnail_url: string;
  description: string;
  summary: string;
  presentation_pdf_url: string;
  presentation_pdf_downloadable: boolean;
  survey: Survey;
  resources: string;
  session_materials: SessionMaterial[];
};

export type SessionListItem = {
  id: string;
  name: string;
  length: string;
  time: string;
  number: number;
};

export type Cohort = {
  id: string;
  name: string;
  isOnboarded: boolean;
  intake: number;
  questions_url: string;
  peers: StudentProfile[];
  sessions: Session[];
  enrollments: String[];
};

