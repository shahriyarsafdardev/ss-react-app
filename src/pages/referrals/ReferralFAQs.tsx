import react from 'react';
import { Card, Stack, Typography, Box } from '@material-ui/core';
import { useStyles } from './Common';

export default function ReferralFAQs() {
  const classes = useStyles();

  const questions = [
    {
      question: 'How do I use the credit?',
      answer: 'Answer'
    },
    {
      question: 'When can I use the credit?',
      answer: 'Answer'
    },
    {
      question: 'When do I receive the credit?',
      answer: 'Answer'
    },
    {
      question: 'What conditions must be met for me to earn the reward?',
      answer: 'Answer'
    },
    {
      question: 'Who can I refer to earn rewards?',
      answer: 'Answer'
    },
    {
      question: 'How can I tell if a friend has used my referral link?',
      answer: 'Answer'
    },
    {
      question: 'Is there a limit to the number of rewards I can earn?',
      answer: 'Answer'
    },
    {
      question: 'Do referral rewards expire?',
      answer: 'Answer'
    },
    {
      question: 'Can my friend apply my referral code after making a purchase?',
      answer: 'Answer'
    },
    {
      question: "Where can I reach out if my qeustion wasn't answered here?",
      answer: 'Answer'
    }
  ];

  return (
    <Card className={classes.greyBackground}>
      <Typography className={classes.greyBGHeading40}>FAQs</Typography>
      {questions.map((question, index) => (
        <Box key={index}>
          <Typography className={classes.greyBGFont16Bold}>{question.question}</Typography>
          <Typography className={classes.greyBGFont16}>{question.answer}</Typography>
        </Box>
      ))}
    </Card>
  );
}
