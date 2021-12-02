import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import moment from 'moment';
import { Box, Stack, Typography, Divider, Avatar } from '@material-ui/core';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Question } from '../../../@types/cohorts';
import { DeleteOption } from './Common';

const StyledQuestionRow = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  wordBreak: 'break-word',
  boxShadow: '0 10px 30px rgb(0 0 0 / 15%)',
  borderRadius: '16px',
  padding: '20px',
  margin: '20px 40px 20px 40px',
  [theme.breakpoints.down('sm')]: {
    boxShadow: '0 5px 5px rgb(0 0 0 / 10%)',
    margin: '6px'
  },
  'span.view-type': {
    color: '#4D4DCD',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

export default function QuestionRow({
  question,
  addComment,
  onDeleteClick,
  canDelete,
  removeComment,
  onTrack
}: {
  question: Question;
  addComment: Function;
  onDeleteClick: Function;
  canDelete: Boolean;
  removeComment: Function;
  onTrack: Function;
}) {
  const [isHiddenView, setView] = useState(question.answered);
  const hasDetails =
    (question.question_text || question.audio_url || question.video_url) && question.answered;

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
                onPlay={() => onTrack('Watched Answer')}
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
          <Typography style={{ fontSize: '0.8rem', fontWeight: 400, color: '#212B36' }}>
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
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack direction="column">
          <Typography style={{ fontSize: '1rem', fontWeight: 700, color: '#212B36' }}>
            {question?.question_summary ? `${question.question_summary}` : 'Question summary'}
          </Typography>
          <Typography
            style={{
              fontSize: '0.8rem',
              fontWeight: 400,
              color: '#212B36',
              lineHeight: '16px',
              marginTop: '5px'
            }}
          >
            {question?.asker_name
              ? `Asked by ${question.asker_name} ${moment(question.date).fromNow()}`
              : 'Some User'}
            {hasDetails && (
              <>
                {' '}
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
              </>
            )}
          </Typography>
        </Stack>
        {canDelete && <DeleteOption handleDelete={() => onDeleteClick(question.id)} />}
      </Box>
      {!isHiddenView && (
        <Box style={{ width: '100%' }}>
          {question.question_type === 'Text' && question.question_text && (
            <div
              style={{ marginTop: '12px', fontWeight: 200, fontSize: '16px', lineHeight: '28px' }}
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
    </>
  );
  const renderComments = () =>
    question.comments.length > 0 && (
      <div>
        <CommentList removeComment={removeComment} post={question} />
      </div>
    );

  return (
    <StyledQuestionRow>
      {renderQuestion()}
      {renderAnswer()}
      <Divider
        sx={{
          mt: 2,
          width: '100%'
        }}
      />
      {renderComments()}
      <CommentForm addComment={addComment} questionID={question.id} />
    </StyledQuestionRow>
  );
}
