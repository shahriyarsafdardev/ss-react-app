import { memo } from 'react';
import { Box, Card, CardHeader, Button } from '@material-ui/core';
import HistoryRow from './HistoryRow';
import { CreditObject } from '../../../@types/cohorts';
import { EmptyStateNewEnrollments, StyledIcon, useStyles } from './Common';

const NewEnrollments = memo(
  ({
    newEnrollments,
    onApproveCredit,
    onRejectCredit
  }: {
    newEnrollments: CreditObject[];
    onApproveCredit: Function;
    onRejectCredit: Function;
  }) => {
    const classes = useStyles();

    const ApprovalRow = ({ row }: { row: CreditObject }) => (
      <Box data-testid={`enrollment-${row.id}`} className={classes.boxTwo}>
        <HistoryRow row={row} />
        <Box className={classes.approveBtn}>
          <Button
            data-testid={`enrollment-reject-btn-${row.id}`}
            variant="outlined"
            onClick={() => onRejectCredit(row.id)}
            color="error"
            sx={{ mr: 2 }}
          >
            <StyledIcon src="/static/registration/cross.svg" />
            Reject
          </Button>
          <Button
            data-testid={`enrollment-approve-btn-${row.id}`}
            variant="outlined"
            color="primary"
            onClick={() => onApproveCredit(row.id)}
            sx={{ ml: 2 }}
          >
            <StyledIcon src="/static/registration/Check.svg" />
            Approve
          </Button>
        </Box>
      </Box>
    );

    return (
      <Card className={classes.sectionCard} style={{ height: '100%' }}>
        <CardHeader
          style={{ padding: '0' }}
          action={
            newEnrollments.length > 0 ? (
              <span
                data-testid={`enrollment-count-${newEnrollments.length}`}
                className={classes.notificationText}
              >
                {newEnrollments.length} new
              </span>
            ) : null
          }
          title={
            <div>
              <h3 data-testid="new-enrollments-header">New Enrollments</h3>
              <p style={{ color: '#A6AAAF', fontWeight: 500 }}>Waiting for approval</p>
            </div>
          }
        />
        <Box className={classes.upcomingContainer}>
          {newEnrollments.length > 0 ? (
            newEnrollments.map((row: CreditObject, index: number) => (
              <ApprovalRow key={`${row.credit_amount}-${index}-${row.time}`} row={row} />
            ))
          ) : (
            <EmptyStateNewEnrollments />
          )}
        </Box>
      </Card>
    );
  }
);

export default NewEnrollments;
