import { createSlice } from '@reduxjs/toolkit';
import axiosV2 from 'utils/axiosV2';
import { dispatch } from '../store';
import { Path } from '../../@types/course';

type PathState = {
  paths: Path[];
};

const initialState: PathState = {
  paths: []
};

const slice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    getPathsSuccess(state, action) {
      state.paths = action.payload;
    },
    getPathSuccess(state, action) {
      const targetPathIndex = state.paths.findIndex(
        (path) => path.slug === action.payload.pathSlug
      );
      if (targetPathIndex !== -1) {
        const updated: Path = state.paths[targetPathIndex];
        state.paths[targetPathIndex] = { ...updated, ...action.payload.path };
      }
    },
    getSessionsSuccess(state, action) {
      const targetPathIndex = state.paths.findIndex(
        (path) => path.slug === action.payload.pathSlug
      );
      if (targetPathIndex !== -1) {
        const updated = state.paths[targetPathIndex].courses;
        const targetCourseIndex = updated.findIndex(
          (course) => course.id === action.payload.courseID
        );

        if (targetCourseIndex !== -1) {
          updated[targetCourseIndex].sessions = action.payload.sessions;
          state.paths[targetPathIndex].courses = updated;
        }
      }
    }
  }
});

export default slice.reducer;

export function getPaths() {
  return async () => {
    try {
      const response = await axiosV2.get(`/paths.json`);
      dispatch(slice.actions.getPathsSuccess(response?.data?.paths));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPathData(pathSlug: string) {
  return async () => {
    try {
      const response = await axiosV2.get(`/paths/${pathSlug}.json`);
      dispatch(slice.actions.getPathSuccess({ pathSlug, path: response?.data?.path }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCourseSessions(pathSlug: String, courseID: string) {
  return async () => {
    try {
      const response = await axiosV2.get(`/paths/course_sessions.json?course_id=${courseID}`);
      dispatch(
        slice.actions.getSessionsSuccess({ pathSlug, courseID, sessions: response.data?.sessions })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
