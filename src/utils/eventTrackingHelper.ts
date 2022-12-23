import { memoize } from 'lodash';

const getDaysBetweenDates = memoize((date1: Date, date2: Date) => {
  const days = Math.floor((date1?.getTime() - date2?.getTime()) / (1000 * 60 * 60 * 24));
  return days <= 0 ? null : days;
});

const getHoursBetweenDates = memoize((date1: Date, date2: Date) => {
  const hours = Math.floor((date1?.getTime() - date2?.getTime()) / 36e5);
  return hours <= 0 ? null : hours;
});

export const sessionEventsDaysTimeline = (cohort: any) => {
  const { start_date, end_date, first_session_date, last_session_date } =
    cohort?.amplitude_events_timeline;
  const days_before_first_session_starts = start_date
    ? getDaysBetweenDates(new Date(start_date), new Date())
    : null;
  const days_after_first_session_finished = first_session_date
    ? getDaysBetweenDates(new Date(), new Date(first_session_date))
    : null;
  const days_before_final_session_starts = last_session_date
    ? getDaysBetweenDates(new Date(last_session_date), new Date())
    : null;
  const days_after_final_session_finished = end_date
    ? getDaysBetweenDates(new Date(), new Date(end_date))
    : null;

  return {
    'Days Before First Session Starts': days_before_first_session_starts,
    'Days After First Session Finished': days_after_first_session_finished,
    'Days Before Final Session Starts': days_before_final_session_starts,
    'Days After Final Session Finished': days_after_final_session_finished
  };
};

export const previousSessionEventsTimeline = (cohort: any) => {
  const { previous_session } = cohort?.amplitude_events_timeline;
  if (!previous_session?.id) {
    return {};
  }
  const hours_after_previous_session = previous_session?.date
    ? getHoursBetweenDates(new Date(), new Date(previous_session?.date))
    : null;
  return {
    'Previous Session ID': previous_session?.id,
    'Previous Session Number': previous_session?.number,
    'Previous Session Name': previous_session?.name,
    'Hours After Previous Session Finished': hours_after_previous_session
  };
};

export const nextSessionEventsTimeline = (cohort: any) => {
  const { next_session } = cohort?.amplitude_events_timeline;
  if (!next_session?.id) {
    return {};
  }
  const hours_before_next_session_starts = next_session?.date
    ? getHoursBetweenDates(new Date(next_session?.date), new Date())
    : null;
  return {
    'Next Session ID': next_session?.id,
    'Next Session Number': next_session?.number,
    'Next Session Name': next_session?.name,
    'Hours Before Next Session Starts': hours_before_next_session_starts
  };
};

export const currentSessionEventsTimeline = (cohort: any) => {
  const { current_session } = cohort?.amplitude_events_timeline;
  if (!current_session?.id) {
    return {};
  }
  const hours_after_current_session_started = current_session?.date
    ? getHoursBetweenDates(new Date(), new Date(current_session?.date))
    : null;
  return {
    'Current Session ID': current_session?.id,
    'Current Session Number': current_session?.number,
    'Current Session Name': current_session?.name,
    'Hours After Current Session Started': hours_after_current_session_started
  };
};

export const cohortInstructorEventsTimeline = memoize((cohort: any) => {
  const instructorName = cohort.host_full_name || cohort.instructor;
  const firstName = instructorName?.split(' ')[0];
  const lastName = instructorName?.split(' ')[1] || instructorName?.split(' ')[0];
  return {
    'Cohort Instructor First Name': firstName,
    'Cohort Instructor Last Name': lastName
  };
});

export const isSessionStarted = (eventProperties: any) => {
  const localStorageTime = localStorage.getItem(
    `sphere-latest-action-time-${eventProperties['Cohort Code']?.toLowerCase()}`
  );
  const oldTime = localStorageTime ? new Date(localStorageTime) : null;
  const currentTime = new Date();

  localStorage.setItem(
    `sphere-latest-action-time-${eventProperties['Cohort Code']?.toLowerCase()}`,
    currentTime.toString()
  );
  let differenceInTime = 0;
  differenceInTime = oldTime ? Math.floor(Math.abs(+oldTime - +currentTime) / (1000 * 60 * 60)) : 0;
  return !oldTime || differenceInTime >= 2;
};

export const emptyCohortGenericProperties = {
  'Cohort ID': 'none',
  'Cohort Code': 'none',
  'Cohort Intake': 'none',
  'Cohort Intake Number': 'none',
  'Cohort Name': 'none',
  'Cohort Instructor First Name': 'none',
  'Cohort Instructor Last Name': 'none'
};
