import { useState } from 'react';
import Page from 'components/Page';
import { Stack } from '@material-ui/core';
import TrackHeader from './TrackHeader';
import CourseDetails from './CourseDetails';
import CoursesCarousel from './CoursesCarousel';

const TRACK = {
  name: 'The Complete Data Scientist',
  description:
    'This set of courses was put together by leading executives and experts. It is designed to help industry practitioners elevate their data analysis and experimentation skills from satisfactory to industry leading.'
};
const COURSES = [
  {
    name: 'Applied Casual Inference 1',
    is_next_reccommended: true,
    is_complete: true,
    description:
      'Learn how to use applied causal inference methods to make better product and business decisions live with Rob Donnelly, an industry leader with experience at Instacart and Meta.',
    preview_instructor_affiliation: 'Engineer at Stripe',
    preview_instructor_image:
      'https://uploads-ssl.webflow.com/62b10e6dc5648dfcaf401a94/6376823275bd376e551ef49d_DRS.png',
    preview_instructor_logos:
      'https://uploads-ssl.webflow.com/62b10e6dc5648dfcaf401a94/63781e0fd6003161d79cd496_DRS.svg',
    preview_instructor_name: 'Xavier Amatrian & Deepak Agarwal',
    sessions: [
      {
        number: 1,
        name: 'An Introduction to Casual Inference 2',
        summary:
          '<ul><li>This session will cover the remote workforce returning to offices and how founders and managers in Tech are prepared for things to shift yet again</li><li>Use matching-based estimators to compare similar users who received different “treatments” (e.g., one Amazon Prime member compared to a non-member with similar characteristics)</li><li>Estimate propensity scores and use them for causal inference</li><li>Distinguish between situations where machine learning models may be able to generate reliable causal estimates and when they may not</li></ul>'
      },
      {
        number: 2,
        name: 'Improving Our Causal Estimates by Comparing “Similar” Users',
        summary:
          '<ul><li>This session will cover the remote workforce returning to offices and how founders and managers in Tech are prepared for things to shift yet again</li><li>Use matching-based estimators to compare similar users who received different “treatments” (e.g., one Amazon Prime member compared to a non-member with similar characteristics)</li><li>Estimate propensity scores and use them for causal inference</li><li>Distinguish between situations where machine learning models may be able to generate reliable causal estimates and when they may not</li></ul>'
      }
    ]
  },
  {
    name: 'Applied Casual Inference 2',
    is_next_reccommended: true,
    is_complete: true,
    description:
      'Learn how to use applied causal inference methods to make better product and business decisions live with Rob Donnelly, an industry leader with experience at Instacart and Meta.',
    preview_instructor_affiliation: 'Engineer at Stripe',
    preview_instructor_image:
      'https://uploads-ssl.webflow.com/62b10e6dc5648dfcaf401a94/6376823275bd376e551ef49d_DRS.png',
    preview_instructor_logos:
      'https://uploads-ssl.webflow.com/62b10e6dc5648dfcaf401a94/63781e0fd6003161d79cd496_DRS.svg',
    preview_instructor_name: 'Xavier Amatrian & Deepak Agarwal',
    sessions: [
      {
        number: 1,
        name: 'An Introduction to Casual Inference',
        summary:
          '<ul><li>This session will cover the remote workforce returning to offices and how founders and managers in Tech are prepared for things to shift yet again</li><li>Use matching-based estimators to compare similar users who received different “treatments” (e.g., one Amazon Prime member compared to a non-member with similar characteristics)</li><li>Estimate propensity scores and use them for causal inference</li><li>Distinguish between situations where machine learning models may be able to generate reliable causal estimates and when they may not</li></ul>'
      },
      {
        number: 2,
        name: 'Improving Our Causal Estimates by Comparing “Similar” Users',
        summary:
          '<ul><li>This session will cover the remote workforce returning to offices and how founders and managers in Tech are prepared for things to shift yet again</li><li>Use matching-based estimators to compare similar users who received different “treatments” (e.g., one Amazon Prime member compared to a non-member with similar characteristics)</li><li>Estimate propensity scores and use them for causal inference</li><li>Distinguish between situations where machine learning models may be able to generate reliable causal estimates and when they may not</li></ul>'
      }
    ]
  },
  {
    name: 'Applied Casual Inference 3',
    is_next_reccommended: true,
    is_complete: false,
    description:
      'Learn how to use applied causal inference methods to make better product and business decisions live with Rob Donnelly, an industry leader with experience at Instacart and Meta.',
    preview_instructor_affiliation: 'Engineer at Stripe',
    preview_instructor_image:
      'https://uploads-ssl.webflow.com/62b10e6dc5648dfcaf401a94/6376823275bd376e551ef49d_DRS.png',
    preview_instructor_logos:
      'https://uploads-ssl.webflow.com/62b10e6dc5648dfcaf401a94/63781e0fd6003161d79cd496_DRS.svg',
    preview_instructor_name: 'Xavier Amatrian & Deepak Agarwal',
    sessions: [
      {
        number: 1,
        name: 'An Introduction to Casual Inference',
        summary:
          '<ul><li>This session will cover the remote workforce returning to offices and how founders and managers in Tech are prepared for things to shift yet again</li><li>Use matching-based estimators to compare similar users who received different “treatments” (e.g., one Amazon Prime member compared to a non-member with similar characteristics)</li><li>Estimate propensity scores and use them for causal inference</li><li>Distinguish between situations where machine learning models may be able to generate reliable causal estimates and when they may not</li></ul>'
      },
      {
        number: 2,
        name: 'Improving Our Causal Estimates by Comparing “Similar” Users',
        summary:
          '<ul><li>This session will cover the remote workforce returning to offices and how founders and managers in Tech are prepared for things to shift yet again</li><li>Use matching-based estimators to compare similar users who received different “treatments” (e.g., one Amazon Prime member compared to a non-member with similar characteristics)</li><li>Estimate propensity scores and use them for causal inference</li><li>Distinguish between situations where machine learning models may be able to generate reliable causal estimates and when they may not</li></ul>'
      }
    ]
  },
  {
    name: 'Applied Casual Inference 4',
    is_next_reccommended: true,
    is_complete: false,
    description:
      'Learn how to use applied causal inference methods to make better product and business decisions live with Rob Donnelly, an industry leader with experience at Instacart and Meta.',
    preview_instructor_affiliation: 'Engineer at Stripe',
    preview_instructor_image:
      'https://uploads-ssl.webflow.com/62b10e6dc5648dfcaf401a94/6376823275bd376e551ef49d_DRS.png',
    preview_instructor_logos:
      'https://uploads-ssl.webflow.com/62b10e6dc5648dfcaf401a94/63781e0fd6003161d79cd496_DRS.svg',
    preview_instructor_name: 'Xavier Amatrian & Deepak Agarwal',
    sessions: [
      {
        number: 1,
        name: 'An Introduction to Casual Inference',
        summary:
          '<ul><li>This session will cover the remote workforce returning to offices and how founders and managers in Tech are prepared for things to shift yet again</li><li>Use matching-based estimators to compare similar users who received different “treatments” (e.g., one Amazon Prime member compared to a non-member with similar characteristics)</li><li>Estimate propensity scores and use them for causal inference</li><li>Distinguish between situations where machine learning models may be able to generate reliable causal estimates and when they may not</li></ul>'
      },
      {
        number: 2,
        name: 'Improving Our Causal Estimates by Comparing “Similar” Users',
        summary:
          '<ul><li>This session will cover the remote workforce returning to offices and how founders and managers in Tech are prepared for things to shift yet again</li><li>Use matching-based estimators to compare similar users who received different “treatments” (e.g., one Amazon Prime member compared to a non-member with similar characteristics)</li><li>Estimate propensity scores and use them for causal inference</li><li>Distinguish between situations where machine learning models may be able to generate reliable causal estimates and when they may not</li></ul>'
      }
    ]
  }
];

export default function DataScienceTrack() {
  const [activeCourse, setActiveCourse] = useState<number>(0);
  return (
    <Page title="Sphere | Courses Track">
      <Stack>
        <TrackHeader
          track={TRACK}
          total={COURSES.length}
          complete={COURSES.filter((course) => course.is_complete).length}
        />
        <CoursesCarousel
          courses={COURSES}
          setActiveCourse={(value: number) => setActiveCourse(value)}
        />
        <CourseDetails key={String(activeCourse)} courseData={COURSES[activeCourse || 0]} />
      </Stack>
    </Page>
  );
}
