import { styled } from '@material-ui/core/styles';
import React from 'react';

const VideoContainer = styled('div')((props) => ({
  marginBottom: '3rem',

  video: {
    width: '100%',
    borderRadius: '25px'
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
        <video src={video_url} preload="auto" controls autoPlay={false} />
      )}
    </VideoContainer>
  );
}
