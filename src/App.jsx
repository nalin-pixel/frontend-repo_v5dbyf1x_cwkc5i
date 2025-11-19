import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import Roulette from './components/Roulette';
import Customizer from './components/Customizer';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

function App() {
  const [settings, setSettings] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/settings`);
        const data = await res.json();
        setSettings(data);
      } catch (e) {
        // Fallback default if backend not ready
        setSettings({
          title: 'Playful Mario‑vibe Game Hub',
          subtitle: 'A vibrant landing page with a quiz and a roulette game. Fully personalized — bring your own images and style.',
          primaryColor: '#ef4444',
          accentColor: '#f59e0b',
          heroLogoUrl: null,
          wheelBgUrl: null,
        });
      }
    };
    load();
  }, []);

  const cssVars = useMemo(() => ({
    '--primary': settings?.primaryColor || '#ef4444',
    '--accent': settings?.accentColor || '#f59e0b',
  }), [settings]);

  if (!settings) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading…</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={cssVars}>
      {/* Hero with Spline cover background */}
      <Hero logo={settings.heroLogoUrl} onLogoChange={(url)=>setSettings((s)=>({ ...s, heroLogoUrl: url }))} />

      {/* Single centralized games section */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 -mt-14">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold" style={{ color: 'var(--primary)' }}>{settings.title}</h2>
            <p className="text-slate-300/80 mt-2">{settings.subtitle}</p>
          </div>

          {/* Sequential games: Quiz then Roulette */}
          <div className="space-y-6">
            <div className="rounded-xl bg-slate-900/60 border border-white/10 p-5">
              <h3 className="text-xl font-semibold" style={{ color: 'var(--accent)' }}>Quick Quiz</h3>
              <p className="text-slate-300/80 mb-4">Answer a few fun questions to warm up.</p>
              <Quiz onComplete={setQuizScore} />
            </div>

            <div className="rounded-xl bg-slate-900/60 border border-white/10 p-5">
              <h3 className="text-xl font-semibold" style={{ color: 'var(--accent)' }}>Lucky Roulette</h3>
              <Roulette backgroundImage={settings.wheelBgUrl} />
            </div>

            {quizScore !== null && (
              <div className="text-center text-slate-300/80">
                Your quiz score: <span className="font-semibold text-white">{quizScore}</span>
              </div>
            )}
          </div>
        </div>

        {/* No-code customization panel */}
        <div className="mt-6">
          <Customizer apiBase={API_BASE} settings={settings} onChange={setSettings} onSaved={async()=>{
            const res = await fetch(`${API_BASE}/api/settings`);
            const fresh = await res.json();
            setSettings(fresh);
          }} />
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
