import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { GroupedSessionMaterial } from '../../../@types/cohorts';
import PreReadingRow from '../home/PreReadingRow';
import { useDispatch } from '../../../redux/store';
import { updateMaterialStatus } from '../../../redux/slices/cohort';

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
  cohortId: string | undefined;
};

export default function SessionMaterials({
  groupedMaterials,
  sessionId,
  cohortId
}: SessionMaterialProps) {
  const dispatch = useDispatch();

  return (
    <ResourcesContainer style={{ overflow: 'scroll' }} id="session_materials">
      {groupedMaterials.map((group, number) => (
        <Box key={number} style={{ overflow: 'scroll' }}>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>{group.category}:</p>
          {group.session_materials.map((preReading, index) => (
            <PreReadingRow
              key={index}
              item={preReading}
              checkboxHanlder={(value: boolean) =>
                dispatch(updateMaterialStatus(cohortId, sessionId, number, preReading.id, value))
              }
            />
          ))}
        </Box>
      ))}
    </ResourcesContainer>
  );
}
