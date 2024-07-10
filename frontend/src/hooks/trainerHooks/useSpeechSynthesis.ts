// src/hooks/trainerHooks/useSpeechSynthesis.ts
import { useSpeechSynthesis as useSpeechSynthesisBase } from 'react-speech-kit';

const useSpeechSynthesis = () => {
  const { voices } = useSpeechSynthesisBase();
  const getDefaultVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
    const savedVoiceName = localStorage.getItem('defaultVoice');
    if (savedVoiceName) {
      const savedVoice = voices.find((voice) => voice.name === savedVoiceName);
      if (savedVoice) {
        return savedVoice;
      }
    }
    return voices.find((voice) => voice.name === 'Microsoft Ava Online (Natural) - English (United States)') || voices[0];
  };

  return {
    voices,
    getDefaultVoice,
  };
};

export default useSpeechSynthesis;
