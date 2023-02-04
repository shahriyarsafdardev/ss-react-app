import { Button, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import { memo } from 'react';
import { trackEvent } from 'utils/eventTracking';
import { TOPICS, CurriculumTab, CurriculumTabsNavBar, useStyles } from './Common';

function CoursesTabs({ currentTab, setActiveTab }: { currentTab: number; setActiveTab: Function }) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleTabEvent = (value: string) => {
    trackEvent(null, 'All Courses Page - Tab selected', {
      'Tab Name': value
    });
  };

  return isDesktop ? (
    <CurriculumTabsNavBar value={currentTab} onChange={(e, value) => setActiveTab(value)}>
      <CurriculumTab
        label={TOPICS[0]}
        onClick={() => {
          setActiveTab(0);
          handleTabEvent(TOPICS[0]);
        }}
      />
      <CurriculumTab
        label={TOPICS[1]}
        onClick={() => {
          setActiveTab(1);
          handleTabEvent(TOPICS[1]);
        }}
      />
      <CurriculumTab
        label={TOPICS[2]}
        onClick={() => {
          setActiveTab(2);
          handleTabEvent(TOPICS[2]);
        }}
      />
      <CurriculumTab
        label={TOPICS[3]}
        onClick={() => {
          setActiveTab(3);
          handleTabEvent(TOPICS[3]);
        }}
      />
    </CurriculumTabsNavBar>
  ) : (
    <Stack spacing={1} marginBottom="20px" alignItems="center">
      <Button
        variant={currentTab === 0 ? 'contained' : 'outlined'}
        onClick={() => {
          setActiveTab(0);
          handleTabEvent(TOPICS[0]);
        }}
        className={classes.topicButton}
      >
        DATA ANALYSIS & EXPERIMENTATION
      </Button>
      <Button
        variant={currentTab === 1 ? 'contained' : 'outlined'}
        onClick={() => {
          setActiveTab(1);
          handleTabEvent(TOPICS[1]);
        }}
        className={classes.topicButton}
      >
        ML SYSTEMS
      </Button>
      <Button
        variant={currentTab === 2 ? 'contained' : 'outlined'}
        onClick={() => {
          setActiveTab(2);
          handleTabEvent(TOPICS[2]);
        }}
        className={classes.topicButton}
      >
        DATA INFRASTRUCTURE
      </Button>
      <Button
        variant={currentTab === 3 ? 'contained' : 'outlined'}
        onClick={() => {
          setActiveTab(3);
          handleTabEvent(TOPICS[3]);
        }}
        className={classes.topicButton}
      >
        DATA ESSENTIALS
      </Button>
    </Stack>
  );
}

export default memo(CoursesTabs);
