import { styled } from '@material-ui/core/styles';
import moment from 'moment';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionRowProps = {
  session: SessionListItem;
  onClick: Function;
  index: number;
  isSelected: boolean;
};

const ListItem = styled('div')((props) => ({
  display: 'flex',
  borderBottom: '1px solid #E5E5E5',
  padding: '5px 0',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(77, 77, 205, 0.07)'
  }
}));

const ListIcon = styled('div')(({ theme }) => ({
  padding: 10,
  [theme.breakpoints.down('md')]: {
    padding: 6
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

export default function SessionRow({ session, index, onClick, isSelected }: SessionRowProps) {
  const sessionDate = new Date(session.time);
  const todayDate = new Date();
  const isPastSession = sessionDate < todayDate;

  const sessionTime = (date: string) => {
    if (isPastSession) {
      return `Recorded on ${moment(date).format('DD MMMM YYYY')}`;
    }
    return `Live ${moment(date).fromNow()} | ${moment(date).format('DD MMMM YYYY')}`;
  };

  return (
    <ListItem
      id={`session-list-${index}`}
      data-testid={`session-list-${index}`}
      style={{ ...(isSelected && { backgroundColor: 'rgba(77, 77, 205, 0.03)' }) }}
      onClick={() => onClick(index)}
    >
      <ListIcon>
        <img
          src={isPastSession ? '/static/icons/ic_recorder.svg' : '/static/icons/ic_clock.svg'}
          alt="clock-icon"
          width={35}
          style={{ maxWidth: 'unset' }}
        />
      </ListIcon>
      <div>
        <SessionDetails
          data-testid={`session-list-number-${index}`}
        >{`Session ${session.number} | ${session.length}`}</SessionDetails>
        <Title data-testid={`session-list-title-${index}`}>{session.name}</Title>
        <SessionDetails data-testid={`session-list-time-container-${index}`}>
          <img src="/static/icons/ic_calendar.svg" alt="calendar-icon" style={{ marginRight: 5 }} />
          {sessionTime(session.time)}
        </SessionDetails>
      </div>
    </ListItem>
  );
}
