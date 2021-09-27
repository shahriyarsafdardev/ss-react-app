import { Stack, Avatar, TableRow, TableCell, Typography } from '@material-ui/core';
import { useTheme, styled } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import { StudentProfile } from '../../@types/cohorts';
import Label from '../Label';

type StudentProfileRowProps = {
  row: StudentProfile;
  index: number;
  modalHandler: Function;
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
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={first_name} src={profile_image_url} />
          <Typography variant="subtitle2" noWrap>
            {last_name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">{current_company.name}</TableCell>
      <TableCell align="left">{current_position}</TableCell>
      <TableCell align="left">
        {strengths?.length > 0 && (
          <Label
            key={index}
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color="success"
          >
            {capitalCase(strengths[0])}
          </Label>
        )}
      </TableCell>
      <TableCell align="left">
        {interests?.length > 0 && (
          <Label
            key={index}
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color="secondary"
          >
            {capitalCase(interests[0])}
          </Label>
        )}
      </TableCell>
    </TableRow>
  );
}
