import { useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
// material
import _ from 'lodash';
import { styled } from '@material-ui/core/styles';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Checkbox,
  Slider,
  Box
} from '@material-ui/core';
import MultiSelect from '../../MultiSelect';
// types
import { SurveyContent } from '../../../@types/cohorts';
import MatrixSelect from './MatrixSelect';

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
  item: SurveyContent;
};
type SliderProps = {
  onChange: any;
  item: SurveyContent;
};
type StarRatingProps = {
  onChange: any;
  submitted_answer: string;
};

const RowContainer = styled('div')(() => ({
  width: '100%',
  paddingBottom: '1.5rem',
  marginBottom: '1.5rem'
}));

const QuestionText = styled('p')(({ theme }) => ({
  fontWeight: 500,
  fontSize: '17px',
  lineHeight: '22px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  color: theme.palette.text.primary
}));

const QuestionDescription = styled('label')(({ theme }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '42px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  color: theme.palette.text.secondary
}));

const StarRatingStyled = styled(StarRatingComponent)(({ theme }) => ({
  i: {
    fontSize: '4rem',
    margin: '0 10px',
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem'
    }
  }
}));

const ANSWER_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  TEXT_INPUT: 'text-input',
  MULTI_SELECT: 'multi-select',
  CREATE_MULTI_SELECT: 'create-multi-select',
  SLIDER: 'slider',
  STAR_RATING: 'star-rating',
  MULTIPLE_SELECT: 'multiple-select',
  MATRIX_SELECT: 'session-outcome-matrix'
};

function TextInput({ submitted_answer, onChange, item }: TextInputProps) {
  return (
    <TextField
      key="text-answer"
      style={{ marginTop: '10px' }}
      fullWidth
      value={submitted_answer}
      onChange={(e) => onChange(e.target.value)}
      placeholder={item?.options?.placeholder || 'Start typing whatever comes to mind!'}
      multiline
      autoFocus
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
      {item?.options?.map((option: any, index: any) => (
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
  selectedValues: string;
  onChange: Function;
}) {
  const [values, setValues] = useState(
    new Set(Array.from(selectedValues ? selectedValues?.split(',') : []))
  );

  function handleChange(e: any) {
    if (values.has(e.target.value)) {
      const arr = Array.from(values).filter((x) => x !== e.target.value);
      onChange(_.toString(arr));

      setValues(new Set(arr));
    } else {
      const updatedValues = [...Array.from(values), e.target.value];
      onChange(_.toString(updatedValues));

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

function SliderQuestion({ onChange, item }: SliderProps) {
  const [value, setValue] = useState(item?.options?.max);
  const [isRendered, setIsRenderedstate] = useState(false);
  const range = Array.from({ length: item?.options?.max }, (v, k) => k + 1);
  const marks = range.map((item: number) => ({
    value: item,
    label: `${item}`
  }));

  useEffect(() => {
    if (isRendered) {
      onChange(value);
    }

    return setIsRenderedstate(true);
  }, [isRendered]);

  return (
    <Slider
      step={1}
      valueLabelDisplay="auto"
      min={1}
      max={item?.options?.max}
      defaultValue={item?.options?.max}
      marks={marks}
      onChange={(e, newValue) => {
        setValue(newValue);
        onChange(newValue);
      }}
      data-testid="slider-option"
    />
  );
}

function StarRating({ submitted_answer, onChange }: StarRatingProps) {
  const [value, setValue] = useState<number>(5);
  const [isRendered, setIsRenderedstate] = useState(false);

  useEffect(() => {
    if (typeof submitted_answer === 'number') {
      setValue(Number(submitted_answer));
    }
  }, [submitted_answer]);

  useEffect(() => {
    if (isRendered) {
      onChange(value);
    }

    return setIsRenderedstate(true);
  }, [isRendered]);

  return (
    <Box width="100%" display="flex" justifyContent="center" data-testid="star-rating">
      <StarRatingStyled
        name="stars"
        starCount={5}
        value={value || 5}
        onStarClick={(nextValue: any) => {
          onChange(nextValue);
          setValue(nextValue);
        }}
      />
    </Box>
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
      return <TextInput onChange={handleChange} submitted_answer={text} item={item} />;
    }
    if (item.question_type === ANSWER_TYPES.MULTI_SELECT) {
      return (
        <MultiCheck options={item.options} selectedValues={submitted_answer} onChange={onChange} />
      );
    }
    if (item.question_type === ANSWER_TYPES.CREATE_MULTI_SELECT) {
      return (
        <MultiSelect
          options={item.options}
          values={submitted_answer ? submitted_answer.split(',') : []}
          onChange={(e: any) => onChange(_.toString(e))}
          maxLimit={item.maxLimit}
          isCreatable={true}
        />
      );
    }
    if (item.question_type === ANSWER_TYPES.SLIDER) {
      return <SliderQuestion item={item} onChange={onChange} />;
    }
    if (item.question_type === ANSWER_TYPES.STAR_RATING) {
      return <StarRating onChange={onChange} submitted_answer={text} />;
    }
    if (item.question_type === ANSWER_TYPES.MULTIPLE_SELECT) {
      return (
        <MultiSelect
          options={item.options}
          values={submitted_answer ? submitted_answer.split(',') : []}
          onChange={(e: any) => onChange(_.toString(e))}
          maxLimit={item.maxLimit}
        />
      );
    }
    if (item.question_type === ANSWER_TYPES.MATRIX_SELECT) {
      return (
        <MatrixSelect
          options={item.options?.outcomes}
          onChange={onChange}
          submitted_answer={submitted_answer}
        />
      );
    }

    return '';
  };

  return (
    <RowContainer>
      <QuestionText data-testid="onboard-question">{item.title}</QuestionText>
      {item?.description && (
        <QuestionDescription data-testid="onboard-description">
          {item?.description}
        </QuestionDescription>
      )}
      <br />
      {answerFields()}
    </RowContainer>
  );
}
