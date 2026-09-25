import { useState, useEffect, useCallback } from 'react';

/**
 * Custom Hook for Tamil Text-to-Speech (TTS) using Web Speech API.
 */
export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback((text, rate = 0.85, pitch = 1.0) => {
    if (!isSupported || !text) return;

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Find best Tamil voice if present
    const tamilVoice = voices.find(
      (v) => v.lang.startsWith('ta') || v.name.toLowerCase().includes('tamil')
    );

    if (tamilVoice) {
      utterance.voice = tamilVoice;
      utterance.lang = tamilVoice.lang;
    } else {
      utterance.lang = 'ta-IN';
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, voices]);

  return { speak, stop, isSpeaking, isSupported };
};
