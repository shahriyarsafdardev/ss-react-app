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
