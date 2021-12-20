import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box, Button, MenuItem, Stack, Typography, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Modal } from 'components/animate';
import moment from 'moment';
import * as XLSX from 'xlsx';

import {
  acceptApplication,
  deleteApplication,
  rejectApplication,
  updateApplication,
  notInterestedApplication,
  paymentRemindApplication
} from 'redux/slices/cohort';

import forwardArrow from '@iconify/icons-eva/arrow-ios-forward-fill';
import ConfirmationAlert from 'components/ConfirmationAlert';

// material
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from '../../../redux/store';
import { Enrollment } from '../../../@types/cohorts';
import MenuPopover from '../../MenuPopover';
import EnrollmentForm from './EnrollmentForm';

const StyledIcon = styled('img')(() => ({
  marginRight: 5,
  width: 24,
  height: 24,
  cursor: 'pointer'
}));

const StyledViewButton = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
}));

const useStyles = makeStyles((theme) => ({
  center: {
    maxWidth: 300,
    textAlign: 'center'
  },
  left: {
    maxWidth: 400,
    textAlign: 'left'
  },
  highlightContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '1rem 2rem',
    boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
    borderRadius: '16px'
  },
  heading: {
    fontSize: '48px'
  },
  enrollmentModal: {
    width: '60% !important',
    margin: 'auto'
  },
  positive: {
    color: '#219653'
  },
  negative: {
    color: '#dd491a'
  },
  innerDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  infoIcon: {
    marginLeft: '3px',
    marginBottom: 'auto',
    marginTop: '13px'
  },
  difference: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '8px',
    padding: '1px 8px',
    height: '48px',
    borderRadius: '6px',
    alignItems: 'center'
  },
  primary: {
    color: '#2F80ED !important',
    background: 'rgba(47, 128, 237, 0.12)'
  },
  warning: {
    color: '#B78103',
    background: 'rgba(255, 193, 7, 0.16)'
  },
  success: {
    color: '#00AB55',
    background: 'rgba(84, 214, 44, 0.16)'
  }
}));

export const InfoTooltip = ({ title, leftAlign = false }: { title?: any; leftAlign?: Boolean }) => {
  const classes = useStyles();

  return (
    <Tooltip
      arrow
      placement="top"
      classes={{ tooltip: leftAlign ? classes.left : classes.center }}
      title={<span className="ui-copy text-white">{title}</span>}
    >
      <img className={classes.infoIcon} src="/static/registration/Info.svg" alt="Info Icon" />
    </Tooltip>
  );
};

export const changeOccur = (enrollments: any, statuses: string[], type: string) => {
  const totalEnrollments =
    statuses.length > 0
      ? enrollments.filter((e: { status: string }) => statuses.includes(e.status))
      : enrollments;
  const startDate = moment().startOf('week').add(1, 'days');
  const newEnrollments = totalEnrollments.filter(
    (e: any) => !!e[type] && moment(e[type]) >= startDate
  );
  const difference = newEnrollments.length;
  return {
    color: pickColor(statuses.length > 0 ? statuses[0] : 'Application Received'),
    total: totalEnrollments.length,
    difference
  };
};

export const RegistrationsHeader = ({
  enrollments,
  cohort_name,
  cohort_intake
}: {
  enrollments: Enrollment[];
  cohort_name: string;
  cohort_intake: any;
}) => {
  const data = enrollments.map((e) => ({
    'Cohort Name': cohort_name,
    'Cohort Intake': cohort_intake,
    'Submission Time': e.time,
    'First Name': e.first_name,
    'Last Name': e.last_name,
    Email: e.email,
    LinkedIn: e.linkedin_url,
    Status: e.status,
    Stream: e.stream
  }));
  const fileName = `${moment().format()}-${cohort_name} Enrollments Data`;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      width="-webkit-fill-available"
      sx={{ mx: 2, mb: 2 }}
    >
      <Typography variant="h5">Registrations List</Typography>
      <ExportToExcel data={data} fileName={fileName} />
    </Stack>
  );
};

