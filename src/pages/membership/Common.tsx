import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack5';
import axiosV2 from 'utils/axiosV2';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, styled, Theme, Stack, Typography, Checkbox } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiOutlinedInput-root.Mui-error fieldset': {
      border: '2px solid #DF1B41'
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderWidth: '1px'
    },
    '& .MuiOutlinedInput-root.Mui-error.Mui-focused fieldset': {
      borderColor: '#475569'
    }
  },
  input: {
    '&::placeholder': {
      color: '#D3D3D3'
    }
  },
  helperText: {
    fontSize: '14.88px',
    margin: '0',
    '&.MuiFormHelperText-root.Mui-error': {
      color: '#DF1B41'
    }
  },
  submitButton: {
    height: '40px',
    borderRadius: '30px',
    minWidth: '180px'
  },
  paymentButtonsStack: {
    marginTop: '40px',
    minWidth: '150px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '40px'
    }
  },
  paymentData: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '80px',
    [theme.breakpoints.down('lg')]: {
      padding: '100px 60px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '60px',
      height: 'fit-content',
      minHeight: 'unset'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px'
    }
  },
  inquiryTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '120px',
    [theme.breakpoints.down('lg')]: {
      padding: '30px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '20px',
      height: 'fit-content'
    }
  },
  wrapperStack: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  wrapperPaymentStack: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  paymentStack: {
    width: '100%',
    minHeight: '100% !important',
    [theme.breakpoints.down('md')]: {
      minHeight: '100% !important'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '100% !important'
    }
  },
  fullWidthCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    maxWidth: '600px',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  },
  purpleBackground: {
    background: 'linear-gradient(163.43deg, #9E5AD7 11.47%, #29064C 91.06%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  },
  saleBanner: {
    background: 'linear-gradient(180deg, #9D4EDD 0%, #212B36 179.63%)',
    backgroundSize: 'cover',
    backfaceVisibility: 'hidden',
    backgroundPosition: 'center',
    color: 'white',
    padding: '10px',
    height: '84px',
    textAlign: 'center',
    width: '100%',
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
      height: '104px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '125px'
    }
  },
  heading: {
    fontSize: '22px',
    textAlign: 'center',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px'
    }
  },
  toggleFont: {
    color: '#000',
    [theme.breakpoints.down('md')]: {
      color: '#fff'
    }
  },
  inquiryFont: {
    color: '#334155',
    [theme.breakpoints.down('md')]: {
      color: '#fff'
    }
  },
  whiteFont: {
    color: '#fff'
  },
  textCenter: {
    textAlign: 'center'
  },
  enrollButton: {
    borderRadius: '30px',
    height: '48px',
    [theme.breakpoints.down('md')]: {
      backgroundColor: '#fff',
      color: '#12125C',
      marginTop: '50px !important'
    }
  },
  whiteBox: {
    border: '1px solid #fff',
    borderRadius: '16px',
    padding: '40px',
    margin: '0px',
    width: '100%'
  },
  whiteBorder: {
    borderColor: '#fff',

    borderRadius: '5px'
  },
  transparentBorder: {
    borderColor: 'transparent'
  },
  paddingHorizontal40: {
    paddingLeft: '40px',
    paddingRight: '40px'
  },
  paymentOptionButton: {
    marginTop: 'auto !important'
  },
  whiteStackCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
    width: '30%',
    color: '#000',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  },
  optionsStack: {
    marginBottom: '24px !important',
    [theme.breakpoints.down('md')]: {
      marginBottom: '15px !important'
    }
  },
  paymentSelectionAvatar: {
    width: '72px',
    height: '72px',
    border: '1px solid #fff',
    marginX: 'auto',
    [theme.breakpoints.down('md')]: {
      marginTop: '80px'
    }
  },
  counterButton: {
    borderRadius: '50%',
    border: '1px solid #fff',
    color: '#fff',
    cursor: 'pointer',
    minWidth: '35px',
    minHeight: '35px'
  },
  blackFridayText: {
    fontSize: '15px',
    fontWeight: 'bold',
    background: '-webkit-linear-gradient(94.23deg, #913DFF -4.78%, #43009A 53.44%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  whiteFridayText: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#fff',
    [theme.breakpoints.up('md')]: {
      background: '-webkit-linear-gradient(94.23deg, #913DFF -4.78%, #43009A 53.44%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  },
  planPriceDetails: {
    color: '#4D4DCD',
    fontWeight: 600
  },
  planOptionHead: {
    fontWeight: 'bold',
    fontSize: '20px'
  }
}));

