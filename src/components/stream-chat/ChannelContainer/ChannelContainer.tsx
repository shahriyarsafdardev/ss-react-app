/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext, useEffect } from 'react';
import { Channel, useChatContext, ThreadHeaderProps } from 'stream-chat-react';
import { Navigate } from 'react-router-dom';
import axios from 'utils/axios';
import './ChannelContainer.css';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { getChannelName } from '../TeamChannelPreview/TeamChannelPreview';

import { ChannelInner } from './ChannelInner';
import { ChannelEmptyState } from '../ChannelEmptyState/ChannelEmptyState';
import { CreateChannel } from '../CreateChannel/CreateChannel';
import { EditChannel } from '../EditChannel/EditChannel';
import { TeamMessage } from '../TeamMessage/TeamMessage';
import { TeamMessageInput } from '../TeamMessageInput/TeamMessageInput';

import { CloseThreadIcon } from '../../../assets';

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
  createType: string;
  isCreating: boolean;
  isEditing?: boolean;
  cohortID: string;
  cohortUsers: any;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

type HeaderProps = ThreadHeaderProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThreadHeader: React.FC<HeaderProps> = (props) => {
  const { closeThread, setPinsOpen, thread } = props;
  const theme = useTheme();
  const isNarrowView = useMediaQuery(theme.breakpoints.down(960));
  const { channel } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const getReplyCount = () => {
    if (!thread?.reply_count) return '';
    if (thread.reply_count === 1) return '1 Reply';
    return `${thread.reply_count} Replies`;
  };

  return (
    <div className="custom-thread-header">
      <div className="custom-thread-header__left">
        {!isNarrowView ? (
          <>
            <p className="custom-thread-header__left-title">Thread</p>
            <p className="custom-thread-header__left-count">{getReplyCount()}</p>
            <CloseThreadIcon {...{ closeThread, setPinsOpen }} />
          </>
        ) : (
          <Box
            onClick={(event: any) => closeThread(event)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <span style={{ fontWeight: 600, fontSize: '16px', marginRight: '5px' }}>{'<'}</span>
            <span style={{ textDecoration: 'underline', fontWeight: 600, fontSize: '16px' }}>
              Back to #{channel?.data?.name}
            </span>
          </Box>
        )}
      </div>
    </div>
  );
};

export const ChannelContainer: React.FC<Props> = (props) => {
  const { createType, isCreating, isEditing, setIsCreating, setIsEditing, cohortID, cohortUsers } =
    props;

  const { channel, client } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const [pinsOpen, setPinsOpen] = useState(false);
  const [navigate, setNavigate] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const validEvent = (event: string, userID: string | undefined) =>
    ['reaction.new', 'message.new'].includes(event) && userID === client.userID;

  const sendAnalytics = (event: any) => {
    if (validEvent(event.type, event?.user?.id) && channel && client) {
      const name =
        event.channel_type === 'team'
          ? `#${channel.data?.name}`
          : getChannelName(
              Object.values(channel?.state?.members).filter(
                ({ user }) => user?.id !== client?.userID
              )
            );
      const eventData = {
        'Channel Name': name,
        'Message Content': event.message.text,
        'Channel Type': event.channel_type === 'team' ? 'public' : 'private'
      };
      if (event.type === 'message.new') {
        sendAnalyticsData('Messaging Page - Message Sent', eventData);
      } else if (event.type === 'reaction.new') {
        sendAnalyticsData('Messaging Page - Reaction Added', {
          ...eventData,
          'Message Sender': event.message.user.name
        });
      }
    }
  };

  useEffect(() => {
    if (channel && client) {
      channel.on('reaction.new', sendAnalytics);
      channel.on('message.new', sendAnalytics);
    }
    return () => {
      channel?.off('reaction.new', sendAnalytics);
      channel?.off('message.new', sendAnalytics);
    };
  }, [channel]);

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel {...{ createType, cohortID, cohortUsers, setIsCreating }} />
      </div>
    );
  }

  // const addNotification = (message: any) => {
  //   if (channel) {
  //     axios.post(`/notifications.json`, {
  //       message: message.text,
  //       channel_id: channel?.id,
  //       channel_type: channel?.type === 'team' ? 'Team' : 'Direct',
  //       channel_name: channel?.data?.name,
  //       cohort_id: cohortID,
  //       receivers: Object.keys(channel.state.members)
  //     });
  //   }
  // };

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
        Message={(messageProps) => <TeamMessage {...messageProps} {...{ setPinsOpen }} />}
        ThreadHeader={(threadProps) => <ThreadHeader {...threadProps} {...{ setPinsOpen }} />}
        TypingIndicator={() => null}
      >
        <ChannelInner
          {...{
            type: channel?.type,
            pinsOpen,
            setIsEditing,
            setPinsOpen
          }}
        />
      </Channel>
    </div>
  );
};
