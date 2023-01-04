import { Box, Button } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ContentRow, MainHeading, SubHeading } from './Common';

function MLSCodeRow({ data }: { data: any }) {
  return (
    <ContentRow>
      <Box style={{ height: '53px', width: '53px' }}>
        <LazyLoadImage src={data.imgURL} alt="session-logo" height="100%" width="100%" />
      </Box>
      <Box style={{ width: '90%' }}>
        <SubHeading>{data.subHeading}</SubHeading>
        <MainHeading>{data.mainHeading}</MainHeading>
      </Box>
      <Button
        variant="contained"
        color="primary"
        href={data.buttonLink}
        target="_blank"
        style={{ borderRadius: '1000px', padding: '9px 60px' }}
      >
        Open
      </Button>
    </ContentRow>
  );
}

export default MLSCodeRow;
