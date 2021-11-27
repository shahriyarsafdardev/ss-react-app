// material
import { Box, List } from '@material-ui/core';
// @types
import { Question } from '../../../@types/cohorts';
//
import CommentItem from './CommentItem';

// ----------------------------------------------------------------------

type CommentListProps = {
  post: Question;
};

export default function CommentList({ post }: CommentListProps) {
  const { comments } = post;

  return (
    <List disablePadding>
      {comments.map((comment) => (
        <Box key={comment.id} sx={{}}>
          <CommentItem
            name={comment.user_name}
            avatarUrl={comment.user_image}
            postedAt={comment.time}
            message={comment.text}
          />
        </Box>
      ))}
    </List>
  );
}
