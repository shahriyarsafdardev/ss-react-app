const getDaysBetweenDates = (date1: Date, date2: Date) =>
  Math.floor((date1?.getTime() - date2?.getTime()) / (1000 * 60 * 60 * 24));

const getHoursBetweenDates = (date1: Date, date2: Date) =>
  Math.floor((date1?.getTime() - date2?.getTime()) / 36e5);

const isSessionLive = (sessionTimes: string[]) => {
  const currentTime = new Date().getTime();
  let liveSession = false;
  sessionTimes.forEach((time) => {
    if (
      time &&
      new Date(time)?.getTime() < currentTime &&
      new Date(time).getTime() + 2 * 60 * 60 * 1000 > currentTime
    ) {
      liveSession = true;
    }
  });
  return liveSession;
};

export const amplitudeEventsTimeline = (cohort: any) => {
  const {
    start_date,
    end_date,
    first_session_date,
    next_session_date,
    previous_session_date,
    session_times
  } = cohort?.amplitude_events_timeline;
  const days_before_first_session = start_date
    ? Math.max(getDaysBetweenDates(new Date(start_date), new Date()), 0)
    : 0;
  const days_after_first_session = first_session_date
    ? Math.max(getDaysBetweenDates(new Date(), new Date(first_session_date)), 0)
    : 0;
  const days_after_last_session = end_date
    ? Math.max(getDaysBetweenDates(new Date(), new Date(end_date)), 0)
    : 0;
  const hours_before_next_session = next_session_date
    ? Math.max(getHoursBetweenDates(new Date(next_session_date), new Date()), 0)
    : 0;
  const hours_after_previous_session = previous_session_date
    ? Math.max(getHoursBetweenDates(new Date(), new Date(previous_session_date)), 0)
    : 0;
  const is_session_live = isSessionLive(session_times);

  return {
    days_before_first_session,
    days_after_first_session,
    days_after_last_session,
    hours_before_next_session,
    hours_after_previous_session,
    is_session_live
  };
};
