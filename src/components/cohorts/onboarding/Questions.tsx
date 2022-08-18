import { styled } from '@material-ui/core/styles';
import SurveyRow from '../sessions/SurveyRow';

const QuestionWrapper = styled('div')(() => ({
  height: '70%',
  paddingTop: '10px'
}));

const questions = [
  {
    question_type: 'text-input',
    title: '',
    options: {
      placeholder: 'What have you done? Where have you worked? What are you interested in?'
    },
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multiple-select',
    title: 'Which categories best describe your current role? (feel free to select multiple)',
    options: [],
    submitted_answer: null,
    description: null,
    maxLimit: 2
  },
  {
    question_type: 'multiple-choice',
    title: 'How many years of experience do you have in this type of role?',
    options: ['0-2', '2-5', '5-10', '10-15', '15+'],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multiple-select',
    title:
      'Which categories best describe the industry you currently work in? (feel free to select multiple)',
    options: [],
    submitted_answer: null,
    description: null,
    maxLimit: 5
  },
  {
    question_type: 'multiple-select',
    title:
      'I am most interested in connecting with cohort members who... (feel free to select multiple)',
    options: [
      'Work in the same role',
      'Work in the same industry',
      'That I can be mentored by',
      'That I can mentor',
      'Who are investors',
      'Who are founders',
      'Who live near me',
      'I’m not interested in connecting with cohort members'
    ],
    submitted_answer: null,
    description: null,
    maxLimit: 3
  },
  {
    question_type: 'create-multi-select',
    title: 'What topics can fellow cohort members ask you question on?',
    options: [
      'Management',
      'Team building',
      'Economics',
      'Regression',
      'Software Engineering',
      'Documentation',
      'Analytics',
      'Strategic Planning'
    ],
    submitted_answer: null,
    description:
      "To create a new topic, just start typing, when you've finished spelling it out, press enter!"
  },
  {
    question_type: 'multiple-choice',
    title:
      'Are you interested in recieving networking suggestions based on commonalities and interests? (This is one of our students’ favorite part of the cohort!)',
    options: ['Yes', 'No'],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multiple-choice',
    title: 'How did you hear about this cohort?',
    options: [
      'Instructor',
      'Promoter / Influencer',
      'Sphere social media',
      'Sphere emails',
      'Google search',
      'Recommended by manager',
      'Recommended by colleague',
      'Recommended by friend',
      'Other'
    ],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multiple-choice',
    title: 'Who is paying for this course?',
    options: ['I am', 'My employer', 'Other'],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multiple-choice',
    title:
      'Would you like your participation in the Sphere cohort to count towards professional development accreditation (CPD, CPE or CE)?',
    options: ['Yes', 'No', 'Maybe?'],
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
  setCurrentAnswer,
  options = []
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
  options: string[];
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={{ ...questions[1], options }}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

// export const Question3 = ({
//   currentAnswer,
//   setCurrentAnswer
// }: {
//   currentAnswer: any;
//   setCurrentAnswer: Function;
// }) => (
//   <QuestionWrapper>
//     <SurveyRow
//       item={questions[2]}
//       submitted_answer={currentAnswer || ''}
//       onChange={setCurrentAnswer}
//     />
//   </QuestionWrapper>
// );

export const Question4 = ({
  currentAnswer,
  setCurrentAnswer,
  options = []
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
  options: string[];
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={{ ...questions[3], options }}
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

export const Question6 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[5]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question7 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[6]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question8 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[7]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question9 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[8]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question10 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[9]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question11 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[10]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);

export const Question12 = ({
  currentAnswer,
  setCurrentAnswer
}: {
  currentAnswer: any;
  setCurrentAnswer: Function;
}) => (
  <QuestionWrapper>
    <SurveyRow
      item={questions[11]}
      submitted_answer={currentAnswer || ''}
      onChange={setCurrentAnswer}
    />
  </QuestionWrapper>
);
