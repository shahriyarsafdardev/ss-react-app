import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Container } from '@material-ui/core';
import useSettings from 'hooks/useSettings';
import { getCohortResources } from 'redux/slices/cohort';
import { RootState, useDispatch, useSelector } from 'redux/store';

import LoadingScreen from 'components/LoadingScreen';
import ResourceFilter from './ResourceFilter';
import ResourcesSection from './ResourcesSection';
import { LoadingContainer } from '../code/CodeTab';

export default function ResourcesPage() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { resources, resources_types } = cohort || [];

  useEffect(() => {
    if (cohort && (!resources || !resources_types)) {
      dispatch(getCohortResources(cohort_id));
    }
  }, [cohort]);

  if (resources === undefined || resources?.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | Resources">
      <Container sx={{ px: '50px !important' }} maxWidth={themeStretch ? false : 'xl'}>
        <ResourceFilter types={resources_types} isSearch={isSearch} setIsSearch={setIsSearch} />
        {!isSearch && (
          <>
            {resources?.map((resource, index) => (
              <ResourcesSection key={index} resourceData={resource} />
            ))}
          </>
        )}
      </Container>
    </Page>
  );
}
