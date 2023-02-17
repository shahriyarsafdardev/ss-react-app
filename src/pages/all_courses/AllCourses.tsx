import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { LoadingContainer } from 'pages/admin/Common';
import useAuth from 'hooks/useAuth';
import { trackEvent } from 'utils/eventTracking';
import { Stack } from '@material-ui/core';
import axiosV2 from 'utils/axiosV2';
import CoursesList from './CoursesList';
import CourseFiltersSidebar from './CourseFiltersSidebar';
import { useStyles } from './Common';
import SearchBar from './SearchBar';

export default function AllCourses() {
  const [courses, setCourses] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timer, setTimer] = useState<any>(null);
  const { isAuthenticated } = useAuth();
  const url = new URLSearchParams(useLocation().search);
  const classes = useStyles();
  const categoryParam = url.get('category') || '';

  useEffect(() => {
    const getCourses = async () => {
      await axiosV2.get(`/courses/all_courses.json`).then((res) => {
        setCourses(res.data.courses);
        setCategories(res.data.categories);
        setSubCategories(res.data.subcategories);
      });
    };
    getCourses();
    setSelectedCategory(categoryParam);
    trackEvent(null, 'All Courses Page - Page Loaded');
  }, []);

  useEffect(() => {
    !isAuthenticated &&
      window.analytics?.ready &&
      window.analytics?.ready(() => {
        window.analytics?.identify(window.analytics?.user().anonymousId(), {});
      });
  }, []);

  const handleTextChange = (query: string) => {
    setSearchQuery(query);
    clearTimeout(timer);
    if (query) {
      const newTimer = setTimeout(
        async () =>
          trackEvent(null, 'Courses Page - Search Query', {
            'Search Query': query,
            'Page URL': window.location.href
          }),
        300
      );
      setTimer(newTimer);
    }
  };

  useEffect(() => {
    const { origin } = window.location;
    const pageURL = new URL(`${origin}/all-courses`);
    if (selectedCategory) {
      const params = new URLSearchParams();
      params.set('category', selectedCategory);
      pageURL.search = params.toString();
    }
    window.history.pushState(null, '', pageURL.toString());
  }, [selectedCategory]);

  const applyFilters = useCallback(() => {
    let filteredCourses: any = courses;
    if (selectedCategory) {
      filteredCourses = filteredCourses?.filter(
        (course: any) =>
          selectedCategory === course.business_function_category ||
          selectedCategory === course.business_function_subcategory
      );
    }
    if (searchQuery) {
      filteredCourses = filteredCourses.filter(
        (course: any) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course?.instructor_names?.toLowerCase()?.includes(searchQuery.toLowerCase())
      );
    }
    return filteredCourses;
  }, [selectedCategory, courses, searchQuery]);

  if (courses.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | All Courses" className={classes.page}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={handleTextChange} />
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <CourseFiltersSidebar
          categories={categories}
          subCategories={subCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Stack alignItems="center" className={classes.courseListComponent}>
          <CoursesList courses={applyFilters()} />
        </Stack>
      </Stack>
    </Page>
  );
}
