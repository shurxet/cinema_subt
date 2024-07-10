// src/components/trainer/TrainerDetail/ReplicaContent.tsx
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface AnalysisContentProps {
  word: string;
  translation: string;
  analysis: string;
}

const AnalysisContent: React.FC<AnalysisContentProps> = ({ word, translation, analysis }) => (
  <Typography variant="body1" component="div" sx={{ paddingBottom: 3 }}>
    <span style={{ color: 'darkmagenta', fontWeight: 'bold' }}>
      {word}({translation})
    </span> - {analysis}
    <Divider />
  </Typography>
);

interface ReplicaContentProps {
  text: string;
  translation: string;
  analysis: { word: string; translation: string; analysis: string }[];
}

const ReplicaContent: React.FC<ReplicaContentProps> = ({ text, translation, analysis }) => (
  <>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, width: '100%' }}>
    <Typography variant="h6" component="div" sx={{ textAlign: 'center', padding: 1, color: "green", fontWeight: 'bold' }}>
        {text}
    </Typography>
    <Typography variant="h6" component="div" sx={{ textAlign: 'center', padding: 1, color: "darkmagenta", fontWeight: 'bold' }}>
        {translation}
    </Typography>
  </Box>
    <Box sx={{ marginTop: 5, marginBottom: 2, padding: 1 }}>
    {analysis.map((item, idx) => (
      <AnalysisContent key={idx} {...item} />
    ))}
    </Box>
  </>
);

export default ReplicaContent;
