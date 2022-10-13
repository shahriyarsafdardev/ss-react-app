import { Box, Button } from '@material-ui/core';
import { ContentRow, MainHeading, SubHeading } from './Common';

function MLSCodeRow({ data }: { data: any }) {
  console.log(data);
  return (
    <ContentRow>
      <Box style={{ height: '53px', width: '53px' }}>
        <img src={data.imgURL} alt="session-logo" height="100%" width="100%" />
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
