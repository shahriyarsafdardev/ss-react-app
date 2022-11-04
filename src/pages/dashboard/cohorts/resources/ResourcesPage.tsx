import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Container, InputAdornment, TextField } from '@material-ui/core';
import useSettings from 'hooks/useSettings';
import { getCohortResources } from 'redux/slices/cohort';
import { RootState, useDispatch, useSelector } from 'redux/store';
import searchFill from '@iconify/icons-eva/search-fill';
import { Icon } from '@iconify/react';
import LoadingScreen from 'components/LoadingScreen';
import ToggleButtons from './ToggleButtons';
import ResourcesSection from './ResourcesSection';
import { SearchbarStyle } from './Common';
import { LoadingContainer } from '../code/CodeTab';

const sessionMaterials = [
  {
    sessionNumber: 1,
    sessionName: 'Metrics, the OEC, Interpreting Results and Trust',
    sessionID: '1',
    totalMaterials: 4,
    completedMaterials: 3,
    materials: [
      {
        materialID: '1',
        complete: true,
        materialName: 'Chapter 1 - Trustworthy Online Components',
        author: 'Ronny',
        type: 'Jupyter Notebook'
      },
      {
        materialID: '2',
        complete: false,
        materialName: 'An Exploration of Code',
        author: 'Steve, Charlotte, Andrew, Nancy, Peter, Alan & Dave',
        type: 'Slides'
      },
      {
        materialID: '1',
        complete: true,
        materialName:
          'Chapter 1 - Trustworthy Online Components To Use When Coding or Project Planning',
        author: 'Ronny',
        type: 'Academic Paper'
      },
      {
        materialID: '1',
        complete: true,
        materialName: 'An Exploration of Code Through the Ages of Time',
        author: 'Steve',
        type: 'Other'
      }
    ]
  },
  {
    sessionNumber: 2,
    sessionName: 'Ideation Funnel, Machine Learning, Culture and Ethics',
    sessionID: '1',
    totalMaterials: 2,
    completedMaterials: 0,
    materials: [
      {
        materialID: '1',
        complete: true,
        materialName: 'Chapter 1 - Trustworthy Online Components',
        author: 'Ronny',
        type: 'Github'
      },
      {
        materialID: '1',
        complete: true,
        materialName: 'An Exploration of Code',
        author: 'Steve',
        type: 'Book Passage'
      }
    ]
  },
  {
    sessionNumber: 3,
    sessionName: 'Implementing Convolutional Neural Networks',
    sessionID: '1',
    totalMaterials: 3,
    completedMaterials: 1,
    materials: [
      {
        materialName: 'Chapter 1 - Trustworthy Online Components',
        author: 'Ronny',
        type: 'Book'
      },
      {
        materialName: 'An Exploration of Code',
        author: 'Steve',
        type: 'Spreadsheet'
      },
      {
        materialName:
          'Chapter 12 - Trustworthy Online Components To Use When Coding or Project Planning Even When You Think You Can No Longer Use Your Brain and Be Creative',
        author: 'Steve, Charlotte, Andrew, Nancy, Peter, Alan & Dave',
        type: 'Article'
      }
    ]
  }
];

export default function ResourcesPage() {
  const [filters, setFilters] = useState<String[]>([]);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { resources } = cohort || [];

  useEffect(() => {
    if (cohort && !resources) {
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
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* <SearchbarStyle> */}
        <TextField
          fullWidth
          placeholder="Search"
          onSubmit={() => console.log('Submitted!')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  style={{ marginLeft: '5px' }}
                  icon={searchFill}
                  width={25}
                  height={25}
                  color="#101658"
                />
              </InputAdornment>
            )
          }}
          color="primary"
          sx={{ marginBottom: '30px' }}
        />
        {/* </SearchbarStyle> */}
        <ToggleButtons filters={filters} setFilters={setFilters} />
        {resources.map((resource, index) => (
          <ResourcesSection key={index} resourceData={resource} />
        ))}
      </Container>
    </Page>
  );
}
