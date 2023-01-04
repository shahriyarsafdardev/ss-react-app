// material
import { Table, TableBody, TableContainer } from '@material-ui/core';
import _ from 'lodash';
import { memo } from 'react';
import Scrollbar from '../../Scrollbar';
import { CohortExperience } from '../../../@types/cohorts';
import { UserListHead } from '../../_dashboard/user/list';
import ExperienceRow from './ExperienceRow';

const TABLE_HEAD = [
  { id: 'code', label: 'Cohort Code' },
  { id: 'start_date', label: 'Start Date', align: 'center' },
  { id: 'participants', label: 'No. Participants', align: 'center' },
  { id: 'live_attendance', label: 'Avg. Live Attendance', align: 'center' },
  { id: 'live_async_attendance', label: 'Avg. Live + Async. Attendance', align: 'center' },
  { id: 'more', label: 'More', align: 'center' }
];

function ExperiencesList({ cohortExperiences }: { cohortExperiences: CohortExperience[] }) {
  return (
    <div style={{ width: '-webkit-fill-available' }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="time"
              headLabel={TABLE_HEAD}
              rowCount={cohortExperiences.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="experience-list-container" data-testid="experience-list">
              {cohortExperiences.map((experience: any, index) => (
                <ExperienceRow key={experience.id} cohortExperience={experience} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
}

export default memo(ExperiencesList);
