

// //  Web Speech API для записи и проверки произношения
// src/components/trainer/TrainerDetail/Dialogue.tsx
// import React, { useState } from 'react';
// import { Paper, ListItem, IconButton, Tooltip, Box, Grid, Typography, Button } from '@mui/material';
// import { PlayArrow as PlayArrowIcon, Mic as MicIcon, MicOff as MicOffIcon } from '@mui/icons-material';
//
// interface DialogueProps {
//   dialogue: DialogueType;
// }
//
// const Dialogue: React.FC<DialogueProps> = ({ dialogue }) => {
//   const [listening, setListening] = useState(false);
//   const [recognizedText, setRecognizedText] = useState('');
//   const [error, setError] = useState('');
//
//   const playAudio = () => {
//     console.log(`Playing audio for dialogue ID: ${dialogue.id}`);
//   };
//
//   const handleSpeech = () => {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
//
//     recognition.onstart = () => {
//       setListening(true);
//       setRecognizedText('');
//       setError('');
//     };
//
//     recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
//       const speechResult = event.results[0][0].transcript;
//       setRecognizedText(speechResult);
//       setListening(false);
//       compareText(speechResult);
//     };
//
//     recognition.onerror = () => {
//       setError('Ошибка распознавания речи. Попробуйте снова.');
//       setListening(false);
//     };
//
//     recognition.onend = () => {
//       setListening(false);
//     };
//
//     recognition.start();
//   };
//
//   const compareText = (speechResult: string) => {
//     // Простое сравнение текста (вы можете улучшить этот метод для более точного сравнения)
//     if (speechResult.toLowerCase() === dialogue.dialogue.toLowerCase()) {
//       setError('Произношение верное!');
//     } else {
//       setError('Произношение неверное. Попробуйте снова.');
//     }
//   };
//
//   const highlightedText = (text: string) => {
//     const wordsToHighlight = ["Hello", "Hi", "Good morning", "Goodbye", "Bye"];
//     const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
//     const parts = text.split(regex);
//
//     return parts.map((part, index) => (
//       wordsToHighlight.includes(part) ?
//         <Tooltip title="Ключевая фраза" key={index}>
//           <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{part}</Box>
//         </Tooltip> : part
//     ));
//   };
//
//   const renderDialogue = () => {
//     return dialogue.replicas.map((replica, index) => {
//       const isFirstSpeaker = index % 2 === 0;
//       return (
//         <Box
//           key={index}
//           sx={{
//             display: 'flex',
//             justifyContent: isFirstSpeaker ? 'flex-start' : 'flex-end',
//             marginBottom: '10px',
//             '&:not(:last-child)': {
//               marginBottom: '10px',
//             },
//           }}
//         >
//           <Box
//             sx={{
//               // textAlign: isFirstSpeaker ? 'left' : 'right',
//               color: isFirstSpeaker ? 'blue' : 'green',
//               backgroundColor: isFirstSpeaker ? 'rgba(0, 0, 255, 0.1)' : 'rgba(0, 128, 0, 0.1)',
//               borderRadius: '10px',
//               padding: '10px',
//               maxWidth: '75%',
//               boxShadow: 3,
//               border: '1px solid',
//               borderColor: isFirstSpeaker ? 'rgba(0, 0, 255, 0.3)' : 'rgba(0, 128, 0, 0.3)',
//               position: 'relative',
//             }}
//           >
//             <Typography variant="body1" component="div">
//               <Box component="span" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
//                 {isFirstSpeaker ? 'A:' : 'B:'}
//               </Box>
//               {highlightedText(replica.interlocutor_a || replica.interlocutor_b)}
//             </Typography>
//           </Box>
//         </Box>
//       );
//     });
//   };
//
//   return (
//     <ListItem key={dialogue.id}>
//       <Paper variant="outlined" sx={{ padding: '10px', marginBottom: '10px', position: 'relative' }}>
//         <Grid container direction="column" spacing={1}>
//           {renderDialogue()}
//           {recognizedText && (
//             <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
//               Распознанный текст: {recognizedText}
//             </Typography>
//           )}
//           {error && (
//             <Typography variant="body2" color={error === 'Произношение верное!' ? 'green' : 'red'} sx={{ marginTop: '10px' }}>
//               {error}
//             </Typography>
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={listening ? <MicOffIcon /> : <MicIcon />}
//             onClick={handleSpeech}
//             disabled={listening}
//             sx={{ marginTop: '10px' }}
//           >
//             {listening ? 'Остановить' : 'Проверить произношение'}
//           </Button>
//         </Grid>
//         <IconButton onClick={playAudio} sx={{ position: 'absolute', top: '10px', right: '10px' }}>
//           <PlayArrowIcon />
//         </IconButton>
//       </Paper>
//     </ListItem>
//   );
// };
//
// export default Dialogue;




