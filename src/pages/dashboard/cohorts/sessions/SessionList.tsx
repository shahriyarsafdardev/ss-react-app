import { styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SessionRow from './SessionRow';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionListProps = {
  sessionsList: SessionListItem[];
  onClick: Function;
};

const ListContainer = styled('div')((props) => ({
  width: '100%'
}));

export default function SessionList({ sessionsList, onClick }: SessionListProps) {
  return (
    <ListContainer>
      <Typography variant="h4">All Sessions</Typography>
      {sessionsList.map((session, index) => (
        <SessionRow key={session.id} onClick={onClick} index={index} session={session} />
      ))}
    </ListContainer>
  );
}
