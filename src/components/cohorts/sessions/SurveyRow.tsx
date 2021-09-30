import { useState } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControlLabel, TextField } from '@material-ui/core';

// types
import { SurveyContent } from '../../../@types/cohorts';

type SurveyRowProps = {
  item: SurveyContent;
  onChange: any;
};

type RadioButtonsProps = {
  item: SurveyContent;
  onChange: any;
};

type TextInputProps = {
  submitted_answer: string;
  onChange: any;
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

function TextInput({ submitted_answer, onChange }: TextInputProps) {
  const [text, setText] = useState(submitted_answer);
  return (
    <TextField
      style={{ marginTop: '10px' }}
      fullWidth
      value={text}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Text Only"
    />
  );
}

function RadioButtons({ item, onChange }: RadioButtonsProps) {
  return (
    <RadioGroup aria-label="gender" defaultValue={item.submitted_answer} name="radio-buttons-group">
      {item?.options?.map((option, index) => (
        <FormControlLabel
          key={index}
          value={option}
          control={<Radio onChange={() => onChange(option)} />}
          label={option}
        />
      ))}
    </RadioGroup>
  );
}

export default function SurveyRow({ item, onChange }: SurveyRowProps) {
  const answerFields = () => {
    if (item.question_type === ANSWER_TYPES.MULTIPLE_CHOICE) {
      return <RadioButtons item={item} onChange={onChange} />;
    }
    if (item.question_type === ANSWER_TYPES.TEXT_INPUT) {
      return <TextInput onChange={onChange} submitted_answer={item.submitted_answer} />;
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