//
// // src/components/trainer/TrainerDetail/Dialogue.tsx
// import React, {useState} from 'react';
// import {Paper, ListItem, IconButton, Tooltip, Box, Grid, Typography, useTheme, Divider, Tabs, Tab} from '@mui/material';
// import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
// import { useSpeechSynthesis } from 'react-speech-kit';
//
//
//
//
// interface DialogueProps {
//   dialogue: DialogueType;
//   defaultVoice: SpeechSynthesisVoice | null;
// }
//
//
// const Dialogue: React.FC<DialogueProps> = (
//     {
//         dialogue,
//         defaultVoice,
//     }
//     ) => {
//   const theme = useTheme();
//   const { speak } = useSpeechSynthesis();
//
//
//   const [selectedTab, setSelectedTab] = useState(0);
//
//   const handleChange = (_event: null, newValue: React.SetStateAction<number>) => {
//       console.log('New selected tab:', newValue);
//     setSelectedTab(newValue);
//   };
//
//   const tabs = dialogue.replicas.flatMap((replica, index) => [
//     <Tab key={`a-${index}`} label={replica.interlocutor_a} value={index * 2} sx={{ fontWeight: 'bold' }} />,
//     <Tab key={`b-${index}`} label={replica.interlocutor_b} value={index * 2 + 1} sx={{ fontWeight: 'bold' }} />,
//   ]);
//
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
//   const renderDialogue = () => {
//     return dialogue.replicas.map((replica, index) => (
//       <Box
//         key={index}
//         sx={{
//           display: 'flex',
//           justifyContent: replica.interlocutor_a ? 'flex-start' : 'flex-end',
//           marginBottom: '10px',
//           [theme.breakpoints.down('sm')]: {
//             flexDirection: 'column',
//             alignItems: 'center',
//             maxWidth: '100%',
//           },
//         }}
//       >
//         {replica.interlocutor_a && (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               color: 'white',
//               backgroundColor: 'rgba(0, 123, 255, 0.9)',
//               borderRadius: '12px',
//               padding: '12px 16px',
//               marginRight: '10px',
//               maxWidth: '75%',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               border: '1px solid rgba(0, 123, 255, 0.5)',
//               transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//                 boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
//               },
//               [theme.breakpoints.down('sm')]: {
//                 marginRight: '0',
//                 marginBottom: '10px',
//                 maxWidth: '100%',
//               },
//             }}
//           >
//             <Typography variant="body1" component="div">
//               <Box component="span" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
//                 собеседник A:
//               </Box>
//               {highlightedText(replica.interlocutor_a)}
//             </Typography>
//             <IconButton
//               onClick={() => speak({ text: replica.interlocutor_a, voice: defaultVoice, rate: 1, pitch: 1 })}
//               sx={{
//                 marginLeft: '10px',
//                 color: 'white',
//                 '&:hover': {
//                   color: 'lightgray',
//                 },
//                 [theme.breakpoints.down('sm')]: {
//                   marginLeft: '0',
//                 },
//               }}
//             >
//               <PlayArrowIcon />
//             </IconButton>
//           </Box>
//         )}
//         {replica.interlocutor_b && (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               color: 'white',
//               backgroundColor: 'rgba(40, 167, 69, 0.9)',
//               borderRadius: '12px',
//               padding: '12px 16px',
//               marginLeft: '10px',
//               maxWidth: '75%',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               border: '1px solid rgba(40, 167, 69, 0.5)',
//               transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//                 boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
//               },
//               [theme.breakpoints.down('sm')]: {
//                 marginLeft: '0',
//                 marginBottom: '10px',
//                 maxWidth: '100%',
//               },
//             }}
//           >
//             <Typography variant="body1" component="div">
//               <Box component="span" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
//                 собеседник B:
//               </Box>
//               {highlightedText(replica.interlocutor_b)}
//             </Typography>
//             <IconButton
//               onClick={() => speak({ text: replica.interlocutor_b, voice: defaultVoice, rate: 1, pitch: 1 })}
//               sx={{
//                 marginLeft: '10px',
//                 color: 'white',
//                 '&:hover': {
//                   color: 'lightgray',
//                 },
//                 [theme.breakpoints.down('sm')]: {
//                   marginLeft: '0',
//                 },
//               }}
//             >
//               <PlayArrowIcon />
//             </IconButton>
//           </Box>
//         )}
//       </Box>
//     ));
//   };
//
//   return (
//     <ListItem key={dialogue.id} sx={{ padding: 0 }}>
//       <Paper
//         variant="outlined"
//         sx={{
//           padding: '24px',
//           marginBottom: '20px',
//           position: 'relative',
//           // backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//           transition: 'box-shadow 0.3s ease-in-out',
//           '&:hover': {
//             boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
//           },
//           [theme.breakpoints.down('sm')]: {
//             padding: 5,
//             margin: 0,
//             width: '100%',
//             overflow: 'hidden',
//           },
//         }}
//       >
//           <Grid container direction="column" spacing={2}>
//               {renderDialogue()}
//           </Grid>
//
//           <Box sx={{ padding: 2 }}>
//               <Typography variant="h4" component="h2" gutterBottom>
//                 Разбор фраз
//               </Typography>
//               <Tabs
//                 value={selectedTab}
//                 onChange={handleChange}
//                 indicatorColor="primary"
//                 textColor="primary"
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 aria-label="dialogue tabs"
//                 sx={{paddingBottom: 5}}
//               >{tabs}
//               </Tabs>
//               <Box>
//                   {dialogue.replicas.map((replica, index) => (
//                     <Box key={index}>
//                       {selectedTab === index * 2 && (
//                         <Box>
//                           {/* Фраза {replica.interlocutor_a} - {replica.translation_a} */}
//                           <Typography variant="h6" component="div" sx={{ marginLeft: 2, paddingBottom: 5,color: "green", fontWeight: 'bold' }}>
//                               {replica.interlocutor_a} - {replica.translater_a}
//                           </Typography>
//                           {replica.interlocutor_a_analysis.map((i, idx) => (
//                             <Typography
//                               key={idx}
//                               variant="body1"
//                               component="div"
//                               sx={{ marginLeft: 2, paddingBottom: 1 }}
//                             >
//                               <span style={{ color: 'darkmagenta', fontWeight: 'bold' }}>
//                                 {i.word}({i.translation})
//                               </span> - {i.analysis}
//                               <Divider />
//                             </Typography>
//                           ))}
//                         </Box>
//                       )}
//                       {selectedTab === index * 2 + 1 && (
//                         <Box>
//                           {/* Фраза {replica.interlocutor_b} - {replica.translation_b} */}
//                           <Typography variant="h6" component="div" sx={{ marginLeft: 2, paddingBottom: 5, color: "green", fontWeight: 'bold' }}>
//                               {replica.interlocutor_b} - {replica.translater_b}
//                           </Typography>
//                           {replica.interlocutor_b_analysis.map((i, idx) => (
//                             <Typography
//                               key={idx}
//                               variant="body1"
//                               component="div"
//                               sx={{ marginLeft: 2, paddingBottom: 1 }}
//                             >
//                               <span style={{ color: 'darkmagenta', fontWeight: 'bold' }}>
//                                 {i.word}({i.translation})
//                               </span> - {i.analysis}
//                               <Divider />
//                             </Typography>
//                           ))}
//                         </Box>
//                       )}
//                     </Box>
//                   ))}
//               </Box>
//           </Box>
//       </Paper>
//     </ListItem>
//   );
// };
//
// export default Dialogue;



