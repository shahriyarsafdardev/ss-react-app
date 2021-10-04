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

const ANSWER_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  TEXT_INPUT: 'text-input',
  MULTI_SELECT: 'multi-select',
  CREATE_MULTI_SELECT: 'create-multi-select'
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
      {options?.map((option) => (
        <div key={option}>
          <Checkbox value={option} checked={values.has(option)} onChange={handleChange} />
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
        isClearable={true}
        backspaceRemovesValue={true}
        isMulti
        isSearchable
        onChange={handleChange}
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
      <h3>{item.title}</h3>
      <br />
      {answerFields()}
    </RowContainer>
  );
}
