import { Button, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import { memo } from 'react';
import { TOPICS, CurriculumTab, CurriculumTabsNavBar, useStyles } from './Common';

function CurriculumTabs({
  currentTab,
  setActiveTab
}: {
  currentTab: number;
  setActiveTab: Function;
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return isDesktop ? (
    <CurriculumTabsNavBar value={currentTab} onChange={(e, value) => setActiveTab(value)}>
      <CurriculumTab label={TOPICS[0]} onClick={() => setActiveTab(0)} />
      <CurriculumTab label={TOPICS[1]} onClick={() => setActiveTab(1)} />
      <CurriculumTab label={TOPICS[2]} onClick={() => setActiveTab(2)} />
      <CurriculumTab label={TOPICS[3]} onClick={() => setActiveTab(3)} />
    </CurriculumTabsNavBar>
  ) : (
    <Stack spacing={1} marginBottom="20px" alignItems="center">
      <Button
        variant={currentTab === 0 ? 'contained' : 'outlined'}
        onClick={() => setActiveTab(0)}
        className={classes.topicButton}
      >
        DATA ANALYSIS & EXPERIMENTATION
      </Button>
      <Button
        variant={currentTab === 1 ? 'contained' : 'outlined'}
        onClick={() => setActiveTab(1)}
        className={classes.topicButton}
      >
        ML SYSTEMS
      </Button>
      <Button
        variant={currentTab === 2 ? 'contained' : 'outlined'}
        onClick={() => setActiveTab(2)}
        className={classes.topicButton}
      >
        DATA INFRASTRUCTURE
      </Button>
      <Button
        variant={currentTab === 3 ? 'contained' : 'outlined'}
        onClick={() => setActiveTab(3)}
        className={classes.topicButton}
      >
        DATA ESSENTIALS
      </Button>
    </Stack>
  );
}

export default memo(CurriculumTabs);
