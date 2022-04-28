import writeXlsxFile from 'write-excel-file';
import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

// material
import moment from 'moment';
import { CohortExperience } from '../../../@types/cohorts';

const StyledButton = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  textDecorationLine: 'underline',
  color: '#212B36'
}));

export const ExcelDownload = ({
  experiences,
  experience
}: {
  experiences: CohortExperience[];
  experience: CohortExperience;
}) => {
  const fileName = `${moment().format()}-${experience.name} Feedback Data`;

  const exportExcel = async (objects: any, fileName: string) => {
    const schema = [
      {
        column: 'Cohort Name',
        value: (experience: any) => experience.name,
        width: 80
      },
      {
        column: 'Cohort Code',
        value: (experience: any) => experience.code,
        width: 20
      },
      {
        column: 'Cohort Intake',
        value: (experience: any) => experience.intake,
        width: 20
      },
      {
        column: 'Start Date',
        value: (experience: any) => experience.start_date,
        width: 30
      },
      {
        column: 'Total Participants',
        value: (experience: any) => experience.participants,
        width: 30
      },
      {
        column: 'Avg Live Attendance',
        value: (experience: any) => `${experience.live_attendance}%`,
        width: 25
      },
      {
        column: 'Avg Live + Async Attendance',
        value: (experience: any) => `${experience.live_async_attendance}%`,
        width: 30
      }
    ];
    await writeXlsxFile(objects, {
      schema,
      fileName
    });
  };

  const exportData = async () => {
    if (experiences.length > 0) {
      exportExcel(experiences, fileName);
    }
  };

  return (
    <StyledButton variant="body2" onClick={() => exportData()}>
      Download Excel
    </StyledButton>
  );
};
