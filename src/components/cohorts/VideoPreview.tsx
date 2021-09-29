import { styled } from '@material-ui/core/styles';
import React from 'react';

const VideoContainer = styled('div')(({ theme }) => ({
  marginBottom: '3rem',

  video: {
    width: '600px',
    height: '338px',
    borderRadius: '25px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto'
    }
  }
}));

export default function VideoPreview({
  className,
  video_url
}: {
  className?: string;
  video_url?: string;
}) {
  return (
    <VideoContainer className={className}>
      {video_url && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={video_url} preload="auto" controls controlsList="nodownload" autoPlay={false} />
      )}
    </VideoContainer>
  );
}
