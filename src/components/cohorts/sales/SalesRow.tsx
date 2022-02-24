import { Stack, TableRow, Tooltip, TableCell } from '@material-ui/core';
import { CohortSale } from '../../../@types/cohorts';

type SalesRowProps = {
  cohortSale: CohortSale;
};

export default function SalesRow({ cohortSale }: SalesRowProps) {
  const { id, code, name, start_date, seats_sold, seats_sold_week, revenue, revenue_week } =
    cohortSale;

  return (
    <TableRow hover key={id} tabIndex={-1} data-testid={`sales-row-${id}`}>
      <TableCell style={{ width: 170 }} align="left">
        <Stack direction="row" spacing={1}>
          <b>{code || 'No Cohort Code'}</b>
          <Tooltip arrow placement="top" title={<span className="ui-copy text-white">{name}</span>}>
            <img src="/static/registration/Info.svg" alt="Info Icon" />
          </Tooltip>
        </Stack>
      </TableCell>
      <TableCell
        style={{ width: 100 }}
        align="center"
        data-testid={`sales-${id ? `-${id}` : ''}-date`}
      >
        {start_date}
      </TableCell>
      <TableCell
        style={{ width: 100 }}
        align="center"
        data-testid={`sales-${id ? `-${id}` : ''}-seats`}
      >
        {seats_sold}
      </TableCell>
      <TableCell
        style={{ width: 100 }}
        align="center"
        data-testid={`sales-${id ? `-${id}` : ''}-revenue`}
      >
        ${revenue || 0}
      </TableCell>
      <TableCell
        style={{ width: 120 }}
        align="center"
        data-testid={`sales-${id ? `-${id}` : ''}-seats_sold_week`}
      >
        {seats_sold_week}
      </TableCell>
      <TableCell
        style={{ width: 120 }}
        align="center"
        data-testid={`sales-${id ? `-${id}` : ''}-revenue_week`}
      >
        ${revenue_week || 0}
      </TableCell>
    </TableRow>
  );
}
