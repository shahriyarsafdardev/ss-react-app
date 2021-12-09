import React, { useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { MessageUIComponentProps, MessageTeam, useMessageContext } from 'stream-chat-react';
import { StudentProfile } from '../../../@types/cohorts';

import useAuth from '../../../hooks/useAuth';

import './TeamMessage.css';

type Props = MessageUIComponentProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  peers: StudentProfile[];
};

const UserSpecialities = ({ specialities, type }: { specialities: String[]; type: string }) => (
  <p className="str-chat__avatar-tooltip-info-speciality">
    <strong>{type}: </strong>
    {specialities.map((speciality, i) => (
      <span key={i}>
        {i !== 0 && ', '}
        {speciality}
      </span>
    ))}
  </p>
);
export const TeamMessage: React.FC<Props> = (props) => {
  const { setPinsOpen, peers } = props;
  const [isShown, setIsShown] = useState(false);
  const [path, setPath] = useState<string>('');
  const cohortID = window.location.pathname.split('/')[2] || '';
  const [navigate, setNavigate] = useState<boolean>(false);
  const [hoveredUser, setHoveredUser] = useState<StudentProfile>();
  const { user } = useAuth();

  const { handleOpenThread, message } = useMessageContext();
  const peer = peers.filter((peer) => peer.id === message?.user?.id)[0];
  const currentUser = user?.id === message?.user?.id;

  const handleOpenThreadOverride = (event: React.BaseSyntheticEvent) => {
    if (setPinsOpen) setPinsOpen(false);
    handleOpenThread(event);
  };

  const handleUserClick = () => {
    if (!currentUser && !peer.type) {
      setPath(`/cohorts/${cohortID}/peers?user_id=${message.user?.id}`);
      setNavigate(true);
    }
  };

  const onUserHover = (event: React.BaseSyntheticEvent) => {
    if (peer && !currentUser) {
      event.target.style.cursor = 'pointer';
      setHoveredUser(peer);
      event.target.parentElement.removeAttribute('title');
      setIsShown(true);
    }
  };
  return (
    <div
      className={message.pinned ? 'pinned-message' : 'unpinned-message'}
      onMouseLeave={() => setIsShown(false)}
    >
      {navigate && <Navigate to={path} />}
      {isShown && hoveredUser && (
        <div className="str-chat__avatar-tooltip">
          <div className="str-chat__avatar-tooltip-info">
            <h2>
              <b className="str-chat__avatar-tooltip-info-name">{message.user?.name}</b>
            </h2>
            {hoveredUser.current_company && (
              <p className="str-chat__avatar-tooltip-info-company">
                <strong>
                  {hoveredUser.current_position} @ {hoveredUser.current_company?.name}{' '}
                </strong>
              </p>
            )}
            {hoveredUser.interests?.length > 0 && (
              <UserSpecialities type="Interested in" specialities={hoveredUser.interests} />
            )}
            {hoveredUser.strengths?.length > 0 && (
              <UserSpecialities type="Strengths" specialities={hoveredUser.strengths} />
            )}
            <Button
              className="str-chat__avatar-tooltip-info-button"
              href={`/cohorts/${cohortID}/messaging?direct=true&receiver_id=${hoveredUser.id}`}
            >
              Send Message
            </Button>
          </div>
        </div>
      )}
      <MessageTeam
        {...props}
        onUserClick={handleUserClick}
        onUserHover={onUserHover}
        message={message}
        handleOpenThread={handleOpenThreadOverride}
      />
    </div>
  );
};
