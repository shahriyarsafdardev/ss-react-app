import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Container } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useSettings from 'hooks/useSettings';
import { getCohortResources } from 'redux/slices/cohort';
import { RootState, useDispatch, useSelector } from 'redux/store';

import LoadingScreen from 'components/LoadingScreen';
import { ResourceContext } from 'contexts/ResourceContext';
import ResourceFilter from './ResourceFilter';
import ResourcesSection from './ResourcesSection';
import { LoadingContainer } from '../code/CodeTab';
import ResourceViewer from './ResourceViewer';

export default function ResourcesPage() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { resources, resources_types } = cohort || [];
  const [selectedResource, setSelectedResource] = useState<any>({});

  const clearData = () => {
    setIsSearch(false);
  };

  const sendAnalyticsData = (eventName: string, eventData: any) => {
    cohort && trackEvent(cohort, eventName, eventData);
  };

  useEffect(() => {
    if (cohort && (!resources || !resources_types)) {
      dispatch(getCohortResources(cohort_id));
    }
    return () => {
      clearData();
    };
  }, [cohort?.id]);

  if (resources === undefined || resources?.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | Resources">
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        <ResourceContext.Provider value={{ setSelectedResource }}>
          {selectedResource?.name ? (
            <ResourceViewer resource={selectedResource} setIsSearch={setIsSearch} />
          ) : (
            <Container
              sx={{ px: '50px !important' }}
              key={cohort_id}
              maxWidth={themeStretch ? false : 'xl'}
            >
              <ResourceFilter
                types={resources_types}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
              />
              {!isSearch && (
                <>
                  {resources?.map((resource, index) => (
                    <ResourcesSection key={index} resourceData={resource} />
                  ))}
                </>
              )}
            </Container>
          )}
        </ResourceContext.Provider>
      </AnalyticsContext.Provider>
    </Page>
  );
}
