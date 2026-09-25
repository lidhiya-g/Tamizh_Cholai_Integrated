import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../services/seedData';
import { useLanguage } from '../../context/LanguageContext';

const QuizGame = () => {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;

    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      // Trigger confetti celebration on high score
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={22} color="var(--brand-gold)" />
          <h3 style={{ fontSize: '1.35rem', margin: 0 }}>
            {lang === 'ta' ? 'தமிழ் வினாடி வினா அரங்கம்' : 'Tamil Literary Quiz Challenge'}
          </h3>
        </div>
        {!showResult && (
          <span className="badge badge-gold">
            {lang === 'ta' ? 'கேள்வி' : 'Question'} {currentIndex + 1} / {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {!showResult ? (
        <div>
          {/* Progress bar */}
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div
              style={{
                width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                height: '100%',
                background: 'var(--gradient-gold)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          {/* Question Text */}
          <h4 style={{ fontSize: '1.25rem', lineHeight: 1.5, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            {lang === 'ta' ? currentQ.questionTa : currentQ.questionEn}
          </h4>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = currentQ.correctAnswer === idx;

              let btnBg = 'var(--bg-secondary)';
              let btnBorder = 'var(--border-light)';
              let btnColor = 'var(--text-primary)';

              if (isAnswered) {
                if (isCorrect) {
                  btnBg = 'rgba(16, 185, 129, 0.15)';
                  btnBorder = '#10b981';
                  btnColor = '#059669';
                } else if (isSelected) {
                  btnBg = 'rgba(239, 68, 68, 0.15)';
                  btnBorder = '#ef4444';
                  btnColor = '#dc2626';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  style={{
                    padding: '0.9rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: btnBg,
                    border: `1.5px solid ${btnBorder}`,
                    color: btnColor,
                    fontSize: '1rem',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: isAnswered ? 'default' : 'pointer',
                    transition: 'all 0.15s'
                  }}
                  className={!isAnswered ? 'quiz-option-hover' : ''}
                >
                  <span style={{ fontWeight: 600 }}>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 size={18} color="#10b981" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {isAnswered && (
            <div
              style={{
                background: 'rgba(238, 155, 0, 0.1)',
                borderLeft: '4px solid var(--brand-gold)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)'
              }}
            >
              <strong>{lang === 'ta' ? 'விளக்கம்' : 'Explanation'}:</strong> {currentQ.explanationTa}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleNext} className="btn btn-primary">
                <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? (lang === 'ta' ? 'அடுத்த கேள்வி' : 'Next Question') : (lang === 'ta' ? 'முடிவுகளைக் காண்க' : 'See Results')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(238, 155, 0, 0.15)',
              color: 'var(--brand-gold)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <Award size={44} />
          </div>

          <h4 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
            {score >= 4
              ? (lang === 'ta' ? 'அற்புதம்! செம்மொழிச் செம்மல் பட்டம் உங்களுக்கு!' : 'Magnificent! You scored high!')
              : (lang === 'ta' ? 'நன்றாக முயற்சி செய்தீர்கள்!' : 'Great Effort!')}
          </h4>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {lang === 'ta' ? 'உங்கள் மதிப்பெண்' : 'Your Score'}: <strong>{score} / {QUIZ_QUESTIONS.length}</strong>
          </p>

          <button onClick={handleRestart} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            <RotateCcw size={16} />
            <span>{lang === 'ta' ? 'மீண்டும் விளையாடுக' : 'Play Again'}</span>
          </button>
        </div>
      )}

      <style>{`
        .quiz-option-hover:hover {
          background: rgba(238, 155, 0, 0.08);
          border-color: var(--brand-gold);
        }
      `}</style>
    </div>
  );
};

export default QuizGame;
