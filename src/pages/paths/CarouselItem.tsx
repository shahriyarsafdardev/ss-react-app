import { Avatar, Stack, Typography, Box } from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import checkmarkCircle2Outline from '@iconify/icons-eva/checkmark-circle-2-outline';
import { memo } from 'react';
import { useStyles } from './Common';

function CarouselItem({
  course,
  index,
  setNextActive
}: {
  course: any;
  index: number;
  setNextActive: Function;
}) {
  const classes = useStyles();

  return (
    <Stack
      sx={{ mx: 2, height: '320px', alignItems: 'center', justifyContent: 'center' }}
      onClick={() => setNextActive(index)}
    >
      <Stack className={classes.courseTile}>
        <>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4" className={classes.tileHeading}>
              {course.name}
            </Typography>
            <Box width="24px" height="24px">
              {course.is_complete ? (
                <Icon icon={checkmarkCircle2Fill} color="#27ae60" width={24} height={24} />
              ) : (
                <Icon icon={checkmarkCircle2Outline} color="#d9d9d9" width={24} height={24} />
              )}
            </Box>
          </Stack>
          <Stack>
            {course?.preview_instructor_name && (
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Avatar
                  src={course?.preview_instructor_image}
                  alt={course?.preview_instructor_name}
                  className={classes.instructorAvatar}
                />
                <Stack>
                  <Typography className={classes.font15}>
                    Live with {course?.preview_instructor_name || 'the instructor'}
                  </Typography>
                  <Typography className={classes.font13}>
                    {course?.preview_instructor_affiliation}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
          <Stack>
            {course?.preview_instructor_logos && (
              <Box sx={{ borderTop: '1px solid #E6E6E6' }}>
                <img
                  src={course?.preview_instructor_logos}
                  alt="instructor-companies"
                  className={classes.companyLogos}
                />
              </Box>
            )}
            {!course?.preview_instructor_name &&
              !course?.preview_instructor_logos &&
              course?.description && (
                <Typography>
                  {course?.description.substring(0, 160)}
                  {course?.description.length > 160 && '...'}
                </Typography>
              )}
          </Stack>
        </>
      </Stack>
    </Stack>
  );
}

export default memo(CarouselItem);
