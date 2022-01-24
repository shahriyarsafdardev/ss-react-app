import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Cohort, Session } from '../../../@types/cohorts';
import { CircularLoader, getCohortGuides, SectionContainer } from './Common';
import ToDoItem from './ToDoItem';
import CircularProgressbar from './CircularProgressBar';

const StyledCohortGuidesContainer = styled(Box)(() => ({
  height: '405px',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { width: '5px' },
  '&::-webkit-scrollbar-thumb': { borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, .3)' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
}));

const CohortGuides = ({
  cohort,
  sessions,
  activeSession
}: {
  cohort: Cohort;
  sessions: Session[];
  activeSession: Session | undefined;
}) => {
  const items = getCohortGuides(cohort.id, sessions);

  return (
    <SectionContainer className="card-2" data-testid="to-do-card">
      {items ? (
        <>
          <Box
            data-testid="to-do-header"
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}
          >
            <Box>
              <p style={{ fontSize: '18px', fontWeight: 700 }}>
                Make sure you prepare for{' '}
                {activeSession?.custom_name || `Session${activeSession?.number || 's'}`}!
              </p>
              <p style={{ fontSize: '14px' }}>The sooner we get these tasks live, the better</p>
            </Box>
            <Box>
              {items.length > 0 && (
                <CircularProgressbar
                  strokeWidth={14}
                  totalSteps={items.length}
                  completedSteps={items.filter((item: any) => item.complete === true).length}
                />
              )}
            </Box>
          </Box>
          <StyledCohortGuidesContainer>
            {items.length > 0 ? (
              items.map((item: any) => (
                <ToDoItem key={item.heading} item={item} onClick={() => {}} />
              ))
            ) : (
              <p>No Cohort guide added yet</p>
            )}
          </StyledCohortGuidesContainer>
        </>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default CohortGuides;
