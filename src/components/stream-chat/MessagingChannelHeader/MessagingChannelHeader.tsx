import React, { useEffect, useRef, useState } from 'react';
import { Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';
import './MessagingChannelHeader.css';
import type { ChannelMemberResponse } from 'stream-chat';
import avatar from '../../../assets/scholarsite.png';
import { TypingIndicator } from '../TypingIndicator/TypingIndicator';
import { ChannelInfoIcon, ChannelSaveIcon, HamburgerIcon } from '../../../assets';

import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType
} from '../../../pages/Chatting';

type Props = {
  theme: string;
  toggleMobile: () => void;
};

const MessagingChannelHeader: React.FC<Props> = (props) => {
  const { theme, toggleMobile } = props;

  const { client } = useChatContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  const { channel } = useChannelStateContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  const [channelName, setChannelName] = useState(channel.data?.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const members = Object.values(channel.state.members || {}).filter(
    (member) => member.user?.id !== client?.user?.id
  );

  const updateChannel = async () => {
    if (channelName && channelName !== channel.data?.name) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (!channelName) {
      setTitle(
        members.map((member) => member.user?.name || member.user?.id || 'Unnamed User').join(', ')
      );
    }
  }, [channelName, members]);

  const AvatarGroup = ({ members }: { members: any }) => {
    if (members.length === 1) {
      return (
        <div className="messaging__channel-header__avatars">
          <Avatar image={members[0].user?.image} size={40} />;
        </div>
      );
    }

    if (members.length === 2) {
      return (
        <div className="messaging__channel-header__avatars two">
          <span>
            <Avatar image={members[0].user?.image} shape="square" size={40} />
          </span>
          <span>
            <Avatar image={members[1].user?.image} shape="square" size={40} />
          </span>
        </div>
      );
    }

    if (members.length === 3) {
      return (
        <div className="messaging__channel-header__avatars three">
          <span>
            <Avatar image={members[0].user?.image} shape="square" size={40} />
          </span>
          <span>
            <Avatar image={members[1].user?.image} shape="square" size={20} />
            <Avatar image={members[2].user?.image} shape="square" size={20} />
          </span>
        </div>
      );
    }

    if (members.length >= 4) {
      return (
        <div className="messaging__channel-header__avatars four">
          <span>
            <Avatar image={members[members.length - 1].user?.image} shape="square" size={20} />
            <Avatar image={members[members.length - 2].user?.image} shape="square" size={20} />
          </span>
          <span>
            <Avatar image={members[members.length - 3].user?.image} shape="square" size={20} />
            <Avatar image={members[members.length - 4].user?.image} shape="square" size={20} />
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="messaging__channel-header">
      <div
        id="mobile-nav-icon"
        className={`${theme}`}
        onKeyPress={() => {}}
        onClick={() => toggleMobile()}
        tabIndex={0}
        role="button"
      >
        <HamburgerIcon />
      </div>
      <AvatarGroup members={members} />
      {!isEditing ? (
        <div className="channel-header__name">{channelName || title}</div>
      ) : (
        <input
          type="text"
          className="channel-header__edit-input"
          onChange={(event) => setChannelName(event.target.value)}
          placeholder="Type a new name for the chat"
          value={channelName}
        />
      )}
      <div className="messaging__channel-header__right">
        <TypingIndicator />
        {!isEditing ? (
          <ChannelInfoIcon {...{ isEditing, setIsEditing }} />
        ) : (
          !loading && <ChannelSaveIcon updateChannel={updateChannel} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
};

export default React.memo(MessagingChannelHeader);
