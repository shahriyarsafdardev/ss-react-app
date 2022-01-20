import { Stack, TableRow, TableCell, Typography, Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Label from 'components/Label';
import { Enrollment } from '../../../@types/cohorts';
import { Actions, Tags, pickColor } from './Common';

type RegistrationRowProps = {
  enrollment: Enrollment;
  index: number;
};

export default function RegistrationRow({ enrollment, index }: RegistrationRowProps) {
  const theme = useTheme();

  const { id, first_name, email, name, status, time, price, linkedin_url } = enrollment;

  return (
    <TableRow hover key={id} tabIndex={-1} data-testid={`registration-row-${id}`}>
      <TableCell component="th" scope="row" style={{ width: 200 }} padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          {linkedin_url ? (
            <Link
              underline="always"
              href={linkedin_url}
              target="_blank"
              color="#071A33"
              data-testid={`registration${id ? `-${id}` : ''}-name`}
              sx={{ typography: 'subtitle2' }}
            >
              {first_name === 'Unknown' ? email : name}
            </Link>
          ) : (
            <Typography
              variant="subtitle2"
              noWrap
              data-testid={`registration${id ? `-${id}` : ''}-name`}
            >
              {first_name === 'Unknown' ? email : name}
            </Typography>
          )}
        </Stack>
      </TableCell>
      <TableCell
        style={{ width: 170 }}
        align="center"
        data-testid={`registration${id ? `-${id}` : ''}-time`}
      >
        {time}
      </TableCell>
      <TableCell
        style={{ width: 100 }}
        align="center"
        data-testid={`registration${id ? `-${id}` : ''}-price`}
      >
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
      <TableCell
        style={{ width: 120 }}
        align="center"
        data-testid={`registration${id ? `-${id}` : ''}-price`}
      >
        <Tags enrollment={enrollment} />
      </TableCell>
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
