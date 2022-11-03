import React from 'react';
import Page from 'components/Page';
import { Container } from '@material-ui/core';
import useSettings from 'hooks/useSettings';
import ToggleButtons from './ToggleButtons';
import ResourcesSection from './ResourcesSection';

const sessionMaterials = [
  {
    sessionNumber: 1,
    totalMaterials: 4,
    completedMaterials: 3,
    materials: [
      {
        materialName: 'Chapter 1 - Trustworthy Online Components',
        author: 'Ronny',
        type: 'Jupyter Notebook'
      },
      {
        materialName: 'An Exploration of Code',
        author: 'Steve, Charlotte, Andrew, Nancy, Peter, Alan & Dave',
        type: 'Slides'
      },
      {
        materialName:
          'Chapter 1 - Trustworthy Online Components To Use When Coding or Project Planning',
        author: 'Ronny',
        type: 'Academic Paper'
      },
      {
        materialName: 'An Exploration of Code Through the Ages of Time',
        author: 'Steve',
        type: 'Other'
      }
    ]
  },
  {
    sessionNumber: 2,
    totalMaterials: 2,
    completedMaterials: 0,
    materials: [
      {
        materialName: 'Chapter 1 - Trustworthy Online Components',
        author: 'Ronny',
        type: 'Github'
      },
      {
        materialName: 'An Exploration of Code',
        author: 'Steve',
        type: 'Book Passage'
      }
    ]
  },
  {
    sessionNumber: 3,
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
          'Chapter 12 - Trustworthy Online Components To Use When Coding or Project Planning',
        author: 'Steve, Charlotte, Andrew, Nancy, Peter, Alan & Dave',
        type: 'Article'
      }
    ]
  }
];

export default function ResourcesPage() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Sphere | Resources">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ToggleButtons />
        {sessionMaterials.map((session, index) => (
          <ResourcesSection key={index} sessionData={session} />
        ))}
      </Container>
    </Page>
  );
}
