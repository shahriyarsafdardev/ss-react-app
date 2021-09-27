import { styled } from '@material-ui/core/styles';
import moment from 'moment';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionRowProps = {
  session: SessionListItem;
  onClick: Function;
  index: number;
};

const ListItem = styled('div')((props) => ({
  display: 'flex',
  borderBottom: '1px solid #E5E5E5',
  padding: '5px 0',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(77, 77, 205, 0.06)'
  }
}));

const ListIcon = styled('div')((props) => ({
  width: '50px',
  padding: 8
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
  const sessionDate = new Date(session.time);
  const todayDate = new Date();
  const isPastSession = sessionDate < todayDate;

  const trimTitle = (title: string) =>
    title.length > TRIM_LENGTH ? `${title.slice(0, TRIM_LENGTH)}...` : title;

  const sessionTime = (date: string) => {
    if (isPastSession) {
      return `Recorded on ${moment(date).format('DD MMMM YYYY')}`;
    }
    return `Live ${moment(date).fromNow()} | ${moment(date).format('DD MMMM YYYY')}`;
  };

  return (
    <ListItem onClick={() => onClick(index)}>
      <ListIcon>
        <img
          src={isPastSession ? '/static/icons/ic_recorder.svg' : '/static/icons/ic_clock.svg'}
          alt="clock-icon"
        />
      </ListIcon>
      <div>
        <SessionDetails>{`Session ${session.number} | ${session.length}`}</SessionDetails>
        <Title>{trimTitle(session.name)}</Title>
        <SessionDetails>
          <img src="/static/icons/ic_calendar.svg" alt="calendar-icon" />
          {sessionTime(session.time)}
        </SessionDetails>
      </div>
    </ListItem>
  );
}
