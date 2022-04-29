import { useState } from 'react';
import writeXlsxFile from 'write-excel-file';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
// material
import moment from 'moment';
import { CohortExperience } from '../../../@types/cohorts';

const StyledButton = styled(LoadingButton)(() => ({
  display: 'flex',
  justifyContent: 'center',
  textDecorationLine: 'underline',
  color: '#212B36',
  fontWeight: 400
}));

export const ExcelDownload = ({ experience }: { experience: CohortExperience }) => {
  const fileName = `${moment().format()}-${experience.name} Feedback Data`;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    await axios
      .get(`cohorts/${experience.id}/instructor_feedbacks.json`)
      .then((res) => {
        exportExcel(res.data.feedbacks, res.data.questions, fileName);
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  return (
    <StyledButton
      variant="text"
      color="inherit"
      type="button"
      onClick={() => exportData()}
      loading={loading}
    >
      Download Excel
    </StyledButton>
  );
};
