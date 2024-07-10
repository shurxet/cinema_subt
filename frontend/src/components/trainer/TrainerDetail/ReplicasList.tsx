// // src/components/trainer/TrainerDetail/ReplicasList.tsx
//
// import React from 'react';
// import {Box, IconButton, Tooltip, Typography, useTheme} from '@mui/material';
// import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
// import { useSpeechSynthesis } from 'react-speech-kit';
//
// interface ReplicasListProps {
//   replicas: ReplicaType[];
//   defaultVoice: SpeechSynthesisVoice | null;
// }
//
// const ReplicasList: React.FC<ReplicasListProps> = ({ replicas, defaultVoice }) => {
//   const theme = useTheme();
//   const { speak } = useSpeechSynthesis();
//
//   const highlightedText = (text: string) => {
//     const wordsToHighlight = ["Hello", "Hi", "Good morning", "Goodbye", "Bye"];
//     const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
//     const parts = text.split(regex);
//
//     return parts.map((part, index) => (
//       wordsToHighlight.includes(part) ? (
//         <Tooltip title="Ключевая фраза" key={index}>
//           <Box component="span" sx={{ color: 'yellow', fontWeight: 'bold' }}>{part}</Box>
//         </Tooltip>
//       ) : (
//         part
//       )
//     ));
//   };
//
//   return (
//     <>
//       {replicas.map((replica, index) => (
//         <Box
//           key={index}
//           sx={{
//             display: 'flex',
//             justifyContent: replica.interlocutor_a ? 'flex-start' : 'flex-end',
//             marginBottom: '10px',
//             [theme.breakpoints.down('sm')]: {
//               flexDirection: 'column',
//               alignItems: 'center',
//               maxWidth: '100%',
//             },
//           }}
//         >
//           {replica.interlocutor_a && (
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 color: 'white',
//                 backgroundColor: 'rgba(0, 123, 255, 0.9)',
//                 borderRadius: '12px',
//                 padding: '12px 16px',
//                 marginRight: '10px',
//                 maxWidth: '75%',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                 border: '1px solid rgba(0, 123, 255, 0.5)',
//                 transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//                 '&:hover': {
//                   transform: 'scale(1.05)',
//                   boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
//                 },
//                 [theme.breakpoints.down('sm')]: {
//                   marginRight: '0',
//                   marginBottom: '10px',
//                   maxWidth: '100%',
//                 },
//               }}
//             >
//               <Typography variant="body1" component="div">
//                 <Box component="span" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
//                   собеседник A:
//                 </Box>
//                 {highlightedText(replica.interlocutor_a)}
//               </Typography>
//               <IconButton
//                 onClick={() => speak({ text: replica.interlocutor_a, voice: defaultVoice, rate: 1, pitch: 1 })}
//                 sx={{
//                   marginLeft: '10px',
//                   color: 'white',
//                   '&:hover': {
//                     color: 'lightgray',
//                   },
//                   [theme.breakpoints.down('sm')]: {
//                     marginLeft: '0',
//                   },
//                 }}
//               >
//                 <PlayArrowIcon />
//               </IconButton>
//             </Box>
//           )}
//           {replica.interlocutor_b && (
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 color: 'white',
//                 backgroundColor: 'rgba(40, 167, 69, 0.9)',
//                 borderRadius: '12px',
//                 padding: '12px 16px',
//                 marginLeft: '10px',
//                 maxWidth: '75%',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                 border: '1px solid rgba(40, 167, 69, 0.5)',
//                 transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//                 '&:hover': {
//                   transform: 'scale(1.05)',
//                   boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
//                 },
//                 [theme.breakpoints.down('sm')]: {
//                   marginLeft: '0',
//                   marginBottom: '10px',
//                   maxWidth: '100%',
//                 },
//               }}
//             >
//               <Typography variant="body1" component="div">
//                 <Box component="span" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
//                   собеседник B:
//                 </Box>
//                 {highlightedText(replica.interlocutor_b)}
//               </Typography>
//               <IconButton
//                 onClick={() => speak({ text: replica.interlocutor_b, voice: defaultVoice, rate: 1, pitch: 1 })}
//                 sx={{
//                   marginLeft: '10px',
//                   color: 'white',
//                   '&:hover': {
//                     color: 'lightgray',
//                   },
//                   [theme.breakpoints.down('sm')]: {
//                     marginLeft: '0',
//                   },
//                 }}
//               >
//                 <PlayArrowIcon />
//               </IconButton>
//             </Box>
//           )}
//         </Box>
//       ))}
//     </>
//   );
// };
//
// export default ReplicasList;




// src/components/trainer/TrainerDetail/ReplicasList.tsx
import React from 'react';
import { Box, useTheme } from '@mui/material';
import Replica from './Replica';

interface ReplicasListProps {
  replicas: ReplicaType[];
  defaultVoice: SpeechSynthesisVoice | null;
}

const ReplicasList: React.FC<ReplicasListProps> = ({ replicas, defaultVoice }) => {
  const theme = useTheme();

  return (
    <>
      {replicas.map((replica, index) => (
        <Box key={index} sx={{
          display: 'flex',
          justifyContent: replica.interlocutor_a ? 'flex-start' : 'flex-end',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
          },
        }}>
          {replica.interlocutor_a && (
            <Replica
              text={replica.interlocutor_a}
              label="собеседник A"
              backgroundColor="rgba(0, 123, 255, 0.9)"
              defaultVoice={defaultVoice}
            />
          )}
          {replica.interlocutor_b && (
            <Replica
              text={replica.interlocutor_b}
              label="собеседник B"
              backgroundColor="rgba(40, 167, 69, 0.9)"
              defaultVoice={defaultVoice}
            />
          )}
        </Box>
      ))}
    </>
  );
};

export default ReplicasList;
