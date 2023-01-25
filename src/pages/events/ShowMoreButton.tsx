import { memo } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';

function ShowMoreButton({
  more,
  showMore,
  remainingEvents
}: {
  more: boolean;
  showMore: Function;
  remainingEvents: number;
}) {
  return (
    <>
      {remainingEvents > 0 && (
        <Button
          sx={{
            width: { xs: '100%', md: '200px' },
            mt: '40px',
            mx: 'auto',
            fontSize: '14px !important'
          }}
          variant="text"
          onClick={() => showMore(!more)}
        >
          {more ? (
            <>
              <Typography sx={{ fontSize: '14px' }}>Show Less</Typography>
              <Icon
                style={{ marginLeft: '5px' }}
                key={String(more)}
                icon={arrowIosUpwardFill}
                width={20}
                height={20}
              />
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: '14px' }}>Show {remainingEvents} More</Typography>
              <Icon
                style={{ marginLeft: '5px' }}
                key={String(more)}
                icon={arrowIosDownwardFill}
                width={20}
                height={20}
              />
            </>
          )}
        </Button>
      )}
    </>
  );
}

export default memo(ShowMoreButton);
