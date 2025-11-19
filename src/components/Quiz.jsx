import { useState } from 'react';

const sampleQuestions = [
  { q: 'Which world is Mario most famous for?', a: ['Mushroom Kingdom', 'Hyrule', 'Kanto'], correct: 0 },
  { q: 'What color is Mario\'s cap?', a: ['Blue', 'Green', 'Red'], correct: 2 },
  { q: 'Who is Mario\'s brother?', a: ['Luigi', 'Toad', 'Wario'], correct: 0 },
];

function Quiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const select = (idx) => {
    if (done) return;
    if (idx === sampleQuestions[step].correct) setScore((s) => s + 1);
    if (step + 1 < sampleQuestions.length) setStep(step + 1);
    else {
      setDone(true);
      onComplete?.(score + (idx === sampleQuestions[step].correct ? 1 : 0));
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 shadow-2xl">
      {!done ? (
        <div>
          <p className="text-sm text-slate-300/80">Question {step + 1} of {sampleQuestions.length}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{sampleQuestions[step].q}</h3>
          <div className="mt-4 grid gap-3">
            {sampleQuestions[step].a.map((opt, i) => (
              <button key={i} onClick={() => select(i)} className="text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-100 transition">
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white">You scored {score}/{sampleQuestions.length}</h3>
          <p className="text-slate-300 mt-2">Great job! Spin the roulette to try your luck.</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
