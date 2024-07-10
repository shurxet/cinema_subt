// src/components/trainer/hooks/hooksTrainerDetail/useVoiceChange.ts
import React, {useEffect, useState} from 'react';

const useVoiceChange = (voices: SpeechSynthesisVoice[], getDefaultVoice: (voices: SpeechSynthesisVoice[]) => SpeechSynthesisVoice | null) => {
  const [defaultVoice, setDefaultVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (voices.length > 0) {
      const defaultVoice = getDefaultVoice(voices);
      setDefaultVoice(defaultVoice);
    }
  }, [voices, getDefaultVoice]);

  const handleVoiceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const voice = voices.find((v: { name: unknown; }) => v.name === event.target.value);
    if (voice) {
      setDefaultVoice(voice);
      localStorage.setItem('defaultVoice', voice.name);
    }
  };

  return { defaultVoice, handleVoiceChange };
};

export default useVoiceChange;
