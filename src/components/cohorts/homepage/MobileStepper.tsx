import { Box, Typography, StepConnector, stepConnectorClasses, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepIconProps } from '@material-ui/core/StepIcon';
import moment from 'moment';

import { useEffect, useState } from 'react';
import { Session } from '../../../@types/cohorts';

const StyledSession = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '20px'
}));

const StyledContent = styled(Typography)(() => ({
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '20px'
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4'
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#7A8086',
      zIndex: 1,
      borderRadius: '4px',
      width: '46px',
      height: '31px',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      marginRight: '14px'
    },
    '& .QontoStepIcon-circle': {
      color: '#FFFFFF',
      zIndex: 1,
      background: '#5858D0',
      borderRadius: '4px',
      minWidth: '50px',
      height: '31px',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      marginRight: '14px'
    }
  })
);
const StyledTimeline = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  overflowY: 'auto',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    height: '250px'
  },
  scrollBehavior: 'smooth',
  '&.scrollbar-hidden::-webkit-scrollbar': {
    display: 'none'
  }
}));

const StyledBox = styled(Box)(() => ({
  width: '85%'
}));

function QontoStepIcon(props: StepIconProps | any) {
  const { active, completed, className, time } = props;
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {!completed ? (
        <div className="QontoStepIcon-completedIcon">
          <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>
            {moment(time).format('DD MMM')}
          </Typography>
        </div>
      ) : (
        <div className="QontoStepIcon-circle">
          <Typography sx={{ fontSize: '13px', fontWeight: 500, padding: '0 3px' }}>
            {moment(time).format('DD MMM')}{' '}
          </Typography>
        </div>
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: '1px',
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
      backgroundImage: ''
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    width: 1,
    opacity: '0.2',
    border: '1px dashed #222C36',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

const displaySession = (time: string, length: string, number: number) => {
  if (moment(time) > moment()) {
    return `Session ${number} | ${length}`;
  }
  return 'Review Content';
};

export default function MobileStepper({
  activeSession,
  sessions
}: {
  activeSession: number;
  sessions: Session[];
}) {
  const [sessionSteps, setSessionSteps] = useState(sessions);
  const [seeMore, setSeeMore] = useState(false);

  const handleClick = () => {
    if (seeMore && sessions.length > 3) {
      setSessionSteps(sessions.slice(0, 3));
      setSeeMore(false);
    } else {
      setSessionSteps(sessions);
      setSeeMore(true);
    }
  };

  useEffect(() => {
    if (sessions?.length < 3) {
      setSessionSteps(sessions);
    }
    if (sessions?.length > 3) {
      setSessionSteps(sessions.slice(0, 3));
    }
  }, [sessions]);
  return (
    <StyledTimeline sx={{ display: 'flex', flexDirection: 'column' }}>
      <StyledBox>
        <Stepper
          activeStep={activeSession}
          orientation="vertical"
          connector={<ColorlibConnector />}
        >
          {sessionSteps?.map((step, index) => (
            <Step key={step.number} sx={{ minHeight: '50px' }}>
              <StepLabel
                StepIconComponent={(props: StepIconProps) => (
                  <QontoStepIcon {...props} time={step.time} key={step.time} />
                )}
              >
                <div>
                  <StyledSession>{step.name}</StyledSession>
                  <StyledContent>
                    {displaySession(step.time, step.length, step.number)}
                  </StyledContent>
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </StyledBox>
      <Button onClick={handleClick}>
        {sessions?.length > 3 && (seeMore ? 'See Less' : 'See All')}
      </Button>
    </StyledTimeline>
  );
}
