import { TableRow, Tooltip, TableCell } from '@material-ui/core';
import { Alumni } from '../../../@types/cohorts';
import { Action } from './Action';

type AlumniRowProps = {
  alumni: Alumni;
};

export default function AlumniRow({ alumni }: AlumniRowProps) {
  const { id, full_name, company_name, paid_cohorts, notes, mailing_list } = alumni;

  return (
    <TableRow hover key={id} tabIndex={-1} data-testid={`alumni-row-${id}`}>
      <TableCell style={{ width: 200 }} data-testid={`alumni-${id ? `-${id}` : ''}-name`}>
        {full_name}
      </TableCell>

      <TableCell style={{ width: 200 }} data-testid={`alumni-${id ? `-${id}` : ''}-company`}>
        {company_name}
      </TableCell>

      <TableCell style={{ width: 200 }} data-testid={`alumni-${id ? `-${id}` : ''}-cohorts`}>
        {paid_cohorts}
      </TableCell>

      <TableCell style={{ width: 200 }} data-testid={`alumni-${id ? `-${id}` : ''}-notes`}>
        {notes}
      </TableCell>

      <TableCell style={{ width: 50 }} data-testid={`alumni-${id ? `-${id}` : ''}-mailing`}>
        {mailing_list && (
          <Tooltip
            arrow
            placement="top"
            title={
              <span className="ui-copy text-white">
                {full_name.split(' ')[0]} has unsubscribed from emails
              </span>
            }
          >
            <img
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              src="/static/red_cross.svg"
              alt="cross"
            />
          </Tooltip>
        )}
      </TableCell>

      <TableCell
        style={{ width: 50, textAlignLast: 'center' }}
        data-testid={`alumni-${id ? `-${id}` : ''}-mailing`}
      >
        <Action alumni={alumni} />
      </TableCell>
    </TableRow>
  );
}
