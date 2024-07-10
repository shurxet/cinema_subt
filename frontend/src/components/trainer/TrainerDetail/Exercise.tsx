// src/components/trainer/TrainerDetail/Exercise.tsx
import React, { useState } from 'react';
import {
  Paper, ListItem, ListItemText, IconButton, Collapse, LinearProgress, RadioGroup, FormControl, FormControlLabel,
  Radio, Typography, Box
} from '@mui/material';
import { CheckCircleOutline as CheckCircleOutlineIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface ExerciseProps {
  exercise: ExerciseType;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    setSelectedOption(selectedValue);

    // Check if the selected option is correct
    const correctOption = exercise.suggested_answer.find(option => option.is_correct);
    if (correctOption) {
      const correct = selectedValue === correctOption.option_text;
      setIsCorrect(correct);
      setCompleted(correct); // Mark as completed if the answer is correct
    }
  };

  const formattedQuestion = () => {
    if (selectedOption) {
      const parts = exercise.question.split('____');
      return (
        <span>
          {parts[0]}
          <Box component="span" sx={{ color: isCorrect ? 'green' : 'red' }}>
            {selectedOption}
          </Box>
          {parts[1]}
        </span>
      );
    }
    return exercise.question;
  };

  return (
    <ListItem key={exercise.id}>
      <Paper variant="outlined" sx={{ padding: '10px', marginBottom: '10px', position: 'relative' }}>
        <ListItemText
          primary={<span>Подставте правильное слово: {formattedQuestion()}</span>}
        />
        {/* Modern progress indicator */}
        <LinearProgress
          variant="determinate"
          value={completed ? 100 : 0}
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
          color={isCorrect === null ? 'primary' : (isCorrect ? 'success' : 'error')}
        />
        <IconButton aria-label="toggle details" onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </IconButton>
        <IconButton aria-label="toggle completion" onClick={handleExpandClick}>
          <CheckCircleOutlineIcon color={isCorrect === null ? 'disabled' : (isCorrect ? 'primary' : 'error')} />
        </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {/* Answer options */}
          <FormControl component="fieldset">
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              {exercise.suggested_answer.map((i) => (
                <FormControlLabel
                  key={i.id}
                  value={i.option_text}
                  control={<Radio />}
                  label={i.option_text}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {isCorrect !== null && (
            <Typography variant="subtitle1" color={isCorrect ? 'green' : 'red'}>
              {isCorrect ? 'Верно!' : 'Не верно!'}
            </Typography>
          )}
        </Collapse>
      </Paper>
    </ListItem>
  );
};

export default Exercise;
