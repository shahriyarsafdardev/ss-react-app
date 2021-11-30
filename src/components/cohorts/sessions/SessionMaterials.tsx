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
  onTrack: Function;
};

export default function SessionMaterials({
  groupedMaterials,
  sessionId,
  cohortId,
  onTrack
}: SessionMaterialProps) {
  const dispatch = useDispatch();

  const checkBoxEventMessage = (category: string, value: boolean) =>
    `Marked ${
      category === 'Pre-Reading Materials:' ? 'Pre-Reading' : 'Supplementary Material'
    } as ${value ? 'true' : 'false'} from Sessions Page`;

  const preReadingClickEventMessage = (category: string) =>
    `Opened ${
      category === 'Pre-Reading Materials:' ? 'Pre-Reading' : 'Supplementary Material'
    } from Sessions Page`;

  return (
    <ResourcesContainer style={{ overflow: 'scroll' }} id="session_materials">
      {groupedMaterials.map((group, number) => (
        <Box key={number} style={{ overflow: 'scroll' }}>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>{group.category}</p>
          {group.session_materials.map((preReading, index) => (
            <PreReadingRow
              onPreReadingClick={() => onTrack(preReadingClickEventMessage(group?.category))}
              key={index}
              item={preReading}
              checkboxHanlder={(value: boolean) => {
                onTrack(checkBoxEventMessage(group?.category, value));
                dispatch(updateMaterialStatus(cohortId, sessionId, preReading.id, value));
              }}
            />
          ))}
        </Box>
      ))}
    </ResourcesContainer>
  );
}
