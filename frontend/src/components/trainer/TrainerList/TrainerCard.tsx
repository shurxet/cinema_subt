// src/components/trainer/TrainerList/TrainerCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface TrainerCardProps {
    lesson: TrainerListType;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ lesson }) => {
  const scaleValue = 0.7; // Adjust this value to scale the card

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '1 20px 40px rgba(0,0,0,0.3)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ transform: `scale(${scaleValue})`, transformOrigin: 'top left', width: '25rem' }}>
        <Card sx={{
            width: '100%',
            display: 'flex',
            borderRadius: '20px',
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            transition: 'transform 0.3s, box-shadow 0.3s',
        }}>
          <CardMedia
            component="img"
            sx={{
              width: '50%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              objectFit: 'cover',
              objectPosition: 'center',
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${lesson.image || 'fallback_image_url_here'})`
            }}
            src={lesson.image || 'fallback_image_url_here'}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <CardContent sx={{ textAlign: 'center', backgroundColor: '#f5f5f5', padding: '24px', flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '8px', fontFamily: 'Roboto, sans-serif' }}>
                {lesson.title}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', backgroundColor: '#f5f5f5', paddingBottom: '24px' }}>
              <Button
                size="large"
                component={Link}
                to={`/trainer/${lesson.id}`}
                startIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  padding: '12px 30px',
                  transition: 'background 0.3s, transform 0.3s',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FE6B8B 40%, #FF8E53 100%)',
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                Подробнее
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
};

export default TrainerCard;
