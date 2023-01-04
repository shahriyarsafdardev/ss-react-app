import { useState, memo, useRef } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MenuItem, IconButton, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import writeXlsxFile from 'write-excel-file';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
// material
import moment from 'moment';
import MenuPopover from '../../MenuPopover';
import { CohortExperience } from '../../../@types/cohorts';

const StyledButton = styled(LoadingButton)(() => ({
  fontWeight: 600,
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent',
    textDecorationLine: 'underline'
  }
}));

export const ExcelDownload = memo(({ experience }: { experience: CohortExperience }) => {
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
    <StyledButton variant="text" color="primary" onClick={() => exportData()} loading={loading}>
      Download Feedback
    </StyledButton>
  );
});

export const ExperienceActions = memo(
  ({ id, experience }: { id: string; experience: CohortExperience }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const handleOpen = () => {
      setOpen(!open);
    };

    return (
      <>
        <MenuPopover
          open={open}
          anchorEl={menuRef.current}
          onClose={() => {
            setOpen(false);
          }}
        >
          <MenuItem>
            <ExcelDownload experience={experience} />
          </MenuItem>
          <MenuItem>
            <Link
              component={RouterLink}
              to={`/cohorts/${id}/attendance`}
              color="#071A33"
              sx={{ typography: 'subtitle2' }}
            >
              Attendance Sheet
            </Link>
          </MenuItem>
        </MenuPopover>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleOpen}
          ref={menuRef}
        >
          <MoreVertIcon />
        </IconButton>
      </>
    );
  }
);
