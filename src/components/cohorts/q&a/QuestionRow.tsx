import React, { useEffect, useRef, useState, memo } from 'react';
import { styled } from '@material-ui/core/styles';
import moment from 'moment';
import { Box, Stack, Typography, Divider } from '@material-ui/core';
import VisibilitySensor from 'react-visibility-sensor';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Question } from '../../../@types/cohorts';
import { DeleteOption } from './Common';
import { markAsRead } from '../../../redux/slices/notification';
import { RootState, useDispatch, useSelector } from '../../../redux/store';

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
    color: '#12125C',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

function QuestionRow({
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
  const dispatch = useDispatch();

  const unreadNotificationID = useSelector((state: RootState) =>
    state?.notification?.notifications.filter(
      (notification) => question.id === notification.channel_id
    )
  )[0]?.id;
  const hasDetails =
    (question.question_text || question.audio_url || question.video_url) && question.answered;

  const handleRead = (value: boolean) => {
    if (value && unreadNotificationID) {
      dispatch(markAsRead('single', unreadNotificationID));
    }
  };
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const questionID = query.get('question');
    if (questionID && questionID === question.id) {
      if (myRef.current) {
        const yOffset = 200;

        const y = myRef.current.getBoundingClientRect().top + window.pageYOffset - yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, []);

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
      <VisibilitySensor onChange={(isVisible) => handleRead(isVisible)}>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Stack direction="column">
            <Typography ref={myRef} style={{ fontSize: '1rem', fontWeight: 700, color: '#212B36' }}>
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
      </VisibilitySensor>
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

export default memo(QuestionRow);
