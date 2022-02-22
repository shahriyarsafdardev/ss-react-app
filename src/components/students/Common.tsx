import writeXlsxFile from 'write-excel-file';
import { Button } from '@material-ui/core';
import _ from 'lodash';
import { StudentProfile } from '../../@types/cohorts';

export const ExportToExcel = ({
  students,
  fileName
}: {
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
        value: (student: any) => student.peer_id,
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
