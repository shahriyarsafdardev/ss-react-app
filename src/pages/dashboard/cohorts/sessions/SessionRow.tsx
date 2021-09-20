import { styled } from '@material-ui/core/styles';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionRowProps = {
  session: SessionListItem;
  onClick: Function;
  index: number;
};

const ListItem = styled('div')((props) => ({
  borderBottom: '1px solid #E5E5E5',
  padding: '5px 10px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(77, 77, 205, 0.06)'
  }
}));

const Title = styled('p')((props) => ({
  fontSize: '18px',
  fontWeight: 'bold'
}));

const SessionDetails = styled('div')((props) => ({
  display: 'flex',
  fontSize: '15px',
  lineHeight: '33px',
  color: '#6C7885',
  img: {
    width: '20px'
  }
}));

const TRIM_LENGTH = 25;

export default function SessionRow({ session, index, onClick }: SessionRowProps) {
  const trimTitle = (title: string) =>
    title.length > TRIM_LENGTH ? `${title.slice(0, TRIM_LENGTH)}...` : title;

  return (
    <ListItem onClick={() => onClick(index)}>
      <SessionDetails>{`Session ${session.number} | ${session.length}`}</SessionDetails>
      <Title>{trimTitle(session.name)}</Title>
      <SessionDetails>
        <img src="/static/icons/ic_calendar.svg" />
        Live in 1 day | 20 August 2020
      </SessionDetails>
    </ListItem>
  );
}
