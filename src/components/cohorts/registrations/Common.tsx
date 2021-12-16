import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box, MenuItem, Stack, Typography, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Modal } from 'components/animate';

import {
  acceptApplication,
  deleteApplication,
  rejectApplication,
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

const StyledIcon = styled('img')(() => ({
  marginRight: 5,
  width: 24,
  height: 24
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
    height: '135px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '1rem 2rem',
    boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
    borderRadius: '16px',
    width: '252px'
  },
  heading: {
    fontSize: '48px'
  },
  positive: {
    color: '#219653'
  },
  negative: {
    color: '#dd491a'
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
      <img className="inline ml-1" src="/static/registration/Info.svg" alt="Info Icon" />
    </Tooltip>
  );
};

export const RegistrationsHeader = ({}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    width="-webkit-fill-available"
    sx={{ mx: 2, mb: 2 }}
  >
    <Typography variant="h5">Registrations List</Typography>
  </Stack>
);

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
const EnrollmentModal = ({
  state,
  onClose,
  onComplete
}: {
  state: boolean;
  onClose: Function;
  onComplete: Function;
}) => (
  <Modal open={state} onClose={() => onClose()}>
    <p>EnrollmentForm</p>
  </Modal>
);

export const Actions = ({ enrollment }: { enrollment: Enrollment }) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [formModalState, setFormModalState] = useState(false);
  const [modalMesage, setModalMessage] = useState('');
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';

  const handleOpen = () => {
    setOpen(!open);
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
    }
    setAction('');
    setOpen(false);
    setModalState(false);
    setModalMessage('');
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
      <EnrollmentModal
        state={formModalState}
        onClose={() => {
          setOpen(false);
          setFormModalState(false);
        }}
        onComplete={() => {
          setOpen(false);
          setFormModalState(false);
        }}
      />
      <Box>
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
          {enrollment.status !== 'Application Rejected' && enrollment.status !== 'Paid' && (
            <>
              <MenuItem
                onClick={() => {
                  setModalMessage(
                    `Are you sure you want to accept ${enrollment.name}’s application and send a payment link for USD ${enrollment.price}`
                  );
                  setAction(
                    enrollment.status === 'Application Received'
                      ? 'accept_application'
                      : 'payment_reminder'
                  );
                  setModalState(true);
                }}
                sx={{ typography: 'subtitle2', color: '#4D4DCD', py: 1, px: 2.5 }}
              >
                <StyledIcon src="/static/registration/Check.svg" />
                {enrollment.status === 'Application Received'
                  ? 'Accept Application'
                  : 'Send Payment Reminder'}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setModalMessage(
                    `Are you sure you want to reject ${enrollment.name}’s application.`
                  );
                  setAction(
                    enrollment.status === 'Application Received'
                      ? 'reject_application'
                      : 'set_not_interested'
                  );
                  setModalState(true);
                }}
                sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
              >
                <StyledIcon src="/static/registration/Close.svg" />
                {enrollment.status === 'Application Received'
                  ? 'Reject Application'
                  : 'Mark as Not Interested'}
              </MenuItem>
            </>
          )}
          <MenuItem
            onClick={() => setFormModalState(true)}
            sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
          >
            <StyledIcon src="/static/registration/Info.svg" />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              setModalMessage(
                `Are you sure you want to delete the application from ${enrollment.name}: ${enrollment.email}`
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
      </Box>
    </>
  );
};

export const KeyMetricHighlight = ({
  metric,
  difference,
  currentTimePeriodLabel,
  previousTimePeriodLabel
}: {
  metric?: any;
  difference?: any;
  currentTimePeriodLabel?: any;
  previousTimePeriodLabel?: any;
}) => {
  const classes = useStyles();
  return (
    <div className={classes.highlightContainer}>
      <p className="font-semibold">{currentTimePeriodLabel} </p>
      <h1 className={classes.heading}>{metric}</h1>
      {/* {difference != null && (
      <p>
        {difference >= 0 ? (
          <span className={classes.positive}> +{difference} </span>
        ) : (
          <span className={classes.negative}> {difference} </span>
        )}
        vs {previousTimePeriodLabel}
      </p>
    )} */}
    </div>
  );
};

export const pickColor = (status: string) => {
  if (status === 'Application Accepted') {
    return 'warning';
  }
  if (status === 'Application Rejected') {
    return 'default';
  }
  if (status === 'Application Received') {
    return 'primary';
  }
  if (status === 'Payment link opened') {
    return 'warning';
  }
  return 'success';
};
