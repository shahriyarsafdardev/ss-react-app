export type Course = {
  id: string;
  name: string;
  code: string;
  registration_page_url: string;
  host_names: string;
  host_full_name: string;
  host_full_names: string;
  host_image_url: string;
  intake: string;
  intake_name: string;
  released_for_learners: boolean;
  function: string;
  topics: string;
  seniority: string;
  description: string;
  preview_instructor_name: string;
  preview_instructor_affiliation: string;
  preview_instructor_image: string;
  preview_instructor_logos: string;
  wait_listed: string;
  amplitude_events_timeline: string;
  is_next_recommended: boolean;
  is_complete: boolean;
  sessions: CourseSession[];
};

export type NewCourse = {
  id: string;
  cohort_id: string;
  name: string;
  code: string;
  short_description: string;
  instructor_headshot: string;
  instructor_logos: string;
  instructor_title: string;
  instructor_names: string;
  publically_listed: boolean;
  business_function_category: string;
  business_function_subcategory: string;
  wait_listed: boolean;
  registration_page_released: boolean;
  registration_page_url: string;
  amplitude_events_timeline: string;
};

export type CourseSession = {
  id: string;
  name: string;
  number: string;
  summary: string;
};

export type Path = {
  id: string;
  name: string;
  description: string;
  short_description: string;
  slug: string;
  is_enrolled: boolean;
  courses: Course[];
};
