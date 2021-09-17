export type Company = {
  id: string;
  name: string;
  logoUrl: string;
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

export type Cohort = {
  id: string;
  name: string;
  peers: StudentProfile[];
};
