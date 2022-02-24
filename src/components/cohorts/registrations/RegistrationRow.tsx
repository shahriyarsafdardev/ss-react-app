import { Stack, Tooltip, TableRow, TableCell, Typography, Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Label from 'components/Label';
import { Enrollment, ReferralCode } from '../../../@types/cohorts';
import { Actions, Tags, pickColor } from './Common';

type RegistrationRowProps = {
  enrollment: Enrollment;
  index: number;
  codes: ReferralCode[];
  isAdminView?: boolean;
};

export default function RegistrationRow({
  enrollment,
  index,
  codes,
  isAdminView = false
}: RegistrationRowProps) {
  const theme = useTheme();

  const {
    id,
    cohort_code,
    cohort_name,
    first_name,
    email,
    name,
    status,
    time,
    price,
    linkedin_url,
    last_action_date
  } = enrollment;

  return (
    <TableRow hover key={id} tabIndex={-1} data-testid={`registration-row-${id}`}>
      {isAdminView && (
        <TableCell style={{ width: 170 }} align="center">
          <Stack direction="row" spacing={1}>
            <b>{cohort_code || 'No Cohort Code'}</b>
            <Tooltip
              arrow
              placement="top"
              title={<span className="ui-copy text-white">{cohort_name}</span>}
            >
              <img src="/static/registration/Info.svg" alt="Info Icon" />
            </Tooltip>
          </Stack>
        </TableCell>
      )}
      <TableCell component="th" scope="row" style={{ width: 150 }} padding="none">
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
        style={{ width: 170 }}
        align="center"
        data-testid={`registration${id ? `-${id}` : ''}-last-action-date`}
      >
        {last_action_date}
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
        <Actions codes={codes} isAdminView={isAdminView} enrollment={enrollment} />
      </TableCell>
    </TableRow>
  );
}
