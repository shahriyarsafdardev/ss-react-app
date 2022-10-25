import { Typography } from '@material-ui/core';
import { StyledCard, SubmitButton, useStyles } from './Common';

export default function OnboardingCard({
  iconURL,
  heading,
  detail,
  onNextHandler
}: {
  iconURL: string;
  heading: string;
  detail: string;
  onNextHandler: Function;
}) {
  const classes = useStyles();

  return (
    <StyledCard>
      <img src={iconURL} alt="Icon" className={classes.icon} />
      <Typography className={classes.heading}>{heading}</Typography>
      <Typography className={classes.text}>{detail}</Typography>
      <SubmitButton
        variant="contained"
        onClick={() => {
          onNextHandler();
        }}
      >
        Select
      </SubmitButton>
    </StyledCard>
  );
}
