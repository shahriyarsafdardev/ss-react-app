import { useState } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControlLabel, TextField } from '@material-ui/core';

// types
import { SurveyContent } from '../../../@types/cohorts';

type SurveyRowProps = {
  item: SurveyContent;
};

type RadioButtonsProps = {
  item: SurveyContent;
};

type TextInputProps = {
  submitted_answer: string;
};

const RowContainer = styled('div')(() => ({
  width: '100%',
  padding: '20px 0',
  borderTop: '1px solid #E5E5E5',
  '&:first-child': {
    borderTop: 'none'
  }
}));

const ANSWER_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  TEXT_INPUT: 'text-input'
};

function TextInput({ submitted_answer }: TextInputProps) {
  const [text, setText] = useState(submitted_answer);
  return (
    <TextField
      style={{ marginTop: '10px' }}
      fullWidth
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Text Only"
    />
  );
}

function RadioButtons({ item }: RadioButtonsProps) {
  return (
    <RadioGroup aria-label="gender" defaultValue={item.submitted_answer} name="radio-buttons-group">
      {item?.options?.map((option, index) => (
        <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
      ))}
    </RadioGroup>
  );
}

export default function SurveyRow({ item }: SurveyRowProps) {
  const answerFields = () => {
    if (item.type === ANSWER_TYPES.MULTIPLE_CHOICE) {
      return <RadioButtons item={item} />;
    }
    if (item.type === ANSWER_TYPES.TEXT_INPUT) {
      return <TextInput submitted_answer={item.submitted_answer} />;
    }
    return '';
  };

  return (
    <RowContainer>
      <h3>{item.title}</h3>
      {answerFields()}
    </RowContainer>
  );
}
