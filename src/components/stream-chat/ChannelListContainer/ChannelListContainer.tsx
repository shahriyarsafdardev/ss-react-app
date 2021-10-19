import { ChannelList, ChannelListProps } from 'stream-chat-react';

import './ChannelListContainer.css';

import type { ChannelFilters } from 'stream-chat';

import { ChannelSearch } from '../ChannelSearch/ChannelSearch';
import { TeamChannelList } from '../TeamChannelList/TeamChannelList';
import { TeamChannelPreview } from '../TeamChannelPreview/TeamChannelPreview';

import { SideBarLogo } from '../../../assets';

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

  return (
    <div className="channel-list__container">
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch {...{ cohortID, cohortUsers }} />
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
