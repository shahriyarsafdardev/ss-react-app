import { useEffect, useState } from 'react';
// material
import { Container, Grid, Skeleton, Tabs, Tab, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getUsers } from '../../../redux/slices/user';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Description from '../../../components/cohorts/sessions/Description';
import { getSessions } from '../../../redux/slices/cohort';
// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

export default function SessionsTab() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getSessions('cohort-1'));
  }, [dispatch]);

  const SessionTab = styled(Tab)((props) => ({
    color: '#595853',
    justifyContent: 'space-between',
    width: '20%',
    '.MuiButtonBase-root .Mui-selected': {
      fontWeight: '700'
    }
  }));

  const SessionTabs = styled(Tabs)((props) => ({
    width: '100%',
    backgroundColor: '#F4F6F8',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    justifyContent: 'center',
    '.MuiTabs-flexContainer': {
      justifyContent: 'center'
    },
    button: {
      '&.css-pjf68w-MuiButtonBase-root-MuiTab-root': {
        padding: '15px'
      },
      color: '#6C7885',
      '&.Mui-selected': {
        color: '#212B36'
      }
    }
  }));

  const tabsContent = [
    <Description key="hello" innerContent="Description" />,
    <Description key="hello" innerContent="Summary Notes" />,
    <Description key="hello" innerContent="Slides" />,
    <Description key="hello" innerContent="Survey" />
  ];

  return (
    <Page title="Peers | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Sessions Tab" links={[]} />
        <SessionTabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
          <SessionTab label="Description" />
          <SessionTab label="Summary Notes" />
          <SessionTab label="Slides" />
          <SessionTab label="Survey" />
        </SessionTabs>

        {tabsContent[currentTab]}
      </Container>
    </Page>
  );
}
