import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { MessageUIComponentProps, MessageTeam, useMessageContext } from 'stream-chat-react';

import './TeamMessage.css';

type Props = MessageUIComponentProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamMessage: React.FC<Props> = (props) => {
  const { setPinsOpen } = props;
  const [isShown, setIsShown] = useState(false);
  const cohortID = window.location.pathname.split('/')[2] || '';
  const [navigate, setNavigate] = useState<boolean>(false);

  const { handleOpenThread, message } = useMessageContext();

  const handleOpenThreadOverride = (event: React.BaseSyntheticEvent) => {
    if (setPinsOpen) setPinsOpen(false);
    handleOpenThread(event);
  };

  const handleUserClick = () => {
    setNavigate(true);
  };

  const onUserHover = (event: React.BaseSyntheticEvent) => {
    event.target.style.cursor = 'pointer';
    event.target.parentElement.removeAttribute('title');
    setIsShown(true);
  };

  return (
    <div
      className={message.pinned ? 'pinned-message' : 'unpinned-message'}
      onMouseLeave={() => setIsShown(false)}
    >
      {navigate && <Navigate to={`/cohorts/${cohortID}/peers?user_id=${message.user?.id}`} />}
      {isShown && (
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
            <p>Role: {message.user?.role}</p>
            <p>Status: {message.user?.online ? 'online' : 'offline'}</p>
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
