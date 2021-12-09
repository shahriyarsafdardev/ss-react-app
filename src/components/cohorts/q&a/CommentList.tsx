import useAuth from 'hooks/useAuth';
// material
import { Stack } from '@material-ui/core';
// @types
import { Question } from '../../../@types/cohorts';
//
import CommentItem from './CommentItem';
// ----------------------------------------------------------------------

type CommentListProps = {
  post: Question;
  removeComment: Function;
  skipQuestion: Function;
};

export default function CommentList({ post, removeComment, skipQuestion }: CommentListProps) {
  const { comments } = post;
  const { user } = useAuth();
  return (
    <Stack style={{ marginTop: '15px' }} spacing={1.5}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          name={comment.user_name}
          avatarUrl={comment.user_image}
          postedAt={comment.time}
          message={comment.text}
          image={comment.image}
          removeComment={removeComment}
          admin={comment.user_id === user?.id || user?.type === 'admin'}
          skipQuestion={skipQuestion}
        />
      ))}
    </Stack>
  );
}
