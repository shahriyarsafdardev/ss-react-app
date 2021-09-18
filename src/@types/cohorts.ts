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
  strengths: Tag[];
  interests: Tag[];
  profile_image_url: string;
};

type Tag = {
  name: string;
  color: LabelColor;
};

type LabelColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

export type Cohort = {
  id: string;
  name: string;
  peers: StudentProfile[];
};
