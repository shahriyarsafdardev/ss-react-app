// material
import { Grid } from '@material-ui/core';

import StudentProfileCard from './StudentProfileCard';
import { StudentProfile } from '../../@types/cohorts';

type StudentProfileGridProps = {
  students: StudentProfile[];
  modalHandler: VoidFunction;
};

export default function StudentProfileGrid({ students, modalHandler }: StudentProfileGridProps) {
  return (
    <Grid container spacing={3}>
      {students?.map((peer) => (
        <Grid key={peer.id} item xs={12} sm={6} md={4}>
          <StudentProfileCard peer={peer} modalHandler={modalHandler} />
        </Grid>
      ))}
    </Grid>
  );
}