export const RegistrationsFooter = ({ handleClick }: { handleClick: Function }) => (
  <Stack
    direction="row-reverse"
    justifyContent="space-between"
    width="-webkit-fill-available"
    sx={{ pr: 6, pt: 2, mt: 2, color: '#212B36', borderTop: '1px solid rgba(224, 224, 224, 1)' }}
  >
    <StyledViewButton variant="subtitle2" onClick={() => handleClick()}>
      View All
      <Box component={Icon} icon={forwardArrow} sx={{ width: 16, height: 16, ml: 1 }} />
    </StyledViewButton>
  </Stack>
);

export const Actions = ({ enrollment }: { enrollment: Enrollment }) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [formModalState, setFormModalState] = useState(false);
  const [modalMesage, setModalMessage] = useState<JSX.Element>(<></>);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleUpdate = async (enrollment: Enrollment) => {
    await dispatch(updateApplication(cohort_id, enrollment));
    setAction('');
    setModalState(false);
  };

  const handleAction = () => {
    if (action === 'accept_application') {
      dispatch(acceptApplication(cohort_id, enrollment.id));
    } else if (action === 'payment_reminder') {
      dispatch(paymentRemindApplication(cohort_id, enrollment.id));
    } else if (action === 'reject_application') {
      dispatch(rejectApplication(cohort_id, enrollment.id));
    } else if (action === 'delete_application') {
      dispatch(deleteApplication(cohort_id, enrollment.id));
    } else if (action === 'set_not_interested') {
      dispatch(notInterestedApplication(cohort_id, enrollment.id));
    }
    setAction('');
    setOpen(false);
    setModalState(false);
    setModalMessage(<></>);
  };

  return (
    <>
      <ConfirmationAlert
        title=""
        open={modalState}
        alertText={modalMesage}
        onCancel={() => {
          setOpen(false);
          setModalState(false);
        }}
        onConfirm={() => handleAction()}
      />
      <Modal
        open={formModalState}
        onClose={() => {
          setOpen(false);
          setFormModalState(false);
        }}
        zIndex={1400}
        className={classes.enrollmentModal}
      >
        <EnrollmentForm
          onClose={() => {
            setOpen(false);
            setFormModalState(false);
          }}
          onSubmit={(enrollment: Enrollment) => handleUpdate(enrollment)}
          enrollment={enrollment}
        />
      </Modal>
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
      >
        {enrollment.status == 'Application Received' && (
          <>
            <StyledIcon
              onClick={() => {
                setModalMessage(
                  <p>Are you sure you want to reject ${enrollment.name}’s application.</p>
                );
                setAction('reject_application');
                setModalState(true);
              }}
              src="/static/registration/cross.svg"
            />

            <StyledIcon
              onClick={() => {
                setModalMessage(
                  <p>
                    Are you sure you want to accept {enrollment.name}’s application and send a
                    payment link for <p style={{ color: '#4D4DCD' }}>USD {enrollment.price || 0}</p>{' '}
                  </p>
                );
                setAction('accept_application');
                setModalState(true);
              }}
              src="/static/registration/Check.svg"
            />
          </>
        )}
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleOpen}
          ref={menuRef}
        >
          <MoreVertIcon />
        </IconButton>
        <MenuPopover
          open={open}
          anchorEl={menuRef.current}
          onClose={() => {
            setOpen(false);
          }}
        >
          {enrollment.status == 'Application Received' && (
            <>
              <MenuItem
                onClick={() => {
                  setModalMessage(
                    <p>
                      Are you sure you want to accept {enrollment.name}’s application and send a
                      payment link for <p style={{ color: '#4D4DCD' }}>USD {enrollment.price}</p>{' '}
                    </p>
                  );
                  setAction('accept_application');
                  setModalState(true);
                }}
                sx={{ typography: 'subtitle2', color: '#4D4DCD', py: 1, px: 2.5 }}
              >
                <StyledIcon src="/static/registration/Check.svg" />
                Accept Application
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setModalMessage(
                    <p>Are you sure you want to reject ${enrollment.name}’s application.</p>
                  );
                  setAction('reject_application');
                  setModalState(true);
                }}
                sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
              >
                <StyledIcon src="/static/registration/Close.svg" />
                Reject Application
              </MenuItem>
            </>
          )}
          {(enrollment.status === 'Application Accepted' ||
            enrollment.status === 'Payment link opened') && (
            <MenuItem
              onClick={() => {
                setModalMessage(
                  <p>
                    Are you sure you want to mark ${enrollment.name}’s application as not interested
                  </p>
                );
                setAction('set_not_interested');
                setModalState(true);
              }}
              sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
            >
              <StyledIcon src="/static/registration/Close.svg" />
              Mark as Not Interested
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              setOpen(false);
              setFormModalState(true);
            }}
            sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
          >
            <StyledIcon src="/static/registration/Info.svg" />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              setModalMessage(
                <p>
                  Are you sure you want to <span style={{ color: '#ff4842' }}>delete</span> the
                  application from {enrollment.name}: {enrollment.email}.
                </p>
              );
              setAction('delete_application');
              setModalState(true);
            }}
            sx={{ typography: 'subtitle2', color: '#FF4842', py: 1, px: 2.5 }}
          >
            <StyledIcon src="/static/registration/Trash.svg" />
            Delete Applicant
          </MenuItem>
        </MenuPopover>
      </Stack>
    </>
  );
};

