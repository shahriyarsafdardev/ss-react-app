import { useState } from 'react';
import { Channel, ThreadHeaderProps } from 'stream-chat-react';
import { Navigate } from 'react-router-dom';

import './ChannelContainer.css';

import { ChannelInner } from './ChannelInner';
import { ChannelEmptyState } from '../ChannelEmptyState/ChannelEmptyState';
import { CreateChannel } from '../CreateChannel/CreateChannel';
import { EditChannel } from '../EditChannel/EditChannel';
import { TeamMessage } from '../TeamMessage/TeamMessage';
import { TeamMessageInput } from '../TeamMessageInput/TeamMessageInput';

import { CloseThreadIcon } from '../../../assets';
import { StudentProfile } from '../../../@types/cohorts';

type Props = {
  createType: string;
  isCreating: boolean;
  isEditing?: boolean;
  cohortID: string;
  cohortUsers: any;
  peers: StudentProfile[];
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

type HeaderProps = ThreadHeaderProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThreadHeader: React.FC<HeaderProps> = (props) => {
  const { closeThread, setPinsOpen, thread } = props;

  const getReplyCount = () => {
    if (!thread?.reply_count) return '';
    if (thread.reply_count === 1) return '1 reply';
    return `${thread.reply_count} Replies`;
  };

  return (
    <div className="custom-thread-header">
      <div className="custom-thread-header__left">
        <p className="custom-thread-header__left-title">Thread</p>
        <p className="custom-thread-header__left-count">{getReplyCount()}</p>
      </div>
      <CloseThreadIcon {...{ closeThread, setPinsOpen }} />
    </div>
  );
};

export const ChannelContainer: React.FC<Props> = (props) => {
  const {
    createType,
    isCreating,
    isEditing,
    setIsCreating,
    setIsEditing,
    cohortID,
    cohortUsers,
    peers
  } = props;

  const [pinsOpen, setPinsOpen] = useState(false);
  const [navigate, setNavigate] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel {...{ createType, cohortID, cohortUsers, setIsCreating }} />
      </div>
    );
  }

  const onMentionsClick = (event: React.BaseSyntheticEvent, user: any) => {
    if (user?.id) {
      setPath(`/cohorts/${cohortID}/peers?user_id=${user?.id}`);
      setNavigate(true);
    }
  };

  const onMentionsHover = (event: React.BaseSyntheticEvent) => {
    event.target.style.cursor = 'pointer';
  };

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel {...{ cohortUsers, setIsEditing }} />
      </div>
    );
  }

  return (
    <div className="channel__container">
      {navigate && <Navigate to={path} />}
      <Channel
        onMentionsClick={onMentionsClick}
        onMentionsHover={onMentionsHover}
        EmptyStateIndicator={ChannelEmptyState}
        HeaderComponent={ChannelEmptyState}
        Input={TeamMessageInput}
        Message={(messageProps) => <TeamMessage {...messageProps} {...{ setPinsOpen, peers }} />}
        ThreadHeader={(threadProps) => <ThreadHeader {...threadProps} {...{ setPinsOpen }} />}
        TypingIndicator={() => null}
      >
        <ChannelInner
          {...{
            pinsOpen,
            setIsEditing,
            setPinsOpen
          }}
        />
      </Channel>
    </div>
  );
};
