import { useEffect, useState } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControlLabel, TextField } from '@material-ui/core';

// types
import { SurveyContent } from '../../../@types/cohorts';

type SurveyRowProps = {
  item: SurveyContent;
  onChange: Function;
  submitted_answer: string;
};

type RadioButtonsProps = {
  item: SurveyContent;
  onChange: any;
  submitted_answer: string;
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
  return (
    <TextField
      key="text-answer"
      style={{ marginTop: '10px' }}
      fullWidth
      value={submitted_answer}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Text Only"
    />
  );
}

function RadioButtons({ item, onChange, submitted_answer }: RadioButtonsProps) {
  return (
    <RadioGroup aria-label="gender" name="radio-buttons-group">
      {item?.options?.map((option, index) => (
        <FormControlLabel
          key={index}
          value={option}
          control={
            <Radio checked={option === submitted_answer} onChange={() => onChange(option)} />
          }
          label={option}
        />
      ))}
    </RadioGroup>
  );
}

export default function SurveyRow({ item, onChange, submitted_answer }: SurveyRowProps) {
  const [text, setText] = useState(item.submitted_answer || '');

  useEffect(() => {
    setText(submitted_answer || '');
  }, [submitted_answer]);

  const handleChange = (value: string) => {
    setText(value);
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  const answerFields = () => {
    if (item.question_type === ANSWER_TYPES.MULTIPLE_CHOICE) {
      return <RadioButtons item={item} onChange={handleChange} submitted_answer={text} />;
    }
    if (item.question_type === ANSWER_TYPES.TEXT_INPUT) {
      return <TextInput onChange={handleChange} submitted_answer={text} />;
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
