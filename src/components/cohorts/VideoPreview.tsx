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
  const default_video_source = 'https://media.w3.org/2010/05/bunny/movie.mp4';

  return (
    <VideoContainer className={className}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={video_url || default_video_source} preload="auto" controls autoPlay={false} />
    </VideoContainer>
  );
}
