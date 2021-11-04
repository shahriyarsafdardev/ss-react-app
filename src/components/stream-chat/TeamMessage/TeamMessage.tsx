import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { MessageUIComponentProps, MessageTeam, useMessageContext } from 'stream-chat-react';
import { StudentProfile } from '../../../@types/cohorts';

import './TeamMessage.css';

type Props = MessageUIComponentProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  peers: StudentProfile[];
};

const UserSpecialities = ({ specialities, type }: { specialities: String[]; type: string }) => (
  <p>
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
  const cohortID = window.location.pathname.split('/')[2] || '';
  const [navigate, setNavigate] = useState<boolean>(false);
  const [hoveredUser, setHoveredUser] = useState<StudentProfile>();

  const { handleOpenThread, message } = useMessageContext();
  const peer = peers.filter((peer) => peer.id === message?.user?.id)[0];

  const handleOpenThreadOverride = (event: React.BaseSyntheticEvent) => {
    if (setPinsOpen) setPinsOpen(false);
    handleOpenThread(event);
  };

  const handleUserClick = () => {
    setNavigate(true);
  };

  const onUserHover = (event: React.BaseSyntheticEvent) => {
    event.target.style.cursor = 'pointer';
    if (peer) {
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
      {navigate && <Navigate to={`/cohorts/${cohortID}/peers?user_id=${message.user?.id}`} />}
      {isShown && hoveredUser && (
        <div className="str-chat__avatar-tooltip">
          <div>
            <h2>
              <b>{message.user?.name}</b>
              {message.user?.online ? (
                <span className="logged-in">●</span>
              ) : (
                <span className="logged-out">●</span>
              )}
            </h2>
            {hoveredUser.current_company && (
              <p>
                <strong>Company: </strong>
                {hoveredUser.current_company?.name}{' '}
              </p>
            )}
            {hoveredUser.interests && (
              <UserSpecialities type="Interests" specialities={hoveredUser.interests} />
            )}
            {hoveredUser.strengths && (
              <UserSpecialities type="Strengths" specialities={hoveredUser.strengths} />
            )}
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
