// ----------------------------------------------------------------------

export type payloadUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_image_url: File | any;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  about: string | null;
  role: string;
  isPublic: boolean;
  current_company: string;
  preferred_pronoun: string;
  strengths: string[];
  interests: string[];
  current_role_category_selections: string[];
  current_industry_category_selections: string[];
  opted_in_for_matching_suggestions: boolean;
  networking_matching_preferences: string[];
  linkedin_url: string;
  stream_id: string;
  stream_token: string;
  full_name: string;
};

export type User = {
  id: string;
  displayName: string;
  email: string;
  password: string;
  photoURL: File | any;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  about: string | null;
  role: string;
  isPublic: boolean;
};
