import { Box } from '@material-ui/core';
import moment from 'moment';
import { ROOT_URL } from 'routes/paths';
import { CreditObject } from '../../../@types/cohorts';
import { useStyles } from './styles';

const HistoryRow = ({ row }: { row: CreditObject }) => {
  const classes = useStyles();

  if (row.type === 'cohort') {
    return (
      <Box data-testid={`history-${row.id}`} className={classes.historyRow}>
        <Box data-testid={`enrollment-time-${row.time}`} className={classes.dateBox}>
          <p>{moment(row.time).format('DD')}</p>
          <p>{moment(row.time).format('MMM')}</p>
        </Box>
        <Box marginLeft="15px" width="100%">
          <p className={classes.textSmall}>
            <span data-testid={`enrollment-attendee-name-${row.attendee_name}`}>
              {row.attendee_name}
            </span>{' '}
            {row.approved ? 'attended' : 'wants to attend'}
          </p>
          <a
            style={{
              display: 'flex',
              color: 'primary.main',
              textDecoration: 'underline',
              fontWeight: 600
            }}
            href={row.cohort_link || ''}
            target="_blank"
            rel="noreferrer"
          >
            <div data-testid={`enrollment-cohort-name-${row.cohort_name}`}>{row.cohort_name}</div>
            {/* <img src="/static/icons/ic-link.svg" alt="link" /> */}
          </a>
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <div
              data-testid={`enrollment-credits-${row.credit_amount}`}
              className={classes.textSmall}
            >
              {row.credit_amount} credits
              {row.approved && (
                <a
                  href={`${ROOT_URL}/invoice.pdf?id=${row.id}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: '5px' }}
                >
                  Download Invoice
                </a>
              )}
            </div>
          </div>
        </Box>
      </Box>
    );
  }

  if (row.type === 'credit transaction') {
    return (
      <Box className={classes.historyRow}>
        <Box data-testid={`credit-time-${row.time}`} className={classes.dateBox}>
          <p>{moment(row.time).format('DD')}</p>
          <p>{moment(row.time).format('MMM')}</p>
        </Box>
        <Box marginLeft="15px">
          <div style={{ fontWeight: 600 }}>
            <div data-testid={`credit-${row.id}-top-up`}>Credit Top up</div>
          </div>
          <div data-testid={`credit-${row.credit_amount}`} className={classes.textSmall}>
            {row.credit_amount} credits
          </div>
        </Box>
      </Box>
    );
  }
  return null;
};

export default HistoryRow;
