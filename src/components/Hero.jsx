import Spline from '@splinetool/react-spline';

function Hero({ logo, onLogoChange }) {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onLogoChange(url);
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/OIGfFUmCnZ3VD8gH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-slate-900/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {logo ? (
          <img src={logo} alt="Custom logo" className="w-28 h-28 rounded-xl shadow-xl ring-2 ring-white/20 object-cover mb-5" />
        ) : (
          <div className="mb-5" />
        )}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]">
          Playful Mario‑vibe Game Hub
        </h1>
        <p className="mt-4 max-w-2xl text-slate-200/90">
          A vibrant landing page with a quiz and a roulette game. Fully personalized — bring your own images and style.
        </p>

        <label className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 16a4 4 0 100-8 4 4 0 000 8z"/><path fillRule="evenodd" d="M19.5 6a3 3 0 01-3-3h-9a3 3 0 01-3 3v12a3 3 0 003 3h9a3 3 0 003-3V6zm-7.5 0a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd"/></svg>
          Upload a logo
        </label>
      </div>
    </section>
  );
}

export default Hero;
