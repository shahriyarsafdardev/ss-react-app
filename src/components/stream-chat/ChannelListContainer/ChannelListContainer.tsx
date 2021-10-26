import { useEffect, useState } from 'react';
import { ChannelList, ChannelListProps, useChatContext } from 'stream-chat-react';
import { useLocation } from 'react-router-dom';

import './ChannelListContainer.css';

import type { ChannelFilters } from 'stream-chat';

import { ChannelSearch } from '../ChannelSearch/ChannelSearch';
import { TeamChannelList } from '../TeamChannelList/TeamChannelList';
import { TeamChannelPreview } from '../TeamChannelPreview/TeamChannelPreview';

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

type Props = Omit<ChannelListProps, 'filters'> & {
  setCreateType: React.Dispatch<React.SetStateAction<string>>;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  filters: ChannelFilters[];
  cohortID: string;
  loggedinUserID: string;
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
    <p className="channel-list__header__text">Scholarsite</p>
  </div>
);

export const ChannelListContainer: React.FC<Props> = (props) => {
  const {
    filters,
    options,
    setCreateType,
    setIsCreating,
    setIsEditing,
    cohortID,
    cohortUsers,
    sort,
    loggedinUserID
  } = props;

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

  useEffect(() => {
    const initChannel = async () => {
      if (url.get('direct') && url.get('receiver_id')) {
        try {
          console.log('team', cohortID);
          const newChannel = await client.channel('messaging', '', {
            name: '',
            members: selectedUsers,
            team: cohortID
          });
          await newChannel.create();
          await newChannel.watch();
          setActiveChannel(newChannel);
        } catch (err) {
          console.log(err);
        }
      } else if (url.get('channel_id')) {
        try {
          const channels = await client.queryChannels({ id: url.get('channel_id') }, {});
          await channels[0].watch();
          setActiveChannel(channels[0]);
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

  return (
    <div className="channel-list__container">
      {/* <SideBar /> */}
      <div className="channel-list__list__wrapper">
        {/* <CompanyHeader /> */}
        {/* <ChannelSearch {...{ cohortID, cohortUsers }} /> */}
        <ChannelList
          channelRenderFilterFn={(channels) =>
            channels.filter((channel) => channel.type === 'team' && channel.data?.team === cohortID)
          }
          filters={filters[0]}
          options={options}
          sort={sort}
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
};
