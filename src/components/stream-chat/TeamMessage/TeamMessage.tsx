import React from 'react';
import { MessageUIComponentProps, MessageTeam, useMessageContext } from 'stream-chat-react';

import './TeamMessage.css';

type Props = MessageUIComponentProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamMessage: React.FC<Props> = (props) => {
  const { setPinsOpen } = props;
  const cohortID = window.location.pathname.split('/')[2] || '';

  const { handleOpenThread, message } = useMessageContext();

  const handleOpenThreadOverride = (event: React.BaseSyntheticEvent) => {
    if (setPinsOpen) setPinsOpen(false);
    handleOpenThread(event);
  };

  const handleUserClick = () => {
    window.location.href = `/cohorts/${cohortID}/peers?user_id=${message.user?.id}`;
  };

  const onUserHover = (event: React.BaseSyntheticEvent) => {
    event.target.style.cursor = 'pointer';
  };

  return (
    <div className={message.pinned ? 'pinned-message' : 'unpinned-message'}>
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
