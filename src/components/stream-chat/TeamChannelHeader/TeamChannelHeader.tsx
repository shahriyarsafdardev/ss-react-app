import { useState, memo } from 'react';
import {
  Avatar,
  useChannelActionContext,
  useChannelStateContext,
  useChatContext
} from 'stream-chat-react';
import { useSnackbar } from 'notistack5';
import ConfirmationAlert from 'components/ConfirmationAlert';
import useAuth from '../../../hooks/useAuth';
import './TeamChannelHeader.css';

import { ChannelInfo, ChannelDelete, PinIcon } from '../../../assets';

import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType
} from '../../../pages/dashboard/cohorts/messaging/Messaging';

type Props = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setPinsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamChannelHeader: React.FC<Props> = memo((props) => {
  const { setIsEditing, setPinsOpen } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [alertBox, setAlertBox] = useState(false);

  const { client, setActiveChannel } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const { channel, watcher_count } = useChannelStateContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const { closeThread } = useChannelActionContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const teamHeader = `# ${channel?.data?.name || channel?.data?.id || 'random'}`;

  const deleteChannel = async () => {
    try {
      await channel.delete();
      enqueueSnackbar('Channel Deleted', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Action Failed', { variant: 'error' });
    }
  };

  const getDeleteButton = () => {
    if (user?.type === 'admin') {
      return (
        <span
          style={{ display: 'flex', marginLeft: '1rem', cursor: 'pointer' }}
          role="button"
          onKeyPress={() => {}}
          tabIndex={0}
          onClick={() => setAlertBox(true)}
        >
          <ChannelDelete />
        </span>
      );
    }
    return null;
  };
  const getMessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user?.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    if (!members.length) {
      return (
        <div className="team-channel-header__name-wrapper">
          <Avatar image={null} size={32} />
          <p className="team-channel-header__name user">Johnny Blaze</p>
          {getDeleteButton()}
        </div>
      );
    }

    return (
      <div className="team-channel-header__name-wrapper">
        {members.map(({ user }, i) => {
          if (i > 2) return null;
          return (
            <div key={i} className="team-channel-header__name-multi">
              <Avatar image={user?.image} name={user?.name || user?.id} size={32} />
              <p className="team-channel-header__name user">
                {user?.name || user?.id || 'Johnny Blaze'}
              </p>
            </div>
          );
        })}
        {additionalMembers > 0 && (
          <p className="team-channel-header__name user">{`and ${additionalMembers} more`}</p>
        )}
        {getDeleteButton()}
      </div>
    );
  };

  const getWatcherText = (watchers?: number) => {
    if (!watchers) return 'No users online';
    if (watchers === 1) return '1 user online';
    return `${watchers} users online`;
  };

  const getConfirmationBox = (alertContent: string) => (
    <ConfirmationAlert
      open={alertBox}
      title="Alert"
      alertText={alertContent}
      onCancel={() => setAlertBox(false)}
      onConfirm={() => deleteChannel()}
    />
  );

  return (
    <div className="team-channel-header__container">
      {channel.type === 'messaging' ? (
        <>
          {getConfirmationBox('Are you sure you want to delete this chat?')}
          {getMessagingHeader()}
        </>
      ) : (
        <div className="team-channel-header__channel-wrapper">
          {getConfirmationBox('Are you sure you want to delete this channel?')}
          <p className="team-channel-header__name">{teamHeader}</p>
          <span
            style={{ display: 'flex' }}
            role="button"
            onKeyPress={() => {}}
            tabIndex={0}
            onClick={() => setIsEditing(true)}
          >
            <ChannelInfo />
          </span>
          {getDeleteButton()}
        </div>
      )}
      <div className="team-channel-header__right">
        {/* <p className="team-channel-header__right-text">{getWatcherText(watcher_count)}</p> */}
        <div
          className="team-channel-header__right-pin-wrapper"
          onClick={(event) => {
            if (closeThread) closeThread(event);
            setPinsOpen((prevState) => !prevState);
          }}
          role="button"
          onKeyPress={() => {}}
          tabIndex={0}
        >
          <PinIcon />
          <p className="team-channel-header__right-text">Pins</p>
        </div>
      </div>
    </div>
  );
});
