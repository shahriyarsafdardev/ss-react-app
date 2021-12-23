import { Stack, TableRow, TableCell, Typography, Link, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Label from 'components/Label';
import { Enrollment } from '../../../@types/cohorts';
import { Actions, pickColor } from './Common';

type RegistrationRowProps = {
  enrollment: Enrollment;
  index: number;
  page: string;
};

export default function RegistrationRow({ enrollment, index, page }: RegistrationRowProps) {
  const theme = useTheme();

  const { id, name, status, time, price, linkedin_url } = enrollment;

  return (
    <TableRow hover key={id} tabIndex={-1} data-testid={`registration-row-${id}`}>
      <TableCell component="th" scope="row" style={{ width: 200 }} padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="subtitle2"
            noWrap
            data-testid={`registration${id ? `-${id}` : ''}-name`}
          >
            {name}
          </Typography>
        </Stack>
      </TableCell>
      {page !== 'Home' && (
        <TableCell align="center" data-testid={`registration${id ? `-${id}` : ''}-time`}>
          {time}
        </TableCell>
      )}
      <TableCell
        style={{ width: 150 }}
        align="center"
        data-testid={`registration${id ? `-${id}` : ''}-linkedin-url`}
      >
        {linkedin_url && (
          <Link
            underline="always"
            href={linkedin_url}
            target="_blank"
            color={page === 'Home' ? '#4d4dcd' : '#071A33'}
            sx={{ typography: 'body2' }}
          >
            {page === 'Home' ? 'Open Link' : 'Open'}
          </Link>
        )}
      </TableCell>
      {page !== 'Home' && (
        <>
          <TableCell align="center" data-testid={`registration${id ? `-${id}` : ''}-price`}>
            ${price || 0}
          </TableCell>
          <TableCell style={{ width: 300 }} align="center">
            <Label
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color={pickColor(status)}
              testId={`registration${id ? `-${id}` : ''}-status`}
            >
              {status}
            </Label>
          </TableCell>
        </>
      )}
      <TableCell
        style={{ width: 250 }}
        align="center"
        data-testid={`registration${id ? `-${id}` : ''}-price`}
      >
        <Actions enrollment={enrollment} />
      </TableCell>
    </TableRow>
  );
}
