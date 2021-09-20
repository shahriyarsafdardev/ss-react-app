import { styled } from '@material-ui/core/styles';

const VideoContainer = styled('div')((props) => ({
  marginBottom: '3rem',

  video: {
    width: '90%',
    borderRadius: '25px'
  }
}));

export default function VideoPreview() {
  const video_source = 'https://media.w3.org/2010/05/bunny/movie.mp4';

  return (
    <VideoContainer>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src="http://media.w3.org/2010/05/bunny/movie.mp4"
        preload="auto"
        controls
        autoPlay={false}
      />
    </VideoContainer>
  );
}
