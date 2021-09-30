import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { Container, Button } from '@material-ui/core';
import { Console } from 'console';
import useAuth from '../../../hooks/useAuth';

import { Survey } from '../../../@types/cohorts';
import SurveyRow from './SurveyRow';
import Message from '../../Message';

// axios
import axios from '../../../utils/axios';

const SubmitButton = styled(Button)(() => ({
  padding: '10px 90px'
}));

type SessionsId = {
  sessionId: string | undefined;
};
export default function SurveyForm({ sessionId }: SessionsId) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [message, setMessage] = useState('You can only return feedback once session is complete');
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
    setMessage('Submitting your response...');

    axios
      .post(`/cohort_sessions/submit_survey_responses.json`, {
        response,
        current_user_id: user?.id
      })
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: 'success' });
        setMessage(res.data.message);
      });
  };

  const survey = () => (
    <div>
      {surveyData.map((surveyRow: any, index) => (
        <SurveyRow
          key={`survey-row-${index}`}
          item={surveyRow}
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
    <Container>
      {surveyData && !loading && Object.keys(surveyData).length !== 0 ? (
        survey()
      ) : (
        <Message content={message} />
      )}
    </Container>
  );
}
