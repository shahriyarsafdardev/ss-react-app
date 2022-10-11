import { useContext, useEffect } from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { AnalyticsContext } from 'contexts/AnalyticsContext';

import { SessionMaterial, Session } from '../../../@types/cohorts';
import PreReadingRow from '../home/PreReadingRow';

const ResourcesContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 0
  },
  ul: {
    marginLeft: '25px'
  }
}));

type SessionMaterialProps = {
  materials: SessionMaterial[];
  session: Session | undefined;
};

export default function SessionMaterials({ materials, session }: SessionMaterialProps) {
  const groupBy = (xs: any, key: any) =>
    xs.reduce((rv: any, x: any) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  const grouped = groupBy(materials, 'category');
  const categories = Object.keys(grouped).sort();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const commonProperties = {
    'Session ID': session?.id,
    'Session Number': session?.number,
    'Session Name': session?.name
  };

  useEffect(() => {
    sendAnalyticsData('Resources Page - Resources - Tab Opened', {
      ...commonProperties
    });
  }, []);

  return (
    <ResourcesContainer id="session_materials">
      {categories.map((category, number) => (
        <Box key={number}>
          <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>{category}s:</p>
          {grouped[category].map((preReading: SessionMaterial, index: number) => (
            <PreReadingRow
              onPrereadingEvent={(eventName: string, customEvent?: any) => {
                sendAnalyticsData(eventName, {
                  ...customEvent,
                  ...commonProperties,
                  'Resource ID': preReading.id,
                  'Resource Number': preReading.index,
                  'Resource Name': preReading.name,
                  'Resource Author': preReading.info_text,
                  'Resource Link': preReading.action_url
                });
              }}
              key={index}
              item={preReading}
              number={index}
              sessionId={session?.id || ''}
            />
          ))}
        </Box>
      ))}
    </ResourcesContainer>
  );
}
