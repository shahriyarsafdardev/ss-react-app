// material
import { Grid } from '@material-ui/core';

import StudentProfileCard from './StudentProfileCard';
import { StudentProfile } from '../../@types/cohorts';

type StudentProfileGridProps = {
  students: StudentProfile[];
  modalHandler: Function;
};

export default function StudentProfileGrid({ students, modalHandler }: StudentProfileGridProps) {
  return (
    <Grid container spacing={3} id="peer-grid-container" data-testid="peers-grid">
      {students?.map((peer) => (
        <Grid key={peer.id} item xs={12} sm={4} md={3}>
          <StudentProfileCard peer={peer} modalHandler={modalHandler} />
        </Grid>
      ))}
    </Grid>
  );
}
