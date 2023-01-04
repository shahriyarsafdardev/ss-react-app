import { memo } from 'react';
import { Box, Typography, Card } from '@material-ui/core';
import { CreditObject } from '../../../@types/cohorts';
import { EmptyStateHistory, useStyles } from './Common';
import HistoryRow from './HistoryRow';

const CreditHistory = memo(({ historyData }: { historyData: CreditObject[] }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.sectionCard} ${classes.mt20}`}>
      <Typography data-testid="history-header" variant="h5">
        History
      </Typography>
      <Box className={classes.rowContainer}>
        <Box marginTop="15px">
          {historyData.length > 0 ? (
            historyData.map((row: CreditObject, index: number) => (
              <HistoryRow key={`${row.credit_amount}-${index}-${row.time}`} row={row} />
            ))
          ) : (
            <EmptyStateHistory />
          )}
        </Box>
      </Box>
    </Card>
  );
});

export default CreditHistory;
