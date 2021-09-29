import { styled } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';

import { Survey } from '../../../@types/cohorts';
import SurveyRow from './SurveyRow';
import Message from '../../Message';

type SurveyFormProps = {
  surveyData: Survey | undefined;
};

const SubmitButton = styled(Button)(() => ({
  padding: '10px 90px'
}));

export default function SurveyForm({ surveyData }: SurveyFormProps) {
  const survey = () => (
    <div>
      {surveyData?.contents.map((surveyRow, index) => (
        <SurveyRow key={`survey-row-${index}`} item={surveyRow} />
      ))}
      <SubmitButton variant="contained" size="small">
        Submit
      </SubmitButton>
    </div>
  );

  return (
    <Container>
      {surveyData && Object.keys(surveyData).length === 0 ? (
        survey()
      ) : (
        <Message content="The feedback survey will be available at any time after the session is complete." />
      )}
    </Container>
  );
}
