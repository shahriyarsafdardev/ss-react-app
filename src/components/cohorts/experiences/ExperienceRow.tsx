import { Stack, TableRow, Tooltip, TableCell } from '@material-ui/core';
import { CohortExperience } from '../../../@types/cohorts';
import { ExcelDownload } from './ExcelDownload';

type ExperienceRowProps = {
  cohortExperience: CohortExperience;
  cohortExperiences: CohortExperience[];
};

export default function ExperienceRow({ cohortExperience, cohortExperiences }: ExperienceRowProps) {
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
      <TableCell style={{ width: 100 }} align="left">
        <Stack direction="row" spacing={1}>
          <b>
            {code} {intake}
          </b>
          <Tooltip arrow placement="top" title={<span className="ui-copy text-white">{name}</span>}>
            <img src="/static/registration/Info.svg" alt="Info Icon" />
          </Tooltip>
        </Stack>
      </TableCell>
      <TableCell
        style={{ width: 100 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-date`}
      >
        {start_date}
      </TableCell>
      <TableCell
        style={{ width: 100 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-seats`}
      >
        {participants}
      </TableCell>
      <TableCell
        style={{ width: 100 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-revenue`}
      >
        {live_attendance}%
      </TableCell>
      <TableCell
        style={{ width: 120 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-seats_sold_week`}
      >
        {live_async_attendance}%
      </TableCell>
      <TableCell
        style={{ width: 120 }}
        align="center"
        data-testid={`experience-${id ? `-${id}` : ''}-revenue_week`}
      >
        <ExcelDownload experiences={cohortExperiences} experience={cohortExperience} />
      </TableCell>
    </TableRow>
  );
}
