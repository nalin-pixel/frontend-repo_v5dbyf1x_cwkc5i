import { useEffect, useState } from 'react';

function Customizer({ apiBase, settings, onChange, onSaved }) {
  const [local, setLocal] = useState(settings || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal(settings || {});
  }, [settings]);

  const update = (patch) => {
    const next = { ...local, ...patch };
    setLocal(next);
    onChange?.(next);
  };

  const upload = async (file, key) => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${apiBase}/api/upload`, { method: 'POST', body: form });
    const data = await res.json();
    const url = `${apiBase}${data.url}`; // absolute URL
    update({ [key]: url });
  };

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`${apiBase}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: local.title,
          subtitle: local.subtitle,
          primaryColor: local.primaryColor,
          accentColor: local.accentColor,
          heroLogoUrl: local.heroLogoUrl,
          wheelBgUrl: local.wheelBgUrl,
        }),
      });
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5">
      <h3 className="text-lg font-semibold mb-3">Customize</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Title</span>
          <input value={local.title || ''} onChange={(e)=>update({title: e.target.value})} className="px-3 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Subtitle</span>
          <input value={local.subtitle || ''} onChange={(e)=>update({subtitle: e.target.value})} className="px-3 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Primary color</span>
          <input type="color" value={local.primaryColor || '#ef4444'} onChange={(e)=>update({primaryColor: e.target.value})} className="h-10 w-full rounded" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Accent color</span>
          <input type="color" value={local.accentColor || '#f59e0b'} onChange={(e)=>update({accentColor: e.target.value})} className="h-10 w-full rounded" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white/10 cursor-pointer">
          <div>
            <div className="text-sm">Hero logo</div>
            <div className="text-xs text-slate-400 truncate max-w-[180px]">{local.heroLogoUrl || 'No image'}</div>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={(e)=>upload(e.target.files?.[0], 'heroLogoUrl')} />
          <span className="text-sm opacity-80">Upload</span>
        </label>
        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white/10 cursor-pointer">
          <div>
            <div className="text-sm">Roulette background</div>
            <div className="text-xs text-slate-400 truncate max-w-[180px]">{local.wheelBgUrl || 'No image'}</div>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={(e)=>upload(e.target.files?.[0], 'wheelBgUrl')} />
          <span className="text-sm opacity-80">Upload</span>
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={save} disabled={saving} className="px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 disabled:opacity-60">{saving ? 'Saving…' : 'Save'}</button>
      </div>
    </div>
  );
}

export default Customizer;
