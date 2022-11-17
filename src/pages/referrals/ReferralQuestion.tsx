import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './Common';

export default function ReferralQuestion({ questionData }: { questionData: any }) {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.font16Bold}>{questionData.question}</Typography>
      <Typography className={classes.font16}>{questionData.answer}</Typography>
    </>
  );
}
