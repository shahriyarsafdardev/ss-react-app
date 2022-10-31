import writeXlsxFile from 'write-excel-file';
import { Button, Theme } from '@material-ui/core';
import _ from 'lodash';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import { makeStyles } from '@material-ui/styles';
import { StudentProfile, Cohort } from '../../@types/cohorts';

export const ExportToExcel = ({
  cohort,
  students,
  fileName
}: {
  cohort: Cohort;
  students: StudentProfile[];
  fileName: string;
}) => {
  const exportExcel = async (objects: any, fileName: string) => {
    const schema = [
      {
        column: 'Email',
        value: (student: any) => student.email,
        width: 30
      },
      {
        column: 'First Name',
        value: (student: any) => student.first_name,
        width: 25
      },
      {
        column: 'Full Name',
        value: (student: any) => `${student.first_name} ${student.last_name}`,
        width: 30
      },
      {
        column: 'Company',
        value: (student: any) => student.current_company?.name,
        width: 20
      },
      {
        column: 'Position',
        value: (student: any) => student.current_position,
        width: 35
      },
      {
        column: 'Position Categories',
        value: (student: any) => student.current_role_category_selections,
        width: 60
      },
      {
        column: 'LinkedIn',
        value: (student: any) => student.linkedin_url,
        width: 50
      },
      {
        column: 'Country',
        value: (student: any) => student.country,
        width: 20
      },
      {
        column: 'City',
        value: (student: any) => student.city,
        width: 20
      },
      {
        column: 'Company > Number of Employees',
        value: (student: any) => student.current_company?.number_of_employees,
        width: 30
      },
      {
        column: 'Company > Industry',
        value: (student: any) => student.current_industry_category_selections,
        width: 50
      },
      {
        column: 'Referral Code',
        value: (student: any) => `?referrer=${student.slug}`,
        width: 50
      },
      {
        column: 'Certificate Name',
        value: (student: any) =>
          `${cohort?.code}-${cohort?.intake_name?.split(' ').join('-')}-${
            student?.slug
          }`.toLowerCase(),
        width: 50
      }
    ];
    await writeXlsxFile(objects, {
      schema,
      fileName
    });
  };

  const exportData = async () => {
    if (students.length > 0) {
      exportExcel(students, fileName);
    }
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => exportData()}
      sx={{ marginBottom: '40px', p: 1, fontSize: '18px' }}
    >
      <img style={{ marginRight: 2 }} src="/static/registration/download.svg" alt="download" />
      Excel Export
    </Button>
  );
};

export const ExportOnboardingResponse = ({
  cohort,
  fileName
}: {
  cohort: Cohort;
  fileName: string;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const exportExcel = async (objects: any, questions: any, fileName: string) => {
    const schema = [
      {
        column: 'Name',
        value: (item: any) => item.name,
        width: 25
      },
      {
        column: 'Email',
        value: (item: any) => item.email,
        width: 30
      },
      {
        column: 'Company',
        value: (item: any) => item.company,
        width: 25,
        wrap: true
      },
      {
        column: 'Position',
        value: (item: any) => item.position,
        width: 30,
        wrap: true
      },
      {
        column: 'Cohort',
        value: (item: any) => item.cohort,
        width: 30,
        wrap: true
      },
      {
        column: 'Feedback Submitted',
        value: (item: any) => item.feedback_submitted,
        width: 25
      },
      ...questions.map((q: any, i: number) => ({
        column: q,
        value: (item: any) => item[`question_${i}`],
        width: 40,
        wrap: true
      }))
    ];

    await writeXlsxFile(objects, {
      schema,
      headerStyle: {
        backgroundColor: '#eeeeee',
        fontWeight: 'bold',
        align: 'left',
        wrap: true
      },
      fileName
    });
  };

  const exportData = async () => {
    await axios
      .get(`/cohorts/${cohort.id}/onboarding_questions_response`)
      .then((res) => {
        if (cohort.id !== '' && res.data.feedbacks?.length > 0) {
          exportExcel(res.data.feedbacks, res.data.questions, fileName);
          enqueueSnackbar('File downloaded successfully!', { variant: 'success' });
        } else {
          enqueueSnackbar('No responses found!', { variant: 'warning' });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err?.message, { variant: 'warning' });
        console.log(err);
      });
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => exportData()}
      sx={{ marginBottom: '40px', p: 1, fontSize: '18px' }}
    >
      <img style={{ marginRight: 2 }} src="/static/registration/download.svg" alt="download" />
      Export Onboarding Response
    </Button>
  );
};
