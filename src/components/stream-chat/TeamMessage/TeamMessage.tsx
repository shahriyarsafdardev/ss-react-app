import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { MessageUIComponentProps, MessageTeam, useMessageContext } from 'stream-chat-react';

import './TeamMessage.css';

type Props = MessageUIComponentProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamMessage: React.FC<Props> = (props) => {
  const { setPinsOpen } = props;
  const cohortID = window.location.pathname.split('/')[2] || '';
  const [navigate, setNavigate] = useState<boolean>(false);
  const refContainer = useRef<any>();

  const { handleOpenThread, message } = useMessageContext();

  useEffect(() => {
    const parentComponent = refContainer?.current?.children[0]?.children[1]?.children;
    if (parentComponent && parentComponent?.length > 0) {
      const previewComponent =
        parentComponent[parentComponent.length - 1]?.children[0]?.children[0];
      const imageComponent = previewComponent?.children[0];
      if (previewComponent && imageComponent && imageComponent.nodeName === 'IMG') {
        imageComponent.addEventListener(
          'error',
          (event: any) => {
            previewComponent.style.display = 'none';
            event.target.onerror = null;
            event.target.style.display = 'none';
            event.target.src = '';
          },
          false
        );
      }
    }
  }, [message]);

  const handleOpenThreadOverride = (event: React.BaseSyntheticEvent) => {
    if (setPinsOpen) setPinsOpen(false);
    handleOpenThread(event);
  };

  const handleUserClick = () => {
    setNavigate(true);
  };

  const onUserHover = (event: React.BaseSyntheticEvent) => {
    event.target.style.cursor = 'pointer';
  };

  return (
    <div ref={refContainer} className={message.pinned ? 'pinned-message' : 'unpinned-message'}>
      {navigate && <Navigate to={`/cohorts/${cohortID}/peers?user_id=${message.user?.id}`} />}
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
