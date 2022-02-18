import { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import Page from 'components/Page';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { initializeCredit, approveCredit, rejectCredit } from 'redux/slices/businessCredit';
import { Modal } from 'components/animate';
import { useSnackbar } from 'notistack5';
import useAuth from 'hooks/useAuth';
import TopupForm from './TopupForm';
import { useStyles } from './styles';
import MyWallet from './Wallet';
import CreditHistory from './CreditHistory';
import NewEnrollments from './NewEnrollments';

const Dashboard = () => {
  const { cohortCredit } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    const populateData = async () => {
      await dispatch(initializeCredit());
    };
    populateData();
  }, []);

  const onApproveCredit = (enrollmentID: string) => {
    dispatch(
      approveCredit(
        cohortCredit.id,
        enrollmentID,
        () => {
          enqueueSnackbar('Application Approved', { variant: 'success' });
          setModal(false);
        },
        () => {
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
          enqueueSnackbar('Please try again', { variant: 'error' });
          setModal(false);
        }
      )
    );
  };

  const onRejectCredit = (enrollmentID: string) => {
    dispatch(
      rejectCredit(
        cohortCredit.id,
        enrollmentID,
        () => {
          enqueueSnackbar('Application Rejected Successfully', { variant: 'success' });
          setModal(false);
        },
        () => {
          enqueueSnackbar('Some error occurred!', { variant: 'error' });
          enqueueSnackbar('Please try again', { variant: 'error' });
          setModal(false);
        }
      )
    );
  };

  const TopupModal = () => (
    <Modal
      open={modal}
      onClose={() => {
        setModal(false);
      }}
      zIndex={1400}
      className={classes.creditsModal}
    >
      <TopupForm accountID={cohortCredit.id} setModal={setModal} />
    </Modal>
  );

  return (
    <Page title="ScholarSite | Business Portal">
      <Container>
        <TopupModal />
        <Typography variant="h4">
          👋 Hi {user?.first_name}, welcome to the {`${cohortCredit.accountName}'s`} ScholarSite
          Dashboard
        </Typography>
        <Box className={classes.sectionContainer}>
          <Box className={classes.width50}>
            <MyWallet
              setModal={setModal}
              currentBalance={cohortCredit.credit_balance}
              accountName={cohortCredit.accountName}
            />
            <CreditHistory historyData={cohortCredit.history} />
          </Box>
          <Box className={classes.width50}>
            <NewEnrollments
              onApproveCredit={onApproveCredit}
              onRejectCredit={onRejectCredit}
              newEnrollments={cohortCredit.unapproved}
            />
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
