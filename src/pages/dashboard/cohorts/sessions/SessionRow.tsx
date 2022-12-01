/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState, useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import { firstUpcomingDate } from 'components/cohorts/home/Common';
import moment from 'moment';
import { Box, MenuItem, IconButton, Stack } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuPopover from 'components/MenuPopover';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionRowProps = {
  session: SessionListItem;
  onClick: Function;
  index: number;
  isSelected: boolean;
  isLearner?: boolean;
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

const StyledIcon = styled('img')(() => ({
  width: '20px',
  height: '20px',
  marginRight: '15px'
}));

const InstructorOptions = ({ handleDelete }: { handleDelete: Function }) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        ref={menuRef}
      >
        <MoreVertIcon />
      </IconButton>
      <MenuPopover
        open={open}
        anchorEl={menuRef.current}
        onClose={() => {
          setOpen(false);
        }}
        sx={{ width: 200 }}
      >
        <MenuItem
          id="comment-settings"
          onClick={() => handleDelete()}
          sx={{ typography: 'body2', py: 1, px: 2.5, color: 'primary' }}
        >
          <StyledIcon src="/static/icons/edit-oval.svg" alt="bin" />
          Duplicate
        </MenuItem>

        <MenuItem
          disabled
          id="comment-settings"
          onClick={() => handleDelete()}
          sx={{ typography: 'body2', py: 1, px: 2.5, color: 'primary' }}
        >
          <StyledIcon src="/static/icons/edit-oval.svg" alt="bin" />
          Edit
        </MenuItem>

        <MenuItem
          id="comment-settings"
          onClick={() => handleDelete()}
          sx={{ typography: 'body2', py: 1, px: 2.5, color: '#FF4842' }}
        >
          <StyledIcon src="/static/icons/bin.svg" alt="bin" />
          Delete
        </MenuItem>
      </MenuPopover>
    </Box>
  );
};

export default function SessionRow({
  session,
  index,
  onClick,
  isSelected,
  isLearner = true
}: SessionRowProps) {
  const sessionDate = moment(firstUpcomingDate(session.times)).add(1, 'hours');
  const isPastSession = sessionDate < moment();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const sessionTime = (date: string) => (
    <span>
      {`Live ${moment(date).fromNow()}`}
      <br />
      {`${moment(date).format('DD MMMM YYYY')}`}
    </span>
  );

  return (
    <ListItem
      id={`session-list-${index}`}
      data-testid={`session-list-${index}`}
      style={{
        padding: '10px 20px',
        ...(isSelected && {
          backgroundColor: 'rgba(77, 77, 205, 0.03)'
        })
      }}
    >
      <div
        onClick={() => {
          onClick(index);
          sendAnalyticsData('Sessions Page - Session Sidebar - Session Selected', {
            'Session ID': session?.id,
            'Session Number': session?.number,
            'Session Name': session?.name
          });
        }}
        style={{ width: '100%' }}
      >
        <Stack direction="row">
          <Box>
            <SessionDetails
              data-testid={`session-list-number-${index}`}
            >{`Session ${session.number} | ${session.length}`}</SessionDetails>
            <Title data-testid={`session-list-title-${index}`}>{session.name}</Title>
          </Box>
          {/* {!isLearner && <InstructorOptions handleDelete={() => {}} />} */}
        </Stack>
        <SessionCountdown data-testid={`session-list-time-container-${index}`}>
          <img src="/static/icons/ic_calendar.svg" alt="calendar-icon" style={{ marginRight: 5 }} />
          {isPastSession
            ? `Recorded on ${moment(firstUpcomingDate(session.times)).format('DD MMMM YYYY')}`
            : sessionTime(firstUpcomingDate(session.times))}
        </SessionCountdown>
      </div>
    </ListItem>
  );
}
