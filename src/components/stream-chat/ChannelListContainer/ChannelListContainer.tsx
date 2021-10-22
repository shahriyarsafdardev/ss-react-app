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
    sort
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
    client.userID || '',
    url.get('receiver_id') || ''
  ]);

  useEffect(() => {
    const initChannel = async () => {
      if (url.get('direct') && url.get('receiver_id')) {
        try {
          const newChannel = await client.channel('messaging', '', {
            name: '',
            members: selectedUsers,
            team: cohortID
          });
          console.log('channel set');
          await newChannel.watch();
          setActiveChannel(newChannel);
        } catch (err) {
          console.log(err);
        }
      }
    };
    initChannel();
  }, []);

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
              (channel) => channel.type === 'messaging' && channel.data?.team === cohortID
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
