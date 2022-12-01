import react from 'react';
import Page from 'components/Page';
import { Stack } from '@material-ui/core';
import TrackHeader from './TrackHeader';

export default function DataScienceTrack() {
  return (
    <Page title="Sphere | Courses Track">
      <Stack px="50px">
        <TrackHeader />
      </Stack>
    </Page>
  );
}
