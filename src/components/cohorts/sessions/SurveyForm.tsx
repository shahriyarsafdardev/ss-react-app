// material
import { styled } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';

import { Survey } from '../../../@types/cohorts';
import SurveyRow from './SurveyRow';

type SurveyFormProps = {
  surveyData: Survey | undefined;
};

const SubmitButton = styled(Button)(() => ({
  padding: '10px 90px'
}));

export default function SurveyForm({ surveyData }: SurveyFormProps) {
  if (!surveyData) return null;

  return (
    <Container>
      {surveyData.contents.map((surveyRow, index) => (
        <SurveyRow key={`survey-row-${index}`} item={surveyRow} />
      ))}
      <SubmitButton variant="contained" size="small">
        Submit
      </SubmitButton>
    </Container>
  );
}
