import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography
} from '@material-ui/core';
import { MotionInView, varFadeIn } from 'components/animate';
import React from 'react';
import { FAQs, useStyles } from './Common';

export default function FAQsTab() {
  const classes = useStyles();

  return (
    <Stack spacing={2}>
      <Typography className={classes.faqHeading}>Frequently Asked Questions</Typography>
      <MotionInView variants={varFadeIn}>
        {FAQs.map((faq) => (
          <Accordion key={faq.id} defaultExpanded={true} className={classes.accordionContainer}>
            <AccordionSummary
              expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
            >
              <Stack direction="row" spacing={2}>
                <img src="/static/icons/faq.svg" alt="faq-img" />
                <Typography variant="subtitle1" className={classes.faqQuestion}>
                  {faq.question}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.faqAnswer}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </MotionInView>
    </Stack>
  );
}
