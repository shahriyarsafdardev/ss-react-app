import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import React, { memo } from 'react';

export default function MatrixSelect({
  options,
  onChange,
  submitted_answer
}: {
  options: string[];
  onChange: Function;
  submitted_answer: string;
}) {
  let answers: string[][] = Array.from(Array(options?.length), () => []);
  if (submitted_answer !== undefined) {
    answers = JSON.parse(submitted_answer);
  }

  const handleChange = (outcomeIndex: number, answerIndex: number, value: string) => {
    answers[outcomeIndex][answerIndex] = value;
    onChange(JSON.stringify(answers));
  };

  const TABLE_HEAD = [
    { id: 'session-outcome', label: 'Session Outcome', description: '' },
    { id: 'effectiveness', label: 'Effectiveness', description: '(1 = novice, 5 = master)' },
    {
      id: 'importance',
      label: 'Importance',
      description: '(1 = not important, 5 = very important)'
    }
  ];

  const RadioGroupRating = ({
    outcomeIndex,
    answerIndex
  }: {
    outcomeIndex: number;
    answerIndex: number;
  }) => (
    <RadioGroup
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'nowrap' }}
      onChange={(e, value) => handleChange(outcomeIndex, answerIndex, value)}
      defaultValue={answers[outcomeIndex][answerIndex]}
    >
      <FormControlLabel control={<Radio />} value="1" label="1" />
      <FormControlLabel control={<Radio />} value="2" label="2" />
      <FormControlLabel control={<Radio />} value="3" label="3" />
      <FormControlLabel control={<Radio />} value="4" label="4" />
      <FormControlLabel control={<Radio />} value="5" label="5" />
    </RadioGroup>
  );

  const OptionRow = memo(
    ({ key, outcomeIndex, option }: { key: number; outcomeIndex: number; option: string }) => (
      <TableRow hover key={key} tabIndex={-1} sx={{ padding: '24px 0px' }}>
        <TableCell style={{ width: '33%' }} align="left">
          {option}
        </TableCell>
        <TableCell style={{ width: '33%' }}>
          <RadioGroupRating outcomeIndex={outcomeIndex} answerIndex={0} />
        </TableCell>
        <TableCell style={{ width: '33%' }}>
          <RadioGroupRating outcomeIndex={outcomeIndex} answerIndex={1} />
        </TableCell>
      </TableRow>
    )
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEAD.map((headCell) => (
              <TableCell
                key={headCell.id}
                align="center"
                sx={{ backgroundColor: 'rgba(77, 77, 205, 0.08)' }}
              >
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#000' }}>
                    {headCell.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#637381' }}>
                    {headCell.description}
                  </Typography>
                </Stack>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody id="sales-list-container" data-test-id="billing-history-table">
          {options &&
            options?.map((option: string, index) => (
              <OptionRow key={index} outcomeIndex={index} option={option} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
