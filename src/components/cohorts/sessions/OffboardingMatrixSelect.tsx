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
  Radio,
  useTheme,
  useMediaQuery
} from '@material-ui/core';

import React, { memo } from 'react';
import { StyledNote, StyledTableCell } from './Common';

export default function OffboardingMatrixSelect({
  options,
  onChange,
  submitted_answer,
  offboardingAnswerFound
}: {
  options: string[];
  onChange: Function;
  submitted_answer: string;
  offboardingAnswerFound: boolean;
}) {
  const theme = useTheme();
  const isSmallDesktop = useMediaQuery(theme.breakpoints.down(1400));
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
    {
      id: 'Your-response-before-the-cohort-started',
      label: 'Your response before the cohort started',
      description: '(1 = novice, 5 = master)'
    },
    {
      id: 'how-you-feel-now',
      label: 'How you feel now?',
      description: '(1 = not important, 5 = very important)'
    }
  ];

  const RadioGroupRating = ({
    outcomeIndex,
    answerIndex
  }: {
    outcomeIndex: number;
    answerIndex: number;
  }) => {
    const isDisabled = () => answerIndex === 0 && offboardingAnswerFound;

    return (
      <RadioGroup
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'nowrap' }}
        onChange={(e, value) => handleChange(outcomeIndex, answerIndex, value)}
        defaultValue={answers[outcomeIndex][answerIndex]}
      >
        {[...Array(5)].map((x, i) => (
          <FormControlLabel
            control={<Radio />}
            value={`${i + 1}`}
            label={`${i + 1}`}
            disabled={isDisabled()}
            key={i}
          />
        ))}
      </RadioGroup>
    );
  };

  const OptionRow = memo(
    ({ key, outcomeIndex, option }: { key: number; outcomeIndex: number; option: string }) => (
      <TableRow hover key={key} tabIndex={-1} sx={{ padding: '24px 0px' }}>
        <StyledTableCell align="left">{option}</StyledTableCell>
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
    <>
      {isSmallDesktop && (
        <StyledNote>Note: Please scroll to the right to see all questions.</StyledNote>
      )}
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
    </>
  );
}
