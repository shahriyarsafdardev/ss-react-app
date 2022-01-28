import { Stack, Typography } from '@material-ui/core';
import { StudentProfile } from '../../../@types/cohorts';
import { SectionContainer, CircularLoader } from './Common';
import UserCard from './UserCard';

const MachingUser = ({ user }: { user: StudentProfile }) => (
  <SectionContainer className="matching">
    {user ? (
      <Stack spacing={2}>
        <SectionContainer className="white">
          <Typography>
            <b>Next:</b> Find a match for {user.first_name} {user.last_name}
          </Typography>
        </SectionContainer>
        <UserCard
          match={false}
          matchings={null}
          matchUser={() => {}}
          item={user}
          styleClass="white"
        />
      </Stack>
    ) : (
      <CircularLoader />
    )}
  </SectionContainer>
);

export default MachingUser;
