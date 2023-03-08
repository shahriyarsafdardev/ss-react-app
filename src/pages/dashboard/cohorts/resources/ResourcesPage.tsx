import { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Container } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useSettings from 'hooks/useSettings';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getCohortResources, getCohortSessionResources } from 'redux/slices/cohort';
import { RootState, useDispatch, useSelector } from 'redux/store';
import ResourceFilter from './ResourceFilter';
import ResourcesSection from './ResourcesSection';
import EmptyResourcePage from './EmptyResourcePage';

export default function ResourcesPage() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [category, setCategory] = useState('');
  const [session, setSession] = useState<number | null>(null);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const url = new URLSearchParams(useLocation().search);
  const { pathname } = useLocation();
  const source = url.get('source') || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { resources, resources_types } = cohort || [];

  useEffect(() => {
    cohort?.id && sendAnalyticsData('Resources Page - Page Loaded', { Source: source });

    if (cohort && (!resources || !resources_types)) {
      dispatch(getCohortResources(cohort_id));
    }
    return () => {
      setIsSearch(false);
    };
  }, [cohort?.id]);

  const sendAnalyticsData = (eventName: string, eventData: any) => {
    cohort && trackEvent(cohort, eventName, eventData);
  };

  const handleShowMore = async (sessionID: string) => {
    dispatch(getCohortSessionResources(cohort_id, sessionID));
  };

  if (typeof resources === 'undefined' || resources?.length === 0) {
    return <EmptyResourcePage />;
  }

  const setState = (value: any, type: string) => {
    type === 'string' ? setCategory(value) : setSession(value);
  };

  return (
    <Page title="Sphere | Resources">
      <Helmet>
        <link rel="canonical" href={`https://portal.getsphere.com${pathname}`} />
      </Helmet>
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        <Container
          sx={{ px: '50px !important' }}
          key={cohort_id}
          maxWidth={themeStretch ? false : 'xl'}
        >
          <ResourceFilter
            isPublic={false}
            types={resources_types}
            isSearch={isSearch}
            setState={setState}
            setIsSearch={setIsSearch}
            categoryState={category}
            sessionState={session}
            setSession={setSession}
            setCategory={setCategory}
          />
          {!isSearch && (
            <>
              {resources?.map((resource, index) => (
                <ResourcesSection
                  handleShowMore={(data: string) => handleShowMore(data)}
                  isPublic={false}
                  key={resource.session_id}
                  resourceData={resource}
                  setState={setState}
                />
              ))}
            </>
          )}
        </Container>
      </AnalyticsContext.Provider>
    </Page>
  );
}