export const Logo = styled(LazyLoadImage)(({ theme }) => ({
  width: '9%',
  position: 'absolute',
  top: '4%',
  left: '2%',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export const BoldTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700
}));

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#fff',
  padding: '0 !important',
  '&.Mui-checked': {
    color: '#fff'
  }
}));

export const OptionStack = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  background: ' rgba(255, 255, 255, 0.1)',
  borderRadius: '5px',
  padding: '10px',
  border: '1px solid'
}));

export const MembershipDetails = ({ course }: { course: any }) => {
  const classes = useStyles();

  return (
    <>
      <Stack spacing={1} textAlign="center">
        <Typography variant="h4" className={`${classes.heading} `}>
          Secure a 50% discount for the first 3 months of your membership
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>by entering payment details now</Typography>
      </Stack>
      <Box className={classes.whiteBox}>
        <ul>
          <li>
            You will not be charged immediately - this is only to secure access to the 50% off
            promotion.
          </li>
          <li style={{ marginTop: '30px' }}>
            Once we release {course?.instructor_names} {course?.name} Sphere in{' '}
            {course?.intake_month}, we will charge you $25 / month for 3 months (after which
            membership will increase to $50 / month).
          </li>
          <li style={{ marginTop: '30px' }}>
            Cancel your commitment at any time by contacting nicholas@getsphere.com
          </li>
        </ul>
      </Box>
    </>
  );
};

export const MembershipSurvey = ({
  course,
  membershipID,
  interests
}: {
  course: any;
  membershipID: any;
  interests: string[];
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<any>(interests);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const OPTIONS = [
    `Monthly live sessions with ${course.instructor_first_names}`,
    'Asynchronous resource access',
    `An AI mentor fine-tuned on the topic of ${course.name}`,
    `Access to the ${course.name} community`
  ];

  const handleSelect = (value: string) => {
    if (selected.indexOf(value) > -1) {
      setSelected(selected.filter((type: string) => type !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      setSubmitting(true);
      const selections = selected.join('##');
      axiosV2
        .post('memberships/survey_feedback.json', {
          membership_id: membershipID,
          most_excited_for: selections
        })
        .then((res) => {
          enqueueSnackbar('Preferences Saved', { variant: 'success' });
          setSubmitting(false);
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={7}
      maxWidth="800px"
    >
      <Stack spacing={1} textAlign="center" width="100%">
        <Typography variant="h4" className={`${classes.heading} `}>
          You have successfully joined the waitlist for {course?.instructor_names} {course?.name}!
        </Typography>
        <Typography sx={{ fontSize: '16px' }}>
          You will be notified one week before it launches.
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: '18px', fontWeight: 600, width: '100%', textAlign: 'center' }}>
        Until then, we would love to know what you are most excited for:
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        width="100%"
        alignItems="flex-start"
        spacing={1}
      >
        {OPTIONS.map((name: any, index: number) => (
          <OptionStack
            width="100%"
            direction="row"
            className={
              selected.indexOf(name) > -1 ? classes.whiteBorder : classes.transparentBorder
            }
            onClick={() => handleSelect(name)}
            alignItems="flex-start"
            key={index}
            spacing={1}
          >
            <StyledCheckbox
              checked={selected.indexOf(name) > -1}
              data-testid={`options-${index + 1}`}
            />
            <Typography sx={{ fontSize: '16px' }}>{name}</Typography>
          </OptionStack>
        ))}
      </Stack>
      <LoadingButton
        onClick={() => handleSubmit()}
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        disabled={selected.length === 0}
        className={classes.submitButton}
        sx={{
          background: '#fff !important',
          color: '#000 !important',
          '&.Mui-disabled': { opacity: 0.7 }
        }}
      >
        Submit
      </LoadingButton>
    </Stack>
  );
};
