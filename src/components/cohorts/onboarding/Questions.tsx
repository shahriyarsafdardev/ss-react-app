import { styled } from '@material-ui/core/styles';
import SurveyRow from '../sessions/SurveyRow';

const QuestionWrapper = styled('div')(() => ({
  height: '70%',
  paddingTop: '10px'
}));

const questions = [
  {
    question_type: 'multiple-choice',
    title: 'How did you hear about this cohort?',
    options: [
      'Google Search',
      'Email Marketing',
      'Social Media',
      'Recommended by a friend or colleague',
      'Personally invited by someone in the Scholarsite team',
      'Other'
    ],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multiple-choice',
    title: 'Who is paying for this course?',
    options: ['I am', 'My employer is', 'Other'],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multiple-choice',
    title:
      'Would you like your participation in the Scholarsite cohort to count towards professional development accreditation (CPD, CPE or CE)?',
    options: ['Yes', 'No', 'Maybe?'],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multi-select',
    title: 'What are you looking to find within the Scholarsite community?',
    options: ['Find a mentor', 'Mentor others', 'Grow my network', 'Discuss materials'],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'create-multi-select',
    title: 'What topics can fellow cohort members ask you question on?',
    options: ['Economics', 'Management', 'Hiring', 'Statistics'],
    submitted_answer: null,
    description: null
  }
];

export const Question1 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[0]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question2 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[1]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question3 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[2]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question4 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[3]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question5 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[4]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);
