import { useState, useRef } from 'react';
import writeXlsxFile from 'write-excel-file';
import { Icon } from '@iconify/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ResetIcon from '@material-ui/icons/RestartAlt';

import {
  Box,
  MenuItem,
  Typography,
  IconButton,
  Button,
  Grid,
  Stack,
  Link,
  Tooltip,
  TextField
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Modal } from 'components/animate';
import moment from 'moment';
// import * as XLSX from 'xlsx';

import {
  acceptApplication,
  deleteApplication,
  rejectApplication,
  updateApplication,
  notInterestedApplication,
  paymentRemindApplication,
  resetApplicationStatus,
  markApplicationAsPaid
} from 'redux/slices/cohort';

import {
  acceptApplicationByAdmin,
  rejectApplicationByAdmin,
  markAsPaidByAdmin,
  resetApplicationStatusAdmin,
  notInterestedApplicationByAdmin,
  deleteApplicationByAdmin
} from 'redux/slices/adminRegistrations';

import forwardArrow from '@iconify/icons-eva/arrow-ios-forward-fill';
import ConfirmationAlert from 'components/ConfirmationAlert';

// material
import { makeStyles } from '@material-ui/styles';
import ReferralCodesModal from './ReferralCodesModal';
import { useDispatch } from '../../../redux/store';
import { Enrollment, ReferralCode } from '../../../@types/cohorts';
import MenuPopover from '../../MenuPopover';
import EnrollmentForm from './EnrollmentForm';

