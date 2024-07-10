// src/pages/trainer/TrainerDetailPage/TrainerDetailPage.tsx
import React from 'react';
import {
  CircularProgress,
  Container,
  Alert,
  Box,
  Paper,
  Snackbar,
  Fab,
  useTheme,
  Typography,
  List,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrainerHeader from "../../../components/trainer/TrainerDetail/TrainerHeader.tsx";
import TrainerRating from "../../../components/trainer/TrainerDetail/TrainerRating.tsx";
import VoiceSelector from "../../../components/trainer/TrainerDetail/VoiceSelector.tsx";
import TrainerTabs from "../../../components/trainer/TrainerDetail/TrainerTabs.tsx";
import Section from "../../../components/trainer/TrainerDetail/Section.tsx";
import Exercise from "../../../components/trainer/TrainerDetail/Exercise.tsx";
import CommentsSection from "../../../components/trainer/TrainerDetail/CommentsSection.tsx";
import useSpeechSynthesis from "../../../hooks/trainerHooks/useSpeechSynthesis.ts";
import AlertSnackbar from "../../../components/trainer/TrainerDetail/AlertSnackbar.tsx";
import useVoiceChange from "../../../components/trainer/hooks/hooksTrainerDetail/useVoiceChange.ts";
import useCommentSubmit from "../../../components/trainer/hooks/hooksTrainerDetail/useCommentSubmit.ts";
import useSnackbarClose from "../../../components/trainer/hooks/hooksTrainerDetail/useSnackbarClose.ts";
import useTabChange from "../../../components/trainer/hooks/hooksTrainerDetail/useTabChange.ts";
import useTrainerDetail from "../../../hooks/trainerHooks/useTrainerDetail.ts";
import { containerStyle, paperStyle } from './TrainerDetailPage.styles.ts';
import MotionWrapper from "../../../components/common/wrappers/MotionWrapper.tsx";

const TrainerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const itemId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const theme = useTheme();

  const { lesson, loading, error } = useTrainerDetail(itemId);
  const { voices, getDefaultVoice } = useSpeechSynthesis();
  const { defaultVoice, handleVoiceChange } = useVoiceChange(voices, getDefaultVoice);
  const { comment, comments, openSnackbar, setComment, handleCommentSubmit, setOpenSnackbar } = useCommentSubmit();
  const { handleSnackbarClose, handleAlertClose } = useSnackbarClose(setOpenSnackbar);
  const { selectedTab, handleTabChange } = useTabChange();

  if (loading)
    return (
      <Container sx={containerStyle} maxWidth={false}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={containerStyle} maxWidth={false}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container
      sx={{
        [theme.breakpoints.down('sm')]: {
          padding: '0',
        },
      }}
    >
      {lesson && (
        <Box
          mt={4}
          sx={{
            maxWidth: '100%',
          }}
        >
          <MotionWrapper>
            <Paper elevation={3} sx={paperStyle}>
              <TrainerHeader title={lesson.title} description={lesson.description} />
              <TrainerRating rating={4.5} onRatingChange={() => {}} />
              {voices.length > 0 && (
                <VoiceSelector
                  defaultVoice={defaultVoice?.name || ''}
                  voices={voices}
                  onVoiceChange={handleVoiceChange}
                />
              )}
              <TrainerTabs sections={lesson.sections} selectedTab={selectedTab} onTabChange={handleTabChange} />
              {lesson.sections.map((section, index) => (
                <Box
                  key={section.id}
                  role="tabpanel"
                  hidden={selectedTab !== index}
                  id={`tabpanel-${section.id}`}
                  aria-labelledby={`tab-${section.id}`}
                >
                  {selectedTab === index && (
                    <Box p={0}>
                      <Section
                        key={section.id}
                        section={section}
                        defaultVoice={defaultVoice}
                        voices={voices}
                        handleVoiceChange={handleVoiceChange}
                      />
                    </Box>
                  )}
                </Box>
              ))}
              {selectedTab === lesson.sections.length && (
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Упражнения
                  </Typography>
                  <List>
                    {lesson.exercises.flatMap((exercise) => (
                      <Exercise key={exercise.id} exercise={exercise} />
                    ))}
                  </List>
                </Box>
              )}
              <CommentsSection
                comments={comments}
                comment={comment}
                onCommentChange={(e) => setComment(e.target.value)}
                onCommentSubmit={handleCommentSubmit}
              />
            </Paper>
          </MotionWrapper>
        </Box>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <AlertSnackbar onClose={handleAlertClose} severity="success">
          Comment added successfully!
        </AlertSnackbar>
      </Snackbar>
      <Fab color="primary" aria-label="back" sx={{ position: 'fixed', bottom: 16, left: 16 }} onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </Fab>
    </Container>
  );
};

export default TrainerDetailPage;
