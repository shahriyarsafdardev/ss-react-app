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
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  padding: 'auto 0'
}));

const CONTENT_LIMIT = 15;
const trimString = (data: string) => {
  if (typeof data === 'string') {
    return data.length > CONTENT_LIMIT ? `${data.slice(0, CONTENT_LIMIT)}...` : data;
  }
  return '';
};

const ARRAY_LIMIT = 10;
const trimArray = (data: string[]) => {
  if (Array.isArray(data)) {
    let currentContentSize = 0;
    const trimmedData = data.filter((datum: string) => {
      currentContentSize += datum.length;
      return currentContentSize <= ARRAY_LIMIT;
    });
    return { data: trimmedData, other: data.length - trimmedData.length };
  }
  return { data, other: 0 };
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
      id={`student-row-${id}`}
    >
      <StyledTableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={first_name} src={profile_image_url} />
          <Typography variant="subtitle2" noWrap>
            {first_name} {last_name}
          </Typography>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="left">{trimString(current_company.name)}</StyledTableCell>
      <StyledTableCell align="left">{trimString(current_position)}</StyledTableCell>
      <StyledTableCell align="left">
        <LabelContainer>
          {trimmedStrengths.data.length > 0 &&
            trimmedStrengths.data.map((strength: string) => (
              <Label
                key={index}
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color="success"
              >
                {capitalCase(strength)}
              </Label>
            ))}
          {trimmedStrengths.other > 0 && (
            <Label
              key={index}
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="success"
            >
              +{trimmedStrengths.other}{' '}
            </Label>
          )}
        </LabelContainer>
      </StyledTableCell>
      <StyledTableCell align="left">
        <LabelContainer>
          {trimmedInterests.data.length > 0 &&
            trimmedInterests.data.map((interest: string) => (
              <Label
                key={index}
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color="secondary"
              >
                {capitalCase(interest)}
              </Label>
            ))}
          {trimmedInterests.other > 0 && (
            <Label
              key={index}
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="secondary"
            >
              +{trimmedInterests.other}
            </Label>
          )}
        </LabelContainer>
      </StyledTableCell>
    </TableRow>
  );
}