const StyledIcon = styled('img')(() => ({
  width: 24,
  height: 24
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    border: '2px solid lightgray',
    borderRadius: '5px',
    background: '#f7f5f5',
    padding: '5px'
  }
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

const CompanyTooltipMessage = (enrollment: Enrollment) => {
  let header = `${enrollment.first_name} enrolled`;
  if (enrollment.first_name.includes('Unknown')) {
    header = 'This user enrolled';
  }
  if (enrollment.first_name.includes('Employee')) {
    header = 'Enrolled';
  }
  return `${header} using ${enrollment.credit_account}'s ScholarSite credits`;
};
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

export const changeOccur = (
  enrollments: any,
  statuses: any,
  type: string,
  account_status: boolean
) => {
  const totalEnrollments =
    statuses.length > 0
      ? enrollments.filter(
          (e: any) =>
            statuses.includes(e.status) ||
            (account_status &&
              (e.status.split(' ')[0] === 'Awaiting' || e.status.split(' ')[1] === 'Approval'))
        )
      : enrollments.filter((e: { status: string }) => e.status !== 'Partial Application Received');
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
  codes,
  cohort_name,
  cohort_id,
  cohort_intake,
  isAdminView = false
}: {
  enrollments: Enrollment[];
  codes?: ReferralCode[];
  cohort_name?: string;
  cohort_id?: string;
  cohort_intake?: any;
  isAdminView: Boolean;
}) => {
  const data = enrollments.map((e) => ({ cohort_id, cohort_name, cohort_intake, ...e }));
  const fileName = `${moment().format()}-${cohort_name} Enrollments Data`;

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      width="-webkit-fill-available"
      sx={{ mx: 2, mb: 2 }}
    >
      <Typography variant="h5">Registrations List</Typography>
      {!isAdminView && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center">
          <ReferralCodesModal
            cohortName={cohort_name || ''}
            cohortID={cohort_id || ''}
            codes={codes || []}
          />
          <ExportToExcel registrations={data} fileName={fileName} />
        </Stack>
      )}
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

export const ReferralCodeRow = ({
  code,
  cohortName,
  onChange
}: {
  code: ReferralCode;
  cohortName: string;
  onChange: Function;
}) => {
  // const UpdateCodeSchema = Yup.object().shape({
  //   code: Yup.string().required('Referral Code required')
  // });

  const formik = useFormik<ReferralCode>({
    enableReinitialize: true,
    initialValues: code,
    onSubmit: (values) => {
      onChange(values);
    }
  });
  const { enqueueSnackbar } = useSnackbar();

  const { errors, touched, submitForm, setFieldValue, values } = formik;
  const cohortSlug = convertToSlug(cohortName);
  const referralLink = `https://www.scholarsite.io/pages/${cohortSlug}?referrer=${values.code}`;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" id="referral-code-form" noValidate style={{ width: '100%' }}>
          <Grid container spacing={1}>
            <Grid item sx={{ m: 'auto', width: '100%' }} spacing={1}>
              <StyledStack spacing={1} direction={{ xs: 'column', md: 'row' }} alignItems="center">
                <TextField
                  fullWidth
                  id="code"
                  defaultValue={code.code}
                  onChange={(e) => {
                    setFieldValue('code', e.target.value);
                    submitForm();
                  }}
                  label="Referral Code"
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                  inputProps={{
                    'data-testid': 'first-name'
                  }}
                />
                <TextField
                  fullWidth
                  id="referral_message"
                  label="Referral Message"
                  defaultValue={code.referral_message}
                  onChange={(e) => {
                    setFieldValue('referral_message', e.target.value);
                    submitForm();
                  }}
                  error={Boolean(touched.referral_message && errors.referral_message)}
                  helperText={touched.referral_message && errors.referral_message}
                  inputProps={{
                    'data-testid': 'last-name'
                  }}
                />
                <TextField
                  fullWidth
                  id="referral_notes"
                  label="Referral Notes"
                  defaultValue={code.referral_notes}
                  onChange={(e) => {
                    setFieldValue('referral_notes', e.target.value);
                    submitForm();
                  }}
                  error={Boolean(touched.referral_notes && errors.referral_notes)}
                  helperText={touched.referral_notes && errors.referral_notes}
                  inputProps={{
                    'data-testid': 'referral_notes'
                  }}
                />
                <IconButton>
                  <CopyToClipboard
                    text={referralLink}
                    onCopy={() => {
                      if (referralLink) {
                        enqueueSnackbar('Referral Link Copied', { variant: 'success' });
                      }
                    }}
                  >
                    <Tooltip title="Copy Referral Link" placement="top" arrow>
                      <StyledIcon src="/static/registration/Copy.svg" />
                    </Tooltip>
                  </CopyToClipboard>
                </IconButton>
                <IconButton key={referralLink} component={Link} target="_blank" href={referralLink}>
                  <Tooltip title="Open Referral Link" placement="top" arrow>
                    <StyledIcon src="/static/registration/Export.svg" />
                  </Tooltip>
                </IconButton>
              </StyledStack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
};

export const Actions = ({
  enrollment,
  codes,
  isAdminView = false
}: {
  enrollment: Enrollment;
  codes: ReferralCode[];
  isAdminView?: boolean;
}) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [formModalState, setFormModalState] = useState(false);
  const [modalMesage, setModalMessage] = useState<JSX.Element>(<></>);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || enrollment?.cohort_id || '';
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
    if (isAdminView) {
      if (action === 'accept_application') {
        dispatch(acceptApplicationByAdmin(cohort_id, enrollment.id));
      } else if (action === 'reject_application') {
        dispatch(rejectApplicationByAdmin(cohort_id, enrollment.id));
      } else if (action === 'delete_application') {
        dispatch(deleteApplicationByAdmin(cohort_id, enrollment.id));
      } else if (action === 'set_not_interested') {
        dispatch(notInterestedApplicationByAdmin(cohort_id, enrollment.id));
      } else if (action === 'mark_as_paid') {
        dispatch(markAsPaidByAdmin(cohort_id, enrollment.id));
      } else if (action === 'reset_status') {
        dispatch(resetApplicationStatusAdmin(cohort_id, enrollment.id));
      }
    } else {
      // eslint-disable-next-line no-lonely-if
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
      } else if (action === 'mark_as_paid') {
        dispatch(markApplicationAsPaid(cohort_id, enrollment.id));
      } else if (action === 'reset_status') {
        dispatch(resetApplicationStatus(cohort_id, enrollment.id));
      }
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
          codes={codes}
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
                  <p>Are you sure you want to reject {enrollment.name}’s application.</p>
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
                    Are you sure you want to accept {enrollment.name}’s application and
                    {enrollment.card_added ? ' charge him' : ' send a payment link'} for
                    <p style={{ color: '#4D4DCD' }}> USD {enrollment.price}</p>
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
                      Are you sure you want to accept {enrollment.name}’s application and
                      {enrollment.card_added ? ' charge him' : ' send a payment link'} for
                      <p style={{ color: '#4D4DCD' }}> USD {enrollment.price}</p>
                    </p>
                  );
                  setAction('accept_application');
                  setModalState(true);
                }}
                sx={{ typography: 'subtitle2', color: '#4D4DCD', py: 1, px: 2.5 }}
              >
                <StyledIcon src="/static/registration/Check.svg" sx={{ mr: 1 }} />
                Accept Application
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setModalMessage(
                    <p>Are you sure you want to reject {enrollment.name}’s application.</p>
                  );
                  setAction('reject_application');
                  setModalState(true);
                }}
                sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
              >
                <StyledIcon src="/static/registration/Close.svg" sx={{ mr: 1 }} />
                Reject Application
              </MenuItem>
            </>
          )}
          {!['Paid', 'Not Interested', 'Partial Application Received'].includes(
            enrollment.status
          ) && (
            <MenuItem
              onClick={() => {
                setModalMessage(
                  <p>
                    Are you sure you want to mark {enrollment.name}’s application as Paid and send
                    them an email welcoming them to the ScholarSite Portal?
                  </p>
                );
                setAction('mark_as_paid');
                setModalState(true);
              }}
              sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
            >
              <StyledIcon src="/static/registration/Success.svg" sx={{ mr: 1 }} />
              Mark as Paid
            </MenuItem>
          )}
          {(enrollment.status === 'Application Accepted' ||
            enrollment.status === 'Payment link opened') && (
            <MenuItem
              onClick={() => {
                setModalMessage(
                  <p>
                    Are you sure you want to mark {enrollment.name}’s application as not interested.
                  </p>
                );
                setAction('set_not_interested');
                setModalState(true);
              }}
              sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
            >
              <StyledIcon src="/static/registration/Close.svg" sx={{ mr: 1 }} />
              Mark as Not Interested
            </MenuItem>
          )}
          {!['Application Received', 'Partial Application Received'].includes(
            enrollment.status
          ) && (
            <MenuItem
              onClick={() => {
                setModalMessage(
                  <p>
                    Are you sure you want the status of {enrollment.name}'s enrollment to
                    Application Received?
                  </p>
                );
                setAction('reset_status');
                setModalState(true);
              }}
              sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
            >
              <ResetIcon sx={{ mr: 1 }} />
              Reset Status
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              setOpen(false);
              setFormModalState(true);
            }}
            sx={{ typography: 'subtitle2', color: '#637381', py: 1, px: 2.5 }}
          >
            <StyledIcon src="/static/registration/Info.svg" sx={{ mr: 1 }} />
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
            <StyledIcon src="/static/registration/Trash.svg" sx={{ mr: 1 }} />
            Delete Applicant
          </MenuItem>
        </MenuPopover>
      </Stack>
    </>
  );
};

