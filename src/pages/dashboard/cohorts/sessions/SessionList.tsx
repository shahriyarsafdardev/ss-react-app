import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import SessionRow from './SessionRow';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionListProps = {
  selectedSession: number;
  sessionsList: SessionListItem[];
  onClick: Function;
  isLearner?: boolean;
};

const ListContainer = styled('div')((props) => ({
  width: '100%'
}));

export default function SessionList({
  sessionsList,
  onClick,
  selectedSession,
  isLearner
}: SessionListProps) {
  return (
    <ListContainer>
      <Box data-testid="sessions-list-container" id="sessions-list-container">
        {sessionsList.map((session, index) => (
          <SessionRow
            isLearner={isLearner}
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
