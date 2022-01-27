import { Stack, Typography } from '@material-ui/core';
import { useState } from 'react';
import { StudentProfile } from '../../../@types/cohorts';
import { SectionContainer, CircularLoader, Filters, initialFilters } from './Common';
import UserCard from './UserCard';

const AvailableMatches = ({ user, users }: { user: StudentProfile; users: StudentProfile[] }) => {
  const [filters, setFilters] = useState(initialFilters(user, users));

  const handleFilter = (index: number, value: boolean) => {
    const newFilters = [...filters];
    newFilters[index].applied = value;
    setFilters(newFilters);
  };
  return (
    <SectionContainer className="available">
      {users.length > 0 ? (
        <Stack spacing={2}>
          <SectionContainer className="white filters">
            <Typography>
              <b>{users.length} Potential Matches</b>
            </Typography>
            <Filters filters={filters} setFilter={handleFilter} />
          </SectionContainer>
          <SectionContainer className="matches">
            {users.map((user) => (
              <UserCard match={true} key={user.id} styleClass="match" item={user} />
            ))}
          </SectionContainer>
        </Stack>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default AvailableMatches;
