import { useState, useEffect } from 'react';
import { Box, Typography, StepConnector, stepConnectorClasses } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepIconProps } from '@material-ui/core/StepIcon';
import CircleOutlinedIcon from '@material-ui/icons/CircleOutlined';
import Circle from '@material-ui/icons/Circle';

import { Session } from '../../../@types/cohorts';
import { displayMultipleDates, formatMultipleTimes } from './Common';

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
  alignItems: 'center',
  '&::-webkit-scrollbar': { width: '4px' },
  img: {
    margin: '0 10px',
    '&.active': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(77, 77, 205, 0.05)',
        borderRadius: '15px',
        boxShadow: '1px 1px 5px 5px rgba(77, 77, 205, 0.1)'
      }
    },
    '&.disabled': {
      cursor: 'default',
      opacity: 0.3,
      pointerEvents: 'none'
    }
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
  const { active, completed, className, testid } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Circle className="QontoStepIcon-completedIcon" data-testid={testid} />
      ) : (
        <CircleOutlinedIcon className="QontoStepIcon-circle" data-testid={testid} />
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

const ARROW_STATES = {
  NO_LEFT: 'no-left',
  NO_right: 'no-right',
  MIDDLE: 'middle'
};
const SCROLL_MOVEMENT = 400;

export default function DesktopStepper({
  cohortID,
  activeSession,
  sessions,
  onTrackEvent
}: {
  cohortID: string;
  activeSession: number;
  sessions: Session[];
  onTrackEvent: Function;
}) {
  const [arrowState, setArrowState] = useState(ARROW_STATES.NO_LEFT);
  const [activeStep, setActiveStep] = useState(0);
  const [isRendered, setIsRenderedstate] = useState(false);

  const scroll = async (val: number) => {
    const elem = document.getElementById('timeline-div');
    if (elem) {
      elem.scrollLeft += val * 130;
      await new Promise((r) => setTimeout(r, SCROLL_MOVEMENT));

      if (elem.scrollLeft === 0) {
        setArrowState(ARROW_STATES.NO_LEFT);
        return;
      }
      const diff = elem.scrollLeft + elem.offsetWidth - elem.scrollWidth;
      if ((diff > 0 && diff < 10) || (diff > -10 && diff < 0) || diff === 0) {
        setArrowState(ARROW_STATES.NO_right);
        return;
      }
      setArrowState(ARROW_STATES.MIDDLE);
    }
  };
  useEffect(() => {
    if (isRendered) {
      setActiveStep(activeSession);
    }
    return setIsRenderedstate(true);
  }, [activeSession, isRendered]);

  useEffect(() => {
    const elem = document.getElementById('timeline-div');
    if (activeSession > 2) {
      scroll(activeStep);
    }
    return () => {
      if (elem) {
        elem.scrollLeft = 0;
      }
    };
  }, [activeStep]);

  return (
    <StyledTimeline>
      {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img
        data-testid="left-arrow-icon"
        src="/static/cohorts-home/left-arrow.svg"
        onClick={() => {
          scroll(-4);
          onTrackEvent('Navigate Left');
        }}
        onKeyDown={() => {
          scroll(-4);
          onTrackEvent('Navigate Left');
        }}
        className={arrowState === ARROW_STATES.NO_LEFT ? 'disabled' : 'active'}
        alt="left arrow"
      />
      <StyledBox data-testid="timeline-div" id="timeline-div" className="scrollbar-hidden">
        <Stepper
          activeStep={activeSession}
          alternativeLabel
          connector={<ColorlibConnector data-testid="cohort-timeline-connector" />}
          style={{ marginTop: '10px' }}
        >
          <Step key={99} sx={{ minWidth: '180px' }}>
            <StepLabel
              StepIconComponent={(props) => (
                <QontoStepIcon {...props} testid="timeline-welcome-step-icon" />
              )}
            >
              <StyledSession data-testid="timeline-welcome">Welcome</StyledSession>
            </StepLabel>
          </Step>
          {sessions &&
            sessions?.map((session) => (
              <Step key={session.number} sx={{ minWidth: '180px' }}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <QontoStepIcon {...props} testid={`timeline-step-icon-${session?.number}`} />
                  )}
                >
                  <div>
                    <StyledSession
                      data-testid={`session-name-${session?.number}`}
                    >{`Session ${session.number}`}</StyledSession>
                    <StyledDate
                      className="session-time"
                      data-testid={`session-time-${session?.number}`}
                    >
                      {formatMultipleTimes(session.times, session.length)}
                    </StyledDate>
                    {displayMultipleDates(session.times) ? (
                      <StyledDate
                        className="session-date"
                        data-testid={`session-multiple-dates-${session?.number}`}
                      >
                        {displayMultipleDates(session.times)}
                      </StyledDate>
                    ) : (
                      <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#4D4DCD' }}>
                        <Link
                          data-testid={`session-review-content-${session?.number}`}
                          to={`/cohorts/${cohortID}/sessions?session=${session.number}`}
                          onClick={() => onTrackEvent('Review Content')}
                        >
                          Review Content
                        </Link>
                      </Typography>
                    )}
                  </div>
                </StepLabel>
              </Step>
            ))}
          <Step key={100} sx={{ minWidth: '180px' }}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <StyledSession data-testid="cohort-completion">Cohort Completion</StyledSession>
              <StyledDate data-testid="alumni-community">
                Welcome to the alumni community!
              </StyledDate>
            </StepLabel>
          </Step>
        </Stepper>
      </StyledBox>
      {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img
        data-testid="right-arrow-icon"
        src="/static/cohorts-home/right-arrow.svg"
        onClick={() => {
          scroll(4);
          onTrackEvent('Navigate Right');
        }}
        onKeyDown={() => {
          scroll(4);
          onTrackEvent('Navigate Right');
        }}
        className={arrowState === ARROW_STATES.NO_right ? 'disabled' : 'active'}
        alt="right arrow"
      />
    </StyledTimeline>
  );
}