// src/components/trainer/TrainerDetail/Dialogue.tsx
import React, { useState } from 'react';
import { Paper, ListItem, Grid, Box, Typography, useTheme } from '@mui/material';
import TabsContainer from './TabsContainer';
import ReplicasList from './ReplicasList';

interface DialogueProps {
  dialogue: DialogueType;
  defaultVoice: SpeechSynthesisVoice | null;
}

const Dialogue: React.FC<DialogueProps> = ({ dialogue, defaultVoice }) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ListItem key={dialogue.id} sx={{ padding: 0 }}>
      <Paper
        variant="outlined"
        sx={{
          padding: '24px',
          marginBottom: '20px',
          position: 'relative',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
          },
          [theme.breakpoints.down('sm')]: {
            paddingTop: 5,
            paddingLeft: 1,
            paddingRight: 1,
            margin: 0,
            width: '100%',
            overflow: 'hidden',
          },
        }}
      >
        <Grid container direction="column" spacing={2}>
          <ReplicasList replicas={dialogue.replicas} defaultVoice={defaultVoice} />
        </Grid>
        <Box sx={{
            padding: 2,
            [theme.breakpoints.down('sm')]: {
                padding: 0,
                marginTop: 5,
            },
        }}
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{fontWeight: 'bold'}}>
            Разбор фраз
          </Typography>
          <TabsContainer
            replicas={dialogue.replicas}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Box>
      </Paper>
    </ListItem>
  );
};

export default Dialogue;
