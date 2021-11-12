import { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { GroupedSessionMaterial } from '../../../@types/cohorts';
import axios from '../../../utils/axios';
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
  groupedMaterials: GroupedSessionMaterial[];
  sessionId: string | undefined;
};

export default function SessionMaterials({ groupedMaterials, sessionId }: SessionMaterialProps) {
  const [list, setList] = useState<GroupedSessionMaterial[]>(groupedMaterials);

  const onMark = async (index: number, value: boolean, number: number) => {
    if (index >= 0 && index < list.length) {
      const updated = list;
      console.log('list item', updated[number].session_materials[index]);
      try {
        const response = await axios.post(
          `/cohort_sessions/${sessionId}/session_materials/${updated[number].session_materials[index].id}/submit_checklist.json`,
          {
            complete: value
          }
        );
        updated[number].session_materials[index].complete = response.data;
        setList([...updated]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ResourcesContainer style={{ overflow: 'scroll' }} id="session_materials">
      {groupedMaterials.map((group, number) => (
        <Box key={number} style={{ overflow: 'scroll' }}>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>{group.category}:</p>
          {group.session_materials.map((preReading, index) => (
            <PreReadingRow
              key={index}
              item={preReading}
              checkboxHanlder={(value: boolean) => onMark(index, value, number)}
            />
          ))}
        </Box>
      ))}
    </ResourcesContainer>
  );
}
