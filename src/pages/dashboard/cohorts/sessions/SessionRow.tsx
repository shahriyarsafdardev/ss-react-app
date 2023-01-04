/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, memo } from 'react';
import { styled } from '@material-ui/core/styles';
import { firstUpcomingDate } from 'components/cohorts/home/Common';
import moment from 'moment';
import { Box, Stack } from '@material-ui/core';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { memoize } from 'lodash';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionRowProps = {
  session: SessionListItem;
  onClick: Function;
  index: number;
  isSelected: boolean;
};

const ListItem = styled('div')((props) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #E5E5E5',
  padding: '5px 0',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(77, 77, 205, 0.07)'
  }
}));

const Title = styled('p')((props) => ({
  fontSize: '16px',
  fontWeight: 'bold'
}));

const SessionDetails = styled('div')((props) => ({
  display: 'flex',
  fontSize: '14px',
  lineHeight: '33px',
  color: '#6C7885'
}));

const SessionCountdown = styled('div')((props) => ({
  marginTop: '5px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '12px',
  lineHeight: '17px',
  color: '#A6AEB7',
  img: {
    width: '20px'
  }
}));

function SessionRow({ session, index, onClick, isSelected }: SessionRowProps) {
  const sessionDate = moment(firstUpcomingDate(session.times)).add(2, 'hours');
  const isPastSession = sessionDate < moment();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const handleSessionSelection = () => {
    onClick(index);
    sendAnalyticsData('Sessions Page - Session Sidebar - Session Selected', {
      'Session ID': session?.id,
      'Session Number': session?.number,
      'Session Name': session?.name
    });
  };

  const sessionTime = memoize((date: string) => (
    <>
      {`Live ${moment(date).fromNow()}`}
      <br />
      {`${moment(date).format('DD MMMM YYYY')}`}
    </>
  ));

  return (
    <ListItem
      id={`session-list-${index}`}
      data-testid={`session-list-${index}`}
      sx={{
        padding: '10px 20px',
        ...(isSelected && {
          backgroundColor: 'rgba(77, 77, 205, 0.03)'
        })
      }}
    >
      <Box onClick={handleSessionSelection} sx={{ width: '100%' }}>
        <SessionDetails
          data-testid={`session-list-number-${index}`}
        >{`Session ${session.number} | ${session.length}`}</SessionDetails>
        <Title data-testid={`session-list-title-${index}`}>{session.name}</Title>
        <SessionCountdown data-testid={`session-list-time-container-${index}`}>
          <img src="/static/icons/ic_calendar.svg" alt="calendar-icon" style={{ marginRight: 5 }} />
          {isPastSession
            ? `Recorded on ${moment(firstUpcomingDate(session.times)).format('DD MMMM YYYY')}`
            : sessionTime(firstUpcomingDate(session.times))}
        </SessionCountdown>
      </Box>
    </ListItem>
  );
}

export default memo(SessionRow);
