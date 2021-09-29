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
            {last_name}
          </Typography>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="left">{current_company.name}</StyledTableCell>
      <StyledTableCell align="left">{current_position}</StyledTableCell>
      <StyledTableCell align="left">
        <LabelContainer>
          {strengths?.length > 0 &&
            strengths.map((strength) => (
              <Label
                key={index}
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color="success"
              >
                {capitalCase(strength)}
              </Label>
            ))}
        </LabelContainer>
      </StyledTableCell>
      <StyledTableCell align="left">
        <LabelContainer>
          {interests?.length > 0 &&
            interests.map((interest) => (
              <Label
                key={index}
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color="secondary"
              >
                {capitalCase(interest)}
              </Label>
            ))}
        </LabelContainer>
      </StyledTableCell>
    </TableRow>
  );
}
