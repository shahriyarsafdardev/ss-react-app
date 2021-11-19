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
    title: 'What is the best way to describe your current role?',
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
    title: 'Which best describes the industry you work in? Make between 1 and 5 choices.',
    options: [],
    submitted_answer: null,
    description: null,
    maxLimit: 5
  },
  {
    question_type: 'create-multi-select',
    title: 'What topics can fellow cohort members ask you question on?',
    options: ['Economics', 'Management', 'Hiring', 'Statistics'],
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
    question_type: 'multiple-choice',
    title:
      'Are you interested in being matched with a peer in your cohort based on commonalities and interests? (This is one of our students’ favorite part of the cohort!)',
    options: ['Yes', 'No'],
    submitted_answer: null,
    description: null
  },
  {
    question_type: 'multiple-select',
    title: "I'm most interested in matching with someone who: (Make between 1 and 3 choices)",
    options: [
      'Works in the same role',
      'Works in the same industry',
      'Has the same years of experience',
      'Can mentor me',
      'I can mentor',
      'Is an investor',
      'Is a founder',
      'Lives near me'
    ],
    submitted_answer: null,
    description: null,
    maxLimit: 3
  },
  {
    question_type: 'multiple-choice',
    title: 'Would you be open to mentoring more junior professionals?',
    options: ['Yes', 'No'],
    submitted_answer: null,
    description: null
  },
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
    options: ['I am', 'My employer', 'Other'],
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
