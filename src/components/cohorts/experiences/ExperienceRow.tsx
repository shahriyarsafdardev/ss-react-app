import { Stack, Link, TableRow, Tooltip, TableCell } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { CohortExperience } from '../../../@types/cohorts';
import { ExperienceActions } from './Common';

type ExperienceRowProps = {
  cohortExperience: CohortExperience;
};

export default function ExperienceRow({ cohortExperience }: ExperienceRowProps) {
  const {
    id,
    code,
    intake,
    name,
    start_date,
    participants,
    live_attendance,
    live_async_attendance
  } = cohortExperience;

  return (
    <TableRow hover key={id} tabIndex={-1} data-testid={`experience-row-${id}`}>
      <TableCell style={{ width: 150 }} align="left">
        <Stack direction="row" spacing={1}>
          <Link
            component={RouterLink}
            to={`/cohorts/${id}/attendance`}
            color="#071A33"
            data-testid={`experience${id ? `-${id}` : ''}-name`}
            sx={{ typography: 'subtitle2' }}
          >
            {code} {intake}
          </Link>
          <Tooltip arrow placement="top" title={<span className="ui-copy text-white">{name}</span>}>
            <img src="/static/registration/Info.svg" alt="Info Icon" />
          </Tooltip>
        </Stack>
      </TableCell>
      <TableCell
        style={{ width: 70 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-date`}
      >
        {start_date}
      </TableCell>
      <TableCell
        style={{ width: 70 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-participants`}
      >
        {participants}
      </TableCell>
      <TableCell
        style={{ width: 80 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-live`}
      >
        {live_attendance}%
      </TableCell>
      <TableCell
        style={{ width: 150 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-async`}
      >
        {live_async_attendance}%
      </TableCell>
      <TableCell
        style={{ width: 120 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-feedback`}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <ExperienceActions id={id} experience={cohortExperience} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
