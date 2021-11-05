import { useEffect, useState } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControlLabel, TextField, Checkbox } from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';

// types
import { SurveyContent } from '../../../@types/cohorts';

type SurveyRowProps = {
  item: SurveyContent;
  onChange: Function;
  submitted_answer: string | any;
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
  paddingBottom: '1.5rem',
  marginBottom: '1.5rem'
}));

const QuestionText = styled('p')(() => ({
  fontWeight: 500,
  fontSize: '17px',
  lineHeight: '22px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  color: '#071A33'
}));

const QuestionDescription = styled('label')(() => ({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  color: '#637381'
}));

const ANSWER_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  TEXT_INPUT: 'text-input',
  MULTI_SELECT: 'multi-select',
  CREATE_MULTI_SELECT: 'create-multi-select'
};

const customStyles = {
  placeholder: (provided: any, state: any) => ({
    display: state.isFocused ? 'none' : 'block',
    color: 'rgb(128, 128, 128)'
  })
};

function TextInput({ submitted_answer, onChange }: TextInputProps) {
  return (
    <TextField
      key="text-answer"
      style={{ marginTop: '10px' }}
      fullWidth
      value={submitted_answer}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing whatever comes to mind!"
      multiline
      rows={4}
      inputProps={{
        'data-testid': 'survey-text'
      }}
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
            <Radio
              checked={option === submitted_answer}
              data-checked={option === submitted_answer}
              onChange={() => onChange(option)}
              data-testid={`option-${index + 1}`}
            />
          }
          label={option}
        />
      ))}
    </RadioGroup>
  );
}

function MultiCheck({
  options,
  selectedValues,
  onChange
}: {
  options: string[] | undefined;
  selectedValues: string[];
  onChange: Function;
}) {
  const [values, setValues] = useState(new Set(Array.from(selectedValues)));

  function handleChange(e: any) {
    if (values.has(e.target.value)) {
      const arr = Array.from(values).filter((x) => x !== e.target.value);
      onChange(arr);

      setValues(new Set(arr));
    } else {
      const updatedValues = [...Array.from(values), e.target.value];
      onChange(updatedValues);

      setValues(new Set(updatedValues));
    }
  }

  return (
    <div>
      {options?.map((option, index) => (
        <div key={option}>
          <Checkbox
            value={option}
            checked={values.has(option)}
            id={`check-${index}`}
            data-testid={`check-${index + 1}`}
            onChange={handleChange}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}

function CreateMultiSelect({
  options,
  onChange,
  values
}: {
  options: string[] | undefined;
  onChange: Function;
  values: string[];
}) {
  const handleChange = (values: any) => {
    onChange(values.map((item: any) => item.value));
  };

  if (!options) return null;

  const selectedValues = values || [];

  return (
    <div>
      <CreatableSelect
        defaultValue={selectedValues.map((option) => ({ value: option, label: option }))}
        options={options?.map((option) => ({ value: option, label: option }))}
        isClearable={false}
        styles={customStyles}
        backspaceRemovesValue={true}
        placeholder={<div>Start typing whatever comes to mind!</div>}
        isMulti
        isSearchable
        onChange={handleChange}
        id="create-select"
      />
    </div>
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
    if (item.question_type === ANSWER_TYPES.MULTI_SELECT) {
      return (
        <MultiCheck options={item.options} selectedValues={submitted_answer} onChange={onChange} />
      );
    }
    if (item.question_type === ANSWER_TYPES.CREATE_MULTI_SELECT) {
      return (
        <CreateMultiSelect
          options={item.options}
          values={submitted_answer}
          onChange={(e: any) => onChange(e)}
        />
      );
    }

    return '';
  };

  return (
    <RowContainer>
      <QuestionText data-testid="onboard-question">{item.title}</QuestionText>
      <QuestionDescription data-testid="onboard-description">
        {item?.description}
      </QuestionDescription>
      <br />
      {answerFields()}
    </RowContainer>
  );
}
