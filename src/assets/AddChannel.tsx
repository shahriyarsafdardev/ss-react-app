import { memo } from 'react';
import type { TeamChannelListProps } from '../components/stream-chat/TeamChannelList/TeamChannelList';

export const AddChannel = memo(
  (
    props: Pick<TeamChannelListProps, 'setCreateType' | 'setIsCreating' | 'setIsEditing' | 'type'>
  ) => {
    const { setCreateType, setIsCreating, setIsEditing, type } = props;

    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          setCreateType(type);
          setIsCreating((prevState) => !prevState);
          setIsEditing(false);
        }}
      >
        <rect width="24" height="24" rx="2" fill="#12125C" fillOpacity="0.1" />
        <path
          d="M12.5775 7V17"
          stroke="#12125C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.50708 12H17.6479"
          stroke="#12125C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);
