import { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Container, Typography, Stack, Link } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useSettings from 'hooks/useSettings';

import LoadingScreen from 'components/LoadingScreen';
import axios from 'utils/axios';
import { SessionResource, Cohort } from '../../../../@types/cohorts';
import ResourceFilter from './ResourceFilter';
import ResourcesSection from './ResourcesSection';
import { LoadingContainer } from '../code/CodeTab';

export default function PublicResources() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const { themeStretch } = useSettings();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [cohort, setCohort] = useState<Cohort>();
  const [resources, setResources] = useState<SessionResource[]>([]);
  const [resources_types, setResourcesTypes] = useState<String[]>([]);

  const clearData = () => {
    setIsSearch(false);
  };

  const sendAnalyticsData = (eventName: string, eventData: any) => {
    cohort && trackEvent(cohort, eventName, eventData);
  };

  const handleShowMore = async (sessionID: string) => {
    await axios
      .get(`/cohorts/${cohort_id}/resources/see_more.json?cohort_session_id=${sessionID}`)
      .then((res) => {
        const updated = resources;
        const targetResourceIndex = updated.findIndex(
          (resource) => resource.session_id === sessionID
        );

        if (targetResourceIndex !== -1) {
          updated[targetResourceIndex].materials = res.data.materials;
          setResources(updated);
        }
      });
  };

  useEffect(() => {
    const getCohortAndResources = async () => {
      await axios.get(`/cohorts/${cohort_id}/resources/public_resources.json`).then((res) => {
        setCohort(res.data.cohort);
        setResources(res.data.resources);
        setResourcesTypes(res.data.resources_types);
      });
    };
    !!cohort_id && getCohortAndResources();

    return () => {
      clearData();
    };
  }, [cohort_id]);

  if (!cohort || resources.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="Sphere | Public Resources">
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        <Container
          sx={{ px: '50px !important', pt: '100px', pb: '50px' }}
          key={cohort_id}
          maxWidth={themeStretch ? false : 'xl'}
        >
          <Stack sx={{ alignItems: 'center', marginBottom: '80px' }}>
            <Typography variant="h2" sx={{ color: '#101658', mb: 2, mt: '40px' }}>
              {cohort?.cohort_header_name} Resources
            </Typography>
            <Typography sx={{ fontSize: '21px' }}>
              Curated by {cohort.host_full_name} for {cohort.instructor_pronoun} course{' '}
              <Link
                sx={{ fontWeight: 'bold', color: '#212121', textDecoration: 'underline' }}
                href={cohort.registration_page_url}
                target="_blank"
              >
                {cohort.name}
              </Link>
            </Typography>
          </Stack>
          <ResourceFilter
            isPublic={true}
            types={resources_types}
            isSearch={isSearch}
            setIsSearch={setIsSearch}
          />
          {!isSearch && (
            <>
              {resources?.map((resource, index) => (
                <ResourcesSection
                  handleShowMore={(data: string) => handleShowMore(data)}
                  isPublic={true}
                  key={index}
                  resourceData={resource}
                  hostName={cohort?.host_full_name}
                />
              ))}
            </>
          )}
        </Container>
      </AnalyticsContext.Provider>
    </Page>
  );
}
