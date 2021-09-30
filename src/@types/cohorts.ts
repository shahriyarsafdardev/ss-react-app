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
  submitted_answer: string;
};

export type Survey = {
  submitted: boolean;
  contents: SurveyContent[];
};

export type Session = {
  id: string;
  name: string;
  number: number;
  length: string;
  time: string;
  recording_url: string;
  description: string;
  summary: string;
  presentation_pdf_url: string;
  survey: Survey;
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
  peers: StudentProfile[];
  sessions: Session[];
};
