import { styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import SessionRow from './SessionRow';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionListProps = {
  selectedSession: number;
  sessionsList: SessionListItem[];
  onClick: Function;
};

const ListContainer = styled('div')((props) => ({
  width: '100%'
}));

export default function SessionList({ sessionsList, onClick, selectedSession }: SessionListProps) {
  return (
    <ListContainer>
      <Box marginBottom={2}>
        <Typography variant="h4">All Sessions</Typography>
      </Box>
      <Box data-testid="sessions-list-container" id="sessions-list-container">
        {sessionsList.map((session, index) => (
          <SessionRow
            key={session.id}
            isSelected={index === selectedSession}
            onClick={onClick}
            index={index}
            session={session}
          />
        ))}
      </Box>
    </ListContainer>
  );
}
