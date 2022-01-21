import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { sum } from 'lodash';
import axios from '../../../utils/axios';
import { Session } from '../../../@types/cohorts';
import { CircularLoader, SectionContainer, findLastSession, DisplaySurveyResponse } from './Common';

const StyledSurveyContainer = styled(Box)(() => ({
  height: '405px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { width: '5px' },
  '&::-webkit-scrollbar-thumb': { borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, .3)' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
}));

const SurveyFeedback = ({ sessions }: { sessions: Session[] }) => {
  const [data, setData] = useState<any>([]);
  const session = findLastSession(sessions);

  useEffect(() => {
    const initFeedback = async () => {
      if (session) {
        try {
          const response = await axios.get(`/cohort_sessions/${session.id}/survey_feedback.json`);
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    initFeedback();
  }, [session]);

  return (
    <SectionContainer className="card-2" data-testid="to-do-card">
      {data && data.length > 0 ? (
        <>
          <Box
            data-testid="to-do-header"
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}
          >
            <Box>
              <p style={{ fontSize: '18px', fontWeight: 700 }}>
                Check out your {session.custom_name || `Session ${session.number}`} feedback!
              </p>
              <p style={{ fontSize: '14px' }}>
                You recieved {sum(Object.values(data[0]?.answers))} responses to the session survey!
              </p>
            </Box>
          </Box>
          {sum(Object.values(data[0]?.answers)) > 0 && (
            <StyledSurveyContainer>
              {data.map((q: any) => (
                <DisplaySurveyResponse key={q?.question} question={q} />
              ))}
            </StyledSurveyContainer>
          )}
        </>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default SurveyFeedback;
