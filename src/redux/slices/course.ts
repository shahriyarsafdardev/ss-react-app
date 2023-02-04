import { createSlice } from '@reduxjs/toolkit';
import axiosV2 from 'utils/axiosV2';
import { dispatch } from '../store';
import { NewCourse } from '../../@types/course';

type CoursesState = {
  courses: NewCourse[];
};

const initialState: CoursesState = {
  courses: []
};

const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    getCoursesSuccess(state, action) {
      state.courses = action.payload;
    }
  }
});

export default slice.reducer;

export function getCourses() {
  return async () => {
    try {
      const response = await axiosV2.get(`/courses.json`);
      dispatch(slice.actions.getCoursesSuccess(response?.data?.courses));
    } catch (error) {
      console.log(error);
    }
  };
}
