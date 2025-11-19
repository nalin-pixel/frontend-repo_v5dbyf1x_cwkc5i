import { useState } from 'react';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import Roulette from './components/Roulette';

function App() {
  const [logo, setLogo] = useState(null);
  const [wheelBg, setWheelBg] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero with Spline cover background */}
      <Hero logo={logo} onLogoChange={setLogo} />

      {/* Personalization controls */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 -mt-14">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold">Quick Quiz</h2>
            <p className="text-slate-300/80 mb-4">Answer a few fun questions to warm up.</p>
            <Quiz onComplete={setQuizScore} />
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-bold">Lucky Roulette</h2>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setWheelBg(URL.createObjectURL(file));
                }} />
                <span className="text-sm">Background image</span>
              </label>
            </div>
            <Roulette backgroundImage={wheelBg} />
          </div>
        </div>

        <div className="mt-8 text-center text-slate-300/80">
          {quizScore !== null ? (
            <p>Your quiz score: <span className="font-semibold text-white">{quizScore}</span>. Keep exploring and make it yours by uploading images.</p>
          ) : (
            <p>Tip: You can upload a logo for the cover and a custom background for the roulette.</p>
          )}
        </div>
      </section>

      {/* Footer note */}
      <div className="py-10 text-center text-slate-400/70">
        Crafted for fun — no header, full personalization.
      </div>
    </div>
  );
}

export default App;
