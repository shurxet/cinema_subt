// src/components/trainer/hooks/useCommentSubmit.ts
import { useState } from 'react';

const useCommentSubmit = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleCommentSubmit = () => {
    if (comment) {
      setComments([...comments, { id: comments.length + 1, text: comment }]);
      setComment('');
      setOpenSnackbar(true);
    }
  };

  return { comment, comments, openSnackbar, setComment, handleCommentSubmit, setOpenSnackbar };
};

export default useCommentSubmit;
