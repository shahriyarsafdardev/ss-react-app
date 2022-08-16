import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SessionMaterial } from '../../../@types/cohorts';
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
  materials: SessionMaterial[];
  sessionId: string | undefined;
  cohortId: string | undefined;
  onTrack: Function;
};

export default function SessionMaterials({
  materials,
  sessionId,
  cohortId,
  onTrack
}: SessionMaterialProps) {
  const dispatch = useDispatch();
  const groupBy = (xs: any, key: any) =>
    xs.reduce((rv: any, x: any) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  const grouped = groupBy(materials, 'category');
  const categories = Object.keys(grouped).sort();

  return (
    <ResourcesContainer id="session_materials">
      {categories.map((category, number) => (
        <Box key={number}>
          <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>{category}s:</p>
          {grouped[category].map((preReading: SessionMaterial, index: number) => (
            <PreReadingRow
              onPreReadingClick={() => onTrack('Opened Resource from Sessions Page')}
              key={index}
              item={preReading}
              number={index}
              checkboxHanlder={(value: boolean) => {
                onTrack(`Marked Item as ${value ? 'true' : 'false'} from Sessions Page`);
                dispatch(updateMaterialStatus(cohortId, sessionId, preReading.id, value));
              }}
            />
          ))}
        </Box>
      ))}
    </ResourcesContainer>
  );
}
