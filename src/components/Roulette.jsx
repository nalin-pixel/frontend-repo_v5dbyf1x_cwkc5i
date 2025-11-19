import { useEffect, useMemo, useRef, useState } from 'react';

const defaultSlices = [
  { label: '1UP', color: '#22c55e' },
  { label: 'Coin', color: '#fbbf24' },
  { label: 'Star', color: '#f59e0b' },
  { label: 'Mushroom', color: '#ef4444' },
  { label: 'Flower', color: '#e879f9' },
  { label: 'Shell', color: '#60a5fa' },
];

function Roulette({ backgroundImage }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  const slices = defaultSlices;
  const degPerSlice = 360 / slices.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extraTurns = 6 + Math.floor(Math.random() * 4); // 6-9 turns
    const landingIndex = Math.floor(Math.random() * slices.length);
    const finalAngle = extraTurns * 360 + (360 - landingIndex * degPerSlice) - degPerSlice / 2;

    const wheel = wheelRef.current;
    wheel.style.transition = 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)';
    wheel.style.transform = `rotate(${finalAngle}deg)`;

    const timer = setTimeout(() => {
      setSpinning(false);
      setResult(slices[landingIndex].label);
      clearTimeout(timer);
    }, 4200);
  };

  const sectors = useMemo(() => {
    const radius = 150;
    const center = radius;
    return slices.map((s, i) => {
      const start = i * degPerSlice;
      const largeArc = degPerSlice > 180 ? 1 : 0;
      const x1 = center + radius * Math.cos((Math.PI / 180) * start);
      const y1 = center + radius * Math.sin((Math.PI / 180) * start);
      const x2 = center + radius * Math.cos((Math.PI / 180) * (start + degPerSlice));
      const y2 = center + radius * Math.sin((Math.PI / 180) * (start + degPerSlice));
      const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      return { ...s, path, rotate: start + degPerSlice / 2 };
    });
  }, [slices, degPerSlice]);

  return (
    <div className="w-full">
      <div className="relative mx-auto w-[320px] h-[320px]">
        <div className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-white/20 shadow-2xl" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <svg ref={wheelRef} width="100%" height="100%" viewBox="0 0 300 300" className="transition-transform will-change-transform">
            {sectors.map((sec, i) => (
              <g key={i}>
                <path d={sec.path} fill={sec.color} opacity="0.9" />
                <text x="150" y="150" transform={`rotate(${sec.rotate} 150 150)`} textAnchor="middle" dominantBaseline="middle" fill="#111827" fontSize="14" fontWeight="700">{sec.label}</text>
              </g>
            ))}
          </svg>
        </div>
        {/* Pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-white drop-shadow" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button onClick={spin} disabled={spinning} className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed">
          {spinning ? 'Spinning…' : 'Spin'}
        </button>
        {result && <span className="text-white/90">Result: <strong>{result}</strong></span>}
      </div>
    </div>
  );
}

export default Roulette;
