import { Stack, Typography } from '@material-ui/core';
import { useState } from 'react';
import { StudentProfile } from '../../../@types/cohorts';
import {
  SectionContainer,
  CircularLoader,
  Filters,
  initialFilters,
  applyFilters,
  updatedFilters
} from './Common';
import UserCard from './UserCard';

const AvailableMatches = ({
  user,
  users,
  matchUsers
}: {
  user: StudentProfile;
  users: StudentProfile[];
  matchUsers: Function;
}) => {
  const [filters, setFilters] = useState(initialFilters(user, users));
  const [matches, setMatches] = useState<StudentProfile[]>(users);

  const handleFilter = (index: number, value: boolean) => {
    const tempFilters = [...filters];
    tempFilters[index].applied = value;
    const matched = applyFilters(tempFilters, users, user);
    const newFilters = updatedFilters(tempFilters, matched, user);
    newFilters[index].applied = value;
    setFilters(newFilters);
    setMatches(matched);
  };

  const handleMatch = (peer_id: string) => {
    if (peer_id) {
      matchUsers(user.id, peer_id);
    }
  };

  return (
    <SectionContainer key={user.id} className="available">
      {users.length > 0 ? (
        <Stack spacing={2}>
          <SectionContainer className="white filters">
            <Typography>
              <b>{matches.length} Potential Matches</b>
            </Typography>
            <Filters filters={filters} setFilter={handleFilter} />
          </SectionContainer>
          {matches.length > 0 && (
            <SectionContainer className="matches">
              {matches.map((peer: StudentProfile) => (
                <UserCard
                  match={true}
                  key={peer.id}
                  matchings={users
                    .filter((u) => peer.matchings.includes(u.id))
                    .map((u) => `${u.first_name} ${u.last_name}`)
                    .join(',')}
                  matchUser={(id: string) => handleMatch(id)}
                  styleClass="match"
                  item={peer}
                />
              ))}
            </SectionContainer>
          )}
        </Stack>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default AvailableMatches;
