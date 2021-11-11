import { Box, Typography, StepConnector, stepConnectorClasses } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepIconProps } from '@material-ui/core/StepIcon';
import CircleOutlinedIcon from '@material-ui/icons/CircleOutlined';
import Circle from '@material-ui/icons/Circle';

import { Session } from '../../../@types/cohorts';
import { displayDate, formatTime } from './Common';

const StyledSession = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '36px'
}));

const StyledDate = styled(Typography)(() => ({
  fontSize: '12px',
  fontWeight: 400
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 16,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4'
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 20
    },
    '& .QontoStepIcon-circle': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 20
    }
  })
);
const StyledTimeline = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'hidden',
  display: 'flex',
  justifyContent: 'space-between',
  '&::-webkit-scrollbar': { width: '4px' },
  img: {
    cursor: 'pointer'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const StyledBox = styled(Box)(() => ({
  width: '85%',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  '&.scrollbar-hidden::-webkit-scrollbar': {
    display: 'none'
  }
}));

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Circle className="QontoStepIcon-completedIcon" />
      ) : (
        <CircleOutlinedIcon className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 6,
    left: 'calc(-50% + 6px)',
    right: 'calc(50% + 6px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: ''
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(90deg, rgba(0, 171, 85, 0.2) 0%, #00AB55 119.74%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 6,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

const scroll = (val: number) => {
  const elem = document.getElementById('timeline-div');
  if (elem) {
    elem.scrollLeft += val * 500;
  }
};

export default function DesktopStepper({
  cohortID,
  activeSession,
  sessions
}: {
  cohortID: string;
  activeSession: number;
  sessions: Session[];
}) {
  return (
    <StyledTimeline>
      {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src="/static/cohorts-home/left-arrow.svg"
        onClick={() => scroll(-1)}
        onKeyDown={() => scroll(-1)}
        alt="left arrow"
      />
      <StyledBox id="timeline-div" className="scrollbar-hidden">
        <Stepper
          activeStep={activeSession}
          alternativeLabel
          connector={<ColorlibConnector />}
          style={{ marginTop: '10px' }}
        >
          <Step key={99} sx={{ minWidth: '180px' }}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <StyledSession>Welcome</StyledSession>
            </StepLabel>
          </Step>
          {sessions &&
            sessions?.map((session) => (
              <Step key={session.number} sx={{ minWidth: '180px' }}>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <div>
                    <StyledSession>{`Session ${session.number}`}</StyledSession>
                    <StyledDate>{formatTime(session.time, session.length)}</StyledDate>
                    {displayDate(session.time) ? (
                      <StyledDate>{displayDate(session.time)}</StyledDate>
                    ) : (
                      <a href={`/cohorts/${cohortID}/sessions?session=${session.number}`}>
                        Review Content
                      </a>
                    )}
                  </div>
                </StepLabel>
              </Step>
            ))}
          <Step key={100} sx={{ minWidth: '180px' }}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <StyledSession>End</StyledSession>
            </StepLabel>
          </Step>
        </Stepper>
      </StyledBox>
      {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src="/static/cohorts-home/right-arrow.svg"
        onClick={() => scroll(1)}
        onKeyDown={() => scroll(1)}
        alt="right arrow"
      />
    </StyledTimeline>
  );
}
