import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import moment from 'moment';
import { Box, Typography, Divider } from '@material-ui/core';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Question, Comment } from '../../../@types/cohorts';

const StyledQuestionRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  wordBreak: 'break-word',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.20), 0px 24px 48px rgba(145, 158, 171, 0.05)',
  borderRadius: '16px',
  padding: '20px',
  margin: '0 10px 20px 10px',
  'span.view-type': {
    color: '#4D4DCD',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

export default function QuestionRow({
  question,
  addComment
}: {
  question: Question;
  addComment: Function;
}) {
  const [isHiddenView, setView] = useState(true);

  const renderAnswer = () => {
    if (question.answered) {
      return (
        <Box style={{ marginTop: '10px' }}>
          <Box style={{ width: '100%' }}>
            {question.answer_video_url && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                src={question.answer_video_url}
                poster={question?.answer_video_screenshot}
                preload="auto"
                controls
                controlsList="nodownload"
                autoPlay={false}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            )}
            {question.answer_audio_url && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <audio
                src={question.answer_audio_url}
                controls
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
          </Box>
          <Typography
            style={{ fontSize: '14px', fontWeight: 400, color: '#212B36', marginTop: '10px' }}
          >
            {question?.asker_name
              ? `Answered by ${question.user_name} ${moment(question.answer_date).fromNow()}`
              : 'Some User'}
          </Typography>
        </Box>
      );
    }
    return '';
  };

  const renderQuestion = () => (
    <>
      <Box>
        <Typography
          style={{ fontSize: '18px', fontWeight: 700, color: '#212B36', lineHeight: '28px' }}
        >
          {question?.question_summary ? `${question.question_summary}` : 'Question summary'}
        </Typography>
      </Box>
      {!isHiddenView && (
        <Box style={{ width: '100%' }}>
          {question.question_type === 'Text' && question.question_text && (
            <div
              style={{ fontWeight: 200, fontSize: '16px', lineHeight: '28px' }}
              dangerouslySetInnerHTML={{ __html: question.question_text }}
            />
          )}
          {question.question_type === 'Audio' && question.audio_url && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <audio src={question.audio_url} controls style={{ width: '100%', marginTop: '10px' }} />
          )}
          {question.question_type === 'Video' && question.video_url && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={question.video_url}
              poster={question?.video_screenshot}
              preload="auto"
              controls
              controlsList="nodownload"
              autoPlay={false}
              style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
            />
          )}
        </Box>
      )}
      <Typography
        style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#212B36',
          lineHeight: '16px',
          marginTop: '10px'
        }}
      >
        {question?.asker_name
          ? `Asked by ${question.asker_name} ${moment(question.date).fromNow()}`
          : 'Some User'}{' '}
        |{' '}
        <span
          onClick={() => setView(!isHiddenView)}
          role="button"
          className="view-type"
          tabIndex={-1}
          onKeyDown={() => {}}
        >
          {isHiddenView ? 'See Details' : 'Hide Details'}
        </span>
      </Typography>
    </>
  );
  const renderComments = () =>
    question.comments.length > 0 && (
      <div>
        <CommentList post={question} />
      </div>
    );

  return (
    <StyledQuestionRow>
      {renderQuestion()}
      {renderAnswer()}
      <Divider
        sx={{
          mt: 1,
          width: '100%'
        }}
      />
      {renderComments()}
      <CommentForm addComment={addComment} questionID={question.id} />
    </StyledQuestionRow>
  );
}