export const Tags = ({ enrollment }: { enrollment: Enrollment }) => (
  <>
    <Stack spacing={2} justifyContent="center" alignItems="center" direction="row">
      {enrollment.card_added && (
        <Tooltip
          arrow
          placement="top"
          title={`${
            enrollment.first_name === 'Unknown' ? 'This user' : enrollment.first_name
          } included their payment details when registering`}
        >
          <Typography variant="h4">💳</Typography>
        </Tooltip>
      )}
      {enrollment.coupon_code && (
        <Tooltip
          arrow
          placement="top"
          title={`${
            enrollment.first_name === 'Unknown' ? 'This user' : enrollment.first_name
          } used the referral code “${enrollment.coupon_code}”`}
        >
          <Typography variant="h4">🤝</Typography>
        </Tooltip>
      )}

      {enrollment.source && (
        <Tooltip
          arrow
          placement="top"
          title={`${
            enrollment.first_name === 'Unknown' ? 'This user' : enrollment.first_name
          } registered through a custom link with source “${enrollment.source}”`}
        >
          <Typography variant="h4">👂</Typography>
        </Tooltip>
      )}
      {enrollment.credit_account && (
        <Tooltip arrow placement="top" title={CompanyTooltipMessage(enrollment)}>
          <Typography variant="h4">🏢</Typography>
        </Tooltip>
      )}
      {enrollment.notes && (
        <Tooltip
          arrow
          placement="top"
          title={
            enrollment.notes.length > 200
              ? `${enrollment.notes.substring(0, 200)}...`
              : enrollment.notes
          }
        >
          <Typography variant="h4">📋</Typography>
        </Tooltip>
      )}
    </Stack>
  </>
);
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

export const ExportToExcel = ({
  registrations,
  fileName
}: {
  registrations: any;
  fileName: string;
}) => {
  const exportExcel = async (objects: any, fileName: string) => {
    const schema = [
      {
        column: 'Cohort Name',
        value: (registration: any) => registration.cohort_name,
        width: 50
      },
      {
        column: 'Cohort Intake',
        value: (registration: any) => registration.cohort_intake,
        width: 20
      },
      {
        column: 'Submission Time',
        value: (registration: any) => registration.time,
        width: 30
      },
      {
        column: 'First Name',
        value: (registration: any) => registration.first_name,
        width: 25
      },
      {
        column: 'Full Name',
        value: (registration: any) => `${registration.first_name} ${registration.last_name}`,
        width: 30
      },
      {
        column: 'Email',
        value: (registration: any) => registration.email,
        width: 30
      },
      {
        column: 'LinkedIn',
        value: (registration: any) => registration.linkedin_url,
        width: 60
      },
      {
        column: 'Status',
        value: (registration: any) => registration.status,
        width: 30
      },
      {
        column: 'Stream',
        value: (registration: any) => registration.stream,
        width: 30
      },
      {
        column: 'Price',
        value: (registration: any) => registration.price,
        width: 20
      },
      {
        column: 'Referred By',
        value: (registration: any) => registration.coupon_code,
        width: 30
      },
      {
        column: 'Payment Link',
        value: (registration: any) =>
          `https://app.scholarsite.io/cohorts/${registration.cohort_id}/course-payment/${registration.id}`,
        width: 120
      }
    ];
    await writeXlsxFile(objects, {
      schema,
      fileName
    });
  };

  const exportData = async () => {
    if (registrations.length > 0) {
      exportExcel(registrations, fileName);
    }
  };

  return (
    <Button variant="outlined" color="primary" onClick={() => exportData()}>
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
  if (
    status === 'Application Received' ||
    status === 'Partial Application Received' ||
    status.split(' ')[0] === 'Awaiting'
  ) {
    return 'primary';
  }
  if (status === 'Payment link opened') {
    return 'warning';
  }
  if (status.split(' ').includes('Denied')) {
    return 'error';
  }
  return 'success';
};

export const convertToSlug = (Text: string) =>
  Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
