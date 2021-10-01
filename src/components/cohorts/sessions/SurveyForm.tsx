import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { Container, Button, Box } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from '../../../hooks/useAuth';

import SurveyRow from './SurveyRow';

// axios
import axios from '../../../utils/axios';

const SubmitButton = styled(Button)(() => ({
  padding: '10px 90px'
}));

const StyledContainer = styled(Container)(() => ({
  backgroundColor: 'white',
  borderRadius: '25px',
  padding: '20px 10px'
}));

export default function SurveyForm({
  sessionId,
  onComplete
}: {
  sessionId: string | undefined;
  onComplete: Function;
}) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [surveyData, setSurveyData] = useState([]);
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/cohort_sessions/${sessionId}/survey_questions.json`).then((res) => {
      setSurveyData(res.data);
      setLoading(false);
    });
  }, [sessionId]);

  const setQuestionResponse = (value: string, question_id: string) => {
    response[question_id] = value;
    setResponse(response);
  };

  const submitResponse = () => {
    setLoading(true);

    axios
      .post(`/cohort_sessions/submit_survey_responses.json`, {
        response,
        current_user_id: user?.id
      })
      .then((res) => {
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: 'success' });
        onComplete();
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Some error occurred!', { variant: 'error' });
        onComplete();
      });
  };

  const survey = () => (
    <div>
      {surveyData.map((surveyRow: any, index) => (
        <SurveyRow
          key={`survey-row-${index}`}
          item={surveyRow}
          submitted_answer={response[surveyRow?.id]}
          onChange={(val: string) => {
            setQuestionResponse(val, surveyRow?.id);
          }}
        />
      ))}
      <SubmitButton variant="contained" size="small" onClick={submitResponse}>
        Submit
      </SubmitButton>
    </div>
  );

  return (
    <StyledContainer>
      {surveyData && !loading && Object.keys(surveyData).length !== 0 ? (
        survey()
      ) : (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      )}
    </StyledContainer>
  );
}
