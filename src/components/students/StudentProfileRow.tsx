import { Stack, Avatar, TableRow, TableCell, Typography, Box } from '@material-ui/core';
import { useTheme, styled } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import { StudentProfile } from '../../@types/cohorts';
import Label from '../Label';

const LabelContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 5
}));

type StudentProfileRowProps = {
  row: StudentProfile;
  index: number;
  modalHandler: Function;
};

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: '1px solid rgba(224, 224, 224, 1)'
}));

const CONTENT_LIMIT = 25;
const trimString = (data: string) => {
  if (typeof data === 'string') {
    return data.length > CONTENT_LIMIT ? `${data.slice(0, CONTENT_LIMIT)}...` : data;
  }
  return '';
};

const trimArray = (data: any) => {
  if (Array.isArray(data) && data.length > 0) {
    return { data: data[0], other: data.length - 1 };
  }
  return { data: '', other: 0 };
};

export default function StudentProfileRow({ row, index, modalHandler }: StudentProfileRowProps) {
  const theme = useTheme();

  const {
    id,
    first_name,
    last_name,
    current_company,
    profile_image_url,
    current_position,
    strengths,
    interests
  } = row;

  const trimmedStrengths = trimArray(strengths);
  const trimmedInterests = trimArray(interests);

  return (
    <TableRow
      hover
      key={id}
      tabIndex={-1}
      role="checkbox"
      onClick={() => modalHandler(row)}
      style={{ cursor: 'pointer' }}
      data-testid={`student-row-${id}`}
    >
      <StyledTableCell component="th" scope="row" style={{ width: 200 }} padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={first_name} src={profile_image_url} />
          <Typography variant="subtitle2" noWrap data-testid={`peer${id ? `-${id}` : ''}-name`}>
            {first_name} {last_name}
          </Typography>
        </Stack>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        style={{ width: 150 }}
        data-testid={`peer${id ? `-${id}` : ''}-company`}
      >
        {trimString(current_company.name)}
      </StyledTableCell>
      <StyledTableCell align="left" data-testid={`peer${id ? `-${id}` : ''}-position`}>
        {trimString(current_position)}
      </StyledTableCell>
      <StyledTableCell align="left">
        <LabelContainer>
          {trimmedStrengths.data && (
            <Label
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="success"
              testId={`peer${id ? `-${id}` : ''}-strength`}
            >
              {capitalCase(trimmedStrengths.data)}
            </Label>
          )}
          {trimmedStrengths.other > 0 && (
            <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'} color="success">
              +{trimmedStrengths.other}{' '}
            </Label>
          )}
        </LabelContainer>
      </StyledTableCell>
      <StyledTableCell align="left">
        <LabelContainer>
          {trimmedInterests.data && (
            <Label
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="secondary"
              testId={`peer${id ? `-${id}` : ''}-interest`}
            >
              {capitalCase(trimmedInterests.data)}
            </Label>
          )}
          {trimmedInterests.other > 0 && (
            <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'} color="secondary">
              +{trimmedInterests.other}
            </Label>
          )}
        </LabelContainer>
      </StyledTableCell>
    </TableRow>
  );
}