export const KeyMetricHighlight = ({
  metric,
  difference,
  currentTimePeriodLabel,
  infoTooltip
}: {
  metric?: any;
  difference?: any;
  currentTimePeriodLabel?: any;
  infoTooltip: any;
}) => {
  const classes = useStyles();
  return (
    <div className={classes.highlightContainer}>
      <p className="font-semibold">{currentTimePeriodLabel} </p>
      <div className={classes.innerDiv}>
        <h1 className={classes.heading}>{metric}</h1>
        {difference !== null && difference.difference > 0 && (
          <>
            <p className={`${classPicker(classes, difference.color)} ${classes.difference}`}>
              <span>
                {' '}
                {difference.difference >= 0 && '+'}
                {difference.difference}{' '}
              </span>
            </p>
            {infoTooltip && infoTooltip(difference.difference)}
          </>
        )}
      </div>
    </div>
  );
};

const classPicker = (classes: { primary: any; warning: any; success: any }, className: string) => {
  if (className === 'primary') return classes.primary;
  if (className === 'warning') return classes.warning;
  if (className === 'success') return classes.success;
  return '';
};

export const ExportToExcel = ({ data, fileName }: { data: any; fileName: string }) => {
  const exportToCSV = (items: any, fileName: string) => {
    const wscols = [
      { wch: 50 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 50 },
      { wch: 70 },
      { wch: 30 },
      { wch: 30 }
    ];

    const sheet = XLSX.utils.json_to_sheet(items);
    sheet['!cols'] = wscols;
    const file = { Sheets: { data: sheet }, SheetNames: ['data'] };
    XLSX.writeFile(file, `${fileName}.xlsx`);
  };

  return (
    <Button variant="outlined" color="primary" onClick={() => exportToCSV(data, fileName)}>
      <img style={{ marginRight: 2 }} src="/static/registration/download.svg" alt="download" />
      Excel Export
    </Button>
  );
};

export const pickColor = (status: string) => {
  if (status === 'Application Accepted') {
    return 'warning';
  }
  if (status === 'Application Rejected' || status === 'Not Interested') {
    return 'default';
  }
  if (status === 'Application Received' || status === 'Partial Application Received') {
    return 'primary';
  }
  if (status === 'Payment link opened') {
    return 'warning';
  }
  return 'success';
};
