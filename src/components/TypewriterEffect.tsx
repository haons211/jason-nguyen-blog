'use client';

import { useState, useEffect } from 'react';

type TypewriterEffectProps = {
  sentences: string[];
  speed?: number;
  pauseBetweenSentences?: number;
  className?: string;
};

export default function TypewriterEffect({ 
  sentences, 
  speed = 50, 
  pauseBetweenSentences = 1000,
  className = ""
}: TypewriterEffectProps) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (currentSentenceIndex >= sentences.length) {
      // Loop back to first sentence
      setCurrentSentenceIndex(0);
      setCurrentText('');
      setIsTyping(true);
      setIsErasing(false);
      return;
    }

    const currentSentence = sentences[currentSentenceIndex];
    
    if (isTyping && !isErasing) {
      // Typing phase
      if (currentText.length < currentSentence.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentSentence.slice(0, currentText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause then start erasing
        const timeout = setTimeout(() => {
          setIsTyping(false);
          setIsErasing(true);
        }, pauseBetweenSentences);
        return () => clearTimeout(timeout);
      }
    } else if (isErasing) {
      // Erasing phase
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, speed / 2); // Erase faster than typing
        return () => clearTimeout(timeout);
      } else {
        // Finished erasing, move to next sentence
        const timeout = setTimeout(() => {
          setCurrentSentenceIndex(currentSentenceIndex + 1);
          setIsTyping(true);
          setIsErasing(false);
        }, 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, currentSentenceIndex, isTyping, isErasing, sentences, speed, pauseBetweenSentences]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
