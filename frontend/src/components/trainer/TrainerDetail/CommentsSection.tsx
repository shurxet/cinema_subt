// src/components/trainer/TrainerDetail/CommentsSection.tsx
import React from 'react';
import { Typography, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';

interface CommentsSectionProps {
  comments: CommentType[];
  comment: string;
  onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentSubmit: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, comment, onCommentChange, onCommentSubmit }) => (
  <Box mt={4}>
    <Typography variant="h6" gutterBottom>
      Comments
    </Typography>
    <List>
      {comments.map((comment) => (
        <ListItem key={comment.id}>
          <ListItemText primary={comment.text} />
        </ListItem>
      ))}
    </List>
    <TextField
      fullWidth
      label="Add a comment"
      variant="outlined"
      value={comment}
      onChange={onCommentChange}
      multiline
      rows={4}
      sx={{ mt: 2 }}
    />
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
      onClick={onCommentSubmit}
    >
      Submit
    </Button>
  </Box>
);

export default CommentsSection;
