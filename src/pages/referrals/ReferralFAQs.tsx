import { Typography, Box } from '@material-ui/core';
import ReferralQuestion from './ReferralQuestion';

export default function ReferralFAQs() {
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
    <Box sx={{ mt: '3rem' }}>
      <Typography variant="h3" sx={{ color: '#071A33' }}>
        Referrals FAQ
      </Typography>

      {questions.map((question, index) => (
        <ReferralQuestion key={index} questionData={question} />
      ))}
    </Box>
  );
}
