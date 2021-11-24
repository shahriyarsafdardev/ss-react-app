import { useState } from 'react';

import { Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

import { styled } from '@material-ui/core/styles';
import { SectionContainer } from './Common';

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: '15px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'column'
  }
}));
const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  height: '50px',
  width: 170,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const QuestionForm = ({ onSubmit, submitting }: { onSubmit: any; submitting: boolean }) => {
  const [question, setQuestion] = useState('');

  const submitQuestion = async () => {
    onSubmit(question);
    setQuestion('');
    console.log('sdfg');
  };
  return (
    <SectionContainer className="newQuestion">
      <StyledStack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField
          fullWidth
          label="New Question"
          value={question}
          placeholder="Do you have any questions? Host would love to hear them! "
          multiline
          onChange={(e) => setQuestion(e.target.value)}
          inputProps={{ maxLength: 120 }}
        />
        <StyledLoadingButton
          onClick={() => submitQuestion()}
          variant="contained"
          loading={submitting}
          id="btn-submit"
        >
          Submit Question
        </StyledLoadingButton>
      </StyledStack>
    </SectionContainer>
  );
};

export default QuestionForm;
