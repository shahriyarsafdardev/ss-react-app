import { Container, Box, Typography, Card, CardHeader, Button } from '@material-ui/core';
import Page from 'components/Page';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { initializeCredit } from 'redux/slices/businessCredit';
import { useEffect } from 'react';
import moment from 'moment';
import { CreditObject } from '../../../@types/cohorts';
import { useStyles } from './styles';

const MyWallet = ({ currentBalance }: { currentBalance: number }) => {
  const classes = useStyles();

  return (
    <Card className={classes.sectionCard}>
      <Typography variant="h5">My Wallet</Typography>
      <Box display="flex" justifyContent="space-between" marginTop="10px">
        <Box display="flex" alignItems="baseline">
          <Typography variant="h3" color="#4D4DCD">
            {currentBalance}
          </Typography>
          <Typography variant="body1">Credits</Typography>
        </Box>
        <Box>
          <Button variant="contained">Top Up Credits</Button>
        </Box>
      </Box>
    </Card>
  );
};

const HistoryRow = ({ row }: { row: CreditObject }) => {
  const classes = useStyles();

  if (row.type === 'cohort') {
    return (
      <Box className={classes.historyRow}>
        <Box className={classes.dateBox}>
          <p>{moment(row.time).format('DD')}</p>
          <p>{moment(row.time).format('MMM')}</p>
        </Box>
        <Box marginLeft="15px">
          <p className={classes.textSmall}>
            <span>{row.attendee_name}</span> {row.approved ? 'attended' : 'wants to attend'}
          </p>
          <a
            style={{
              display: 'flex',
              color: '#4D4DCD',
              textDecoration: 'underline',
              fontWeight: 600
            }}
            href={row.cohort_link || ''}
            target="_blank"
          >
            <div>{row.cohort_name}</div>
            <img src="/static/icons/ic-link.svg" alt="link" />
          </a>
          <div className={classes.textSmall}>800 credits</div>
        </Box>
      </Box>
    );
  }

  if (row.type === 'credit transaction') {
    return (
      <Box className={classes.historyRow}>
        <Box className={classes.dateBox}>
          <p>{moment(row.time).format('DD')}</p>
          <p>{moment(row.time).format('MMM')}</p>
        </Box>
        <Box marginLeft="15px">
          <div style={{ fontWeight: 600 }}>
            <div>Credit Top up</div>
          </div>
          <div className={classes.textSmall}>800 credits</div>
        </Box>
      </Box>
    );
  }
  return null;
};

const CreditHistory = ({ historyData }: { historyData: CreditObject[] }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.sectionCard} ${classes.mt20}`}>
      <Typography variant="h5">History</Typography>
      <Box className={classes.rowContainer}>
        <Box className={classes.yearLine}>2021</Box>
        <Box marginTop="15px">
          {historyData.map((row: CreditObject, index: number) => (
            <HistoryRow key={`${row.credit_amount}-${index}-${row.time}`} row={row} />
          ))}
        </Box>
      </Box>
    </Card>
  );
};

const NewEnrollments = ({ newEnrollments }: { newEnrollments: CreditObject[] }) => {
  const classes = useStyles();

  const ApprovalRow = ({ row }: { row: CreditObject }) => (
    <Box className={classes.boxTwo}>
      <HistoryRow row={row} />
      <Box className={classes.approveBtn}>
        <Button
          value="outlined"
          startIcon={<img src="/static/registration/Check.svg" alt="checkMark" />}
        >
          Approve
        </Button>
      </Box>
    </Box>
  );

  return (
    <Card className={classes.sectionCard}>
      <CardHeader
        style={{ padding: '0' }}
        action={
          newEnrollments.length > 0 ? (
            <span className={classes.notificationText}>{newEnrollments.length} new</span>
          ) : null
        }
        title={
          <div>
            <h3>New Enrollments</h3>
            <p style={{ color: '#A6AAAF', fontWeight: 500 }}>Waiting for approval</p>
          </div>
        }
      />
      <Box style={{ marginTop: '10px', height: '430px', overflowY: 'scroll' }}>
        {newEnrollments.map((row: CreditObject, index: number) => (
          <ApprovalRow key={`${row.credit_amount}-${index}-${row.time}`} row={row} />
        ))}
      </Box>
    </Card>
  );
};

const Dashboard = () => {
  const { cohortCredit } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const populateData = async () => {
      await dispatch(initializeCredit());
    };
    populateData();
  }, []);

  return (
    <Page title="ScholarSite | Business Portal">
      <Container>
        <Typography variant="h4">Dashboard</Typography>
        <Box className={classes.sectionContainer}>
          <Box className={classes.width50}>
            <MyWallet currentBalance={cohortCredit.credit_balance} />
            <CreditHistory historyData={cohortCredit.history} />
          </Box>
          <Box className={classes.width50}>
            <NewEnrollments newEnrollments={cohortCredit.unapproved} />
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
