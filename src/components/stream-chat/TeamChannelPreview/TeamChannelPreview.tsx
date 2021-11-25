import { useState, useEffect, useContext } from 'react';
import { Avatar, ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react';

import './TeamChannelPreview.css';

import { AnalyticsContext } from 'contexts/AnalyticsContext';
import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType
} from '../../../pages/dashboard/cohorts/messaging/Messaging';

type Props = ChannelPreviewUIComponentProps & {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
};

export const TeamChannelPreview: React.FC<Props> = (props) => {
  const { channel, setActiveChannel, setIsCreating, setIsEditing, type } = props;
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const { channel: activeChannel, client } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();
  const [unreadCount, setUnread] = useState(channel.countUnread());

  useEffect(() => {
    channel?.on((event) => {
      if (event.total_unread_count !== null) {
        setUnread(channel.countUnread());
      }
    });
  }, []);

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id || 'random'}
      {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user?.id !== client.userID
    );
    const defaultName = 'Johnny Blaze';
    if (!members.length) return null;

    if (members && members.length === 1) {
      const member = members[0];
      return (
        <div className="channel-preview__item single">
          <div className="user-info">
            <Avatar
              image={member.user?.image}
              name={member.user?.name || member.user?.id}
              size={24}
            />

            <span>{member?.user?.name || member?.user?.id || defaultName}</span>
          </div>

          {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}

          {/* <TeamTypingIndicator type="list" /> */}
        </div>
      );
    }

    return (
      <div className="channel-preview__item multi">
        <div className="user-info">
          <span className="first-icon">
            <Avatar
              image={members[0].user?.image}
              name={members[0].user?.name || members[0].user?.id}
              size={18}
            />
          </span>
          <Avatar
            image={members[1].user?.image}
            name={members[1].user?.name || members[1].user?.id}
            size={18}
          />
          <p>
            <span>
              {members[0].user?.name || members[0].user?.id || defaultName},{' '}
              {members[1].user?.name || members[1].user?.id || defaultName}
            </span>
          </p>
        </div>
        {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
      </div>
    );
  };

  return (
    <div
      key={unreadCount}
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        if (setActiveChannel) {
          setActiveChannel(channel);
          if (type === 'team') {
            sendAnalyticsData('Team Channel', 'Channel Opened');
          } else {
            sendAnalyticsData('Direct Chat', 'Chat Opened');
          }
        }
      }}
      role="button"
      onKeyPress={() => {}}
      tabIndex={0}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};
