"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type QuizQuestion = {
  year: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
};

type QuizGameProps = {
  questions: QuizQuestion[];
  timeLimit?: number;
  revealCorrect?: number;
  revealWrong?: number;
};

const letters = ["A", "B", "C", "D"];

export default function QuizGame({
  questions,
  timeLimit = 15,
  revealCorrect = 2000,
  revealWrong = 3200,
}: QuizGameProps) {
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gain, setGain] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const revealed = selected !== null;
  const isCorrect = selected === current.answer;
  const timedOut = selected === -1;
  const revealDelay = isCorrect ? revealCorrect : revealWrong;
  const timerPercent = Math.max(0, (timeLeft / timeLimit) * 100);

  useEffect(() => {
    if (finished || revealed) return;
    const id = setTimeout(() => {
      if (timeLeft <= 1) {
        setTimeLeft(0);
        setSelected(-1);
        setStreak(0);
        return;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [timeLeft, revealed, finished]);

  useEffect(() => {
    if (finished || !revealed) return;
    const id = setTimeout(() => {
      if (index === total - 1) {
        setFinished(true);
        return;
      }
      setIndex((value) => value + 1);
      setSelected(null);
      setTimeLeft(timeLimit);
    }, revealDelay);
    return () => clearTimeout(id);
  }, [revealed, finished, index, total, timeLimit, revealDelay]);

  function choose(option: number) {
    if (revealed) return;
    setSelected(option);
    if (option !== current.answer) {
      setStreak(0);
      return;
    }
    const nextStreak = streak + 1;
    const points = 100 + Math.round((timeLeft / timeLimit) * 50) + (nextStreak - 1) * 25;
    setStreak(nextStreak);
    setBestStreak((value) => Math.max(value, nextStreak));
    setCorrectCount((value) => value + 1);
    setScore((value) => value + points);
    setGain(points);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setGain(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setTimeLeft(timeLimit);
    setFinished(false);
  }

  const timerClass = timeLeft <= timeLimit * 0.25 ? " is-danger" : timeLeft <= timeLimit * 0.5 ? " is-warning" : "";

  if (finished) {
    return (
      <section className="quiz-panel" aria-label="Hasil kuis pergerakan nasional">
        <motion.div
          className="result"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="result-icon" aria-hidden="true">✦</span>
          <p className="small-label">TANTANGAN SELESAI</p>
          <h2>{correctCount >= 8 ? "Hebat, kamu paham materinya!" : correctCount >= 5 ? "Bagus, terus pelajari sejarahnya!" : "Ayo coba lagi!"}</h2>
          <p className="result-score"><strong>{score}</strong> poin</p>
          <div className="result-stats">
            <div><strong>{correctCount}/{total}</strong><span>Jawaban benar</span></div>
            <div><strong>{bestStreak}</strong><span>Streak terbaik</span></div>
            <div><strong>{Math.round((correctCount / total) * 100)}%</strong><span>Akurasi</span></div>
          </div>
          <p className="result-copy">Setiap soal membantu mengingat perjalanan dari Budi Utomo hingga Sumpah Pemuda.</p>
          <button type="button" className="next-button" onClick={restart}>Main lagi <span aria-hidden="true">↻</span></button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="quiz-panel" aria-label="Kuis pergerakan nasional">
      <div className="quiz-head">
        <div>
          <span className="small-label">SOAL {String(index + 1).padStart(2, "0")} / {total}</span>
          <span className="topic-tag">{current.topic}</span>
        </div>
        <div className="quiz-stats">
          <motion.span
            key={streak}
            className={`streak-badge${streak > 0 ? " is-hot" : ""}`}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
          >
            <span aria-hidden="true">🔥</span> {streak}
          </motion.span>
          <span className="live-score">Skor <strong>{score}</strong></span>
        </div>
      </div>
      <div className="progress-track" role="progressbar" aria-label="Kemajuan kuis" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total}>
        <span style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <p className="question-year">{current.year} <span aria-hidden="true">/</span> PILIH SATU JAWABAN</p>
      <div className="timer-row">
        {revealed ? (
          <div className={`timer-track is-reveal ${isCorrect ? "is-correct" : "is-wrong"}`}>
            <motion.span
              key={`reveal-${index}`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: revealDelay / 1000, ease: "linear" }}
            />
          </div>
        ) : (
          <div className={`timer-track${timerClass}`}>
            <span style={{ width: `${timerPercent}%` }} />
          </div>
        )}
        <span className="timer-count">{revealed ? (index === total - 1 ? "Lihat hasil…" : "Soal berikutnya…") : `⏱ ${timeLeft}s`}</span>
      </div>
      <h2>{current.question}</h2>
      <div className="options">
        {current.options.map((option, optionIndex) => {
          const state = !revealed ? "" : optionIndex === current.answer ? "correct" : optionIndex === selected ? "incorrect" : "dimmed";
          return (
            <button key={option} type="button" disabled={revealed} className={`option ${state}`} onClick={() => choose(optionIndex)} aria-pressed={selected === optionIndex}>
              <span className="option-letter">{revealed && optionIndex === current.answer ? "✓" : revealed && optionIndex === selected ? "✗" : letters[optionIndex]}</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      <div className="feedback-slot">
        {revealed && (
          <motion.div
            className={`answer-note ${isCorrect ? "is-correct" : "is-incorrect"}`}
            role="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>
              {isCorrect ? <>Tepat! <span className="note-gain">+{gain} poin</span></> : timedOut ? "Waktu habis!" : "Belum tepat."}
            </strong>
            <p>{current.explanation}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
