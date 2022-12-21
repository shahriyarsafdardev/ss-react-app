import { useContext, useEffect, useState, memo } from 'react';
import { ChannelList, ChannelListProps, useChatContext } from 'stream-chat-react';
import { useLocation } from 'react-router-dom';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import './ChannelListContainer.css';
import type { ChannelFilters } from 'stream-chat';
import { TeamChannelList } from '../TeamChannelList/TeamChannelList';
import { TeamChannelPreview, getChannelName } from '../TeamChannelPreview/TeamChannelPreview';

import { SideBarLogo } from '../../../assets';
import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType
} from '../../../pages/dashboard/cohorts/messaging/Messaging';
import useAuth from '../../../hooks/useAuth';

type Props = Omit<ChannelListProps, 'filters'> & {
  setCreateType: React.Dispatch<React.SetStateAction<string>>;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  cohortID: string;
  loggedinUserID: string;
  canTrack: boolean;
  cohortUsers: any;
};

const SideBar = () => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <SideBarLogo />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Sphere</p>
  </div>
);

export const ChannelListContainer: React.FC<Props> = memo((props) => {
  const {
    options,
    setCreateType,
    setIsCreating,
    setIsEditing,
    cohortID,
    cohortUsers,
    sort,
    loggedinUserID,
    canTrack
  } = props;
  const { user } = useAuth();

  const filters: ChannelFilters[] = [
    { type: 'team', members: { $in: [user?.stream_id] }, team: cohortID },
    { type: 'messaging', members: { $in: [user?.stream_id] }, team: cohortID }
  ];

  const url = new URLSearchParams(useLocation().search);
  const { client, setActiveChannel } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();
  const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>([
    loggedinUserID || client.userID || '',
    url.get('receiver_id') || ''
  ]);

  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const sendAnalytics = (channel: any) => {
    if (channel && client && canTrack) {
      const members = Object.values(channel?.state?.members).filter(
        (m: any) => m?.user?.id !== client?.userID
      );
      const type = channel.data?.type === 'team' ? 'public' : 'private';
      const name = type === 'public' ? `#${channel.data?.name}` : getChannelName(members);

      sendAnalyticsData('Messaging Page - Channel Opened', {
        'Channel Name': name,
        'Channel Type': type
      });
    }
  };

  useEffect(() => {
    const initChannel = async () => {
      if (url.get('direct') && url.get('receiver_id')) {
        try {
          const newChannel = await client.channel('messaging', '', {
            name: '',
            members: selectedUsers,
            team: cohortID
          });
          await newChannel.create();
          await newChannel.watch();
          setActiveChannel(newChannel);
          sendAnalytics(newChannel);
        } catch (err) {
          console.log(err);
        }
      } else if (url.get('channel_id')) {
        try {
          const channels = await client.queryChannels({ id: url.get('channel_id') }, {});
          await channels[0]?.watch();
          setActiveChannel(channels[0]);
          channels[0] && sendAnalytics(channels[0]);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const channels = await client.queryChannels({ name: 'introductions', ...filters[0] }, {});
          if (channels.length > 0) {
            await channels[0].watch();
            setActiveChannel(channels[0]);
            channels[0] && sendAnalytics(channels[0]);
          } else {
            const channels = await client.queryChannels(filters[0], {});
            await channels[0]?.watch();
            setActiveChannel(channels[0]);
            channels[0] && sendAnalytics(channels[0]);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    initChannel();
  }, [url.get('channel_id'), url.get('message'), url.get('receiver_id')]);

  const duplicateChat = (channel: any) => {
    if (channel?.data?.member_count === 2) {
      const userIDs = Object.values(channel.state.members).map((member: any) => member?.user_id);
      return cohortUsers.includes(userIDs[0]) || cohortUsers.includes(userIDs[1]);
    }
    return false;
  };

  const order = [
    'session-discussion',
    'general',
    'introductions',
    'resources-and-reads',
    'group-1',
    'group-2',
    'group-3',
    'group-4',
    'group-5',
    'group-6',
    'group-7',
    'group-8',
    'group-9',
    'group-10',
    'group-11',
    'group-12',
    'group-13',
    'group-14',
    'group-15',
    'group-16',
    'group-17',
    'group-18',
    'group-19',
    'group-20'
  ];

  const compareChannels = (a?: string, b?: string) => {
    const indexA = order.findIndex((group) => group === a);
    const indexB = order.findIndex((group) => group === b);
    if (indexA === -1 && indexB === -1) {
      return 0;
    }
    if (indexA === -1) {
      return 1;
    }
    if (indexB === -1) {
      return -1;
    }
    if (indexA < indexB) {
      return -1;
    }
    return 1;
  };

  return (
    <div className="channel-list__container">
      {/* <SideBar /> */}
      <div className="channel-list__list__wrapper">
        {/* <CompanyHeader /> */}
        {/* <ChannelSearch {...{ cohortID, cohortUsers }} /> */}
        <ChannelList
          channelRenderFilterFn={(channels) =>
            channels
              .filter((channel) => channel.type === 'team' && channel.data?.team === cohortID)
              .sort((a, b) => compareChannels(a.data?.name, b.data?.name))
          }
          filters={filters[0]}
          options={options}
          sort={sort}
          lockChannelOrder={true}
          setActiveChannelOnMount={false}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              {...{ setCreateType, setIsCreating, setIsEditing }}
              type="team"
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              {...{ setIsCreating, setIsEditing }}
              type="team"
            />
          )}
        />
        <ChannelList
          channelRenderFilterFn={(channels) =>
            channels.filter(
              (channel) =>
                channel.type === 'messaging' &&
                (channel.data?.team === cohortID || duplicateChat(channel))
            )
          }
          filters={filters[1]}
          options={options}
          setActiveChannelOnMount={false}
          sort={sort}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              {...{ setCreateType, setIsCreating, setIsEditing }}
              type="messaging"
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              {...{ setIsCreating, setIsEditing }}
              type="messaging"
            />
          )}
        />
      </div>
    </div>
  );
});
