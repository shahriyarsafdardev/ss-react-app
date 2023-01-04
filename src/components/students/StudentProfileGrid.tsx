// material
import { Grid } from '@material-ui/core';

import { memo } from 'react';
import StudentProfileCard from './StudentProfileCard';
import { StudentProfile } from '../../@types/cohorts';

type StudentProfileGridProps = {
  students: StudentProfile[];
  modalHandler: Function;
};

const StudentProfileGrid = ({ students, modalHandler }: StudentProfileGridProps) => (
  <Grid container spacing={3} id="peer-grid-container" data-testid="peers-grid">
    {students?.map((peer) => (
      <Grid data-testid={`peer-card-${peer.id}`} key={peer.id} item xs={12} sm={4} md={3}>
        <StudentProfileCard peer={peer} modalHandler={modalHandler} />
      </Grid>
    ))}
  </Grid>
);

export default memo(StudentProfileGrid);
