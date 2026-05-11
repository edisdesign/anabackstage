import React, { useState, useRef, useEffect } from 'react';
import { commitFile, uploadImage } from '@/lib/githubApi';
import { useAdminContent, AdminContent, LocalizedString, ServiceItem, AcademyCertificate } from '@/app/context/AdminContentContext';
import { BlogPost, blogPosts as originalPosts } from '@/app/data/blogPosts';
import { LogOut, Plus, Edit2, Trash2, Save, Eye, EyeOff, Upload, X, Loader2, Languages, Copy } from 'lucide-react';
import {
  heroImg1, heroImg2, heroImg3, heroImg4,
  aboutImg,
  galImg1, galImg2, galImg3, galImg4, galImg5, galImg6, galImg7,
  galImg8, galImg9, galImg10, galImg11, galImg12, galImg13,
  svcClassicMakeup, svcSpecialOccasion, svcClassicHair, svcHairWaves, svcSpecialHair, svcHijab,
  certificateImg,
} from '@/app/data/staticImages';

const ORIG_HERO = [heroImg1, heroImg2, heroImg3, heroImg4];
const ORIG_GALLERY = [galImg12, galImg3, galImg8, galImg11, galImg5, galImg9, galImg13, galImg7, galImg1, galImg10, galImg4, galImg2, galImg6];
const ORIG_SERVICES = [
  { key: 'classic_makeup', name: 'Klasični Make up', price: '3500 din', img: svcClassicMakeup },
  { key: 'special_makeup', name: 'Make up za posebne prilike', price: '6000 din', img: svcSpecialOccasion },
  { key: 'hijab', name: 'Stilizovanje hidžaba', price: '3000 din', img: svcHijab },
  { key: 'classic_hair', name: 'Klasične frizure', price: '1000–2000 din', img: svcClassicHair },
  { key: 'special_hair', name: 'Svečane frizure', price: '2000–5000 din', img: svcSpecialHair },
  { key: 'waves', name: 'Talasi', price: '1000–2500 din', img: svcHairWaves },
];

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'anabackstage2024';
const SESSION_KEY = 'ab_admin_session';

// ─── Auto-translate via MyMemory (free, no key) ──────────────────────────────
async function autoTranslate(text: string, from: string, to: string): Promise<string> {
  if (!text.trim()) return '';
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    );
    const data = await res.json();
    return data.responseData?.translatedText || text;
  } catch { return text; }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const generateId = () => `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const emptyLS = (): LocalizedString => ({ sr: '', en: '', de: '' });
const emptyPost = (): BlogPost => ({
  id: generateId(), image: '', video: '',
  date: new Date().toISOString().split('T')[0],
  title: emptyLS(), category: emptyLS(), content: emptyLS(),
});

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ msg, type }: { msg: string; type: 'success' | 'error' | 'info' }) => (
  <div className={`fixed bottom-6 right-6 z-[9999] border px-5 py-3 text-sm font-medium rounded shadow-xl max-w-sm ${
    type === 'success' ? 'bg-emerald-900 border-emerald-500 text-emerald-100' :
    type === 'error' ? 'bg-red-900 border-red-500 text-red-100' :
    'bg-zinc-800 border-zinc-500 text-zinc-100'
  }`}>{msg}</div>
);

// ─── Image Uploader ───────────────────────────────────────────────────────────
const ImageUploader = ({ label, value, onChange, onToast }: {
  label: string; value: string;
  onChange: (url: string) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true); onToast('Uploadujem...', 'info');
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const result = await uploadImage(filename, base64, `Admin: upload ${filename}`);
      onChange(result.success && result.url ? result.url : base64);
      onToast(result.success ? '✅ Slika uploadovana!' : '⚠️ Lokalni preview (neće biti na sajtu)', result.success ? 'success' : 'error');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-widest text-zinc-400">{label}</label>
      <div className="flex gap-2 items-start">
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          placeholder="URL ili upload →"
          className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]" />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-1 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs rounded transition-colors disabled:opacity-50">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {value && <img src={value} alt="" className="h-20 object-cover rounded border border-zinc-700" />}
    </div>
  );
};

// ─── Localized Field with Auto-translate ──────────────────────────────────────
const LocalizedField = ({ label, value, onChange, multiline = false, onToast }: {
  label: string;
  value: LocalizedString;
  onChange: (v: LocalizedString) => void;
  multiline?: boolean;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) => {
  const [tab, setTab] = useState<'sr' | 'en' | 'de'>('sr');
  const [translating, setTranslating] = useState(false);

  const handleAutoTranslate = async () => {
    if (!value.sr.trim()) { onToast('Upiši tekst na srpskom prvo', 'error'); return; }
    setTranslating(true);
    onToast('Prevodim...', 'info');
    const [en, de] = await Promise.all([
      autoTranslate(value.sr, 'sr', 'en'),
      autoTranslate(value.sr, 'sr', 'de'),
    ]);
    onChange({ ...value, en, de });
    onToast('✅ Prevod gotov!', 'success');
    setTranslating(false);
  };

  const Input = multiline ? 'textarea' : 'input';

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-widest text-zinc-400">{label}</label>
        <button type="button" onClick={handleAutoTranslate} disabled={translating}
          className="flex items-center gap-1 text-[10px] text-[#d4af37] hover:underline disabled:opacity-50">
          {translating ? <Loader2 size={10} className="animate-spin" /> : <Languages size={10} />}
          Auto-prevedi EN+DE
        </button>
      </div>
      <div className="flex gap-1 mb-1">
        {(['sr', 'en', 'de'] as const).map(t => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`px-3 py-1 text-xs rounded font-bold transition-colors ${tab === t ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <Input value={value[tab]} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...value, [tab]: e.target.value })}
        {...(multiline ? { rows: 7 } : {})}
        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37] resize-y" />
      {tab === 'sr' && value.en && (
        <p className="text-[10px] text-zinc-500 mt-1">EN: {value.en.slice(0, 80)}{value.en.length > 80 ? '...' : ''}</p>
      )}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
type Tab = 'hero' | 'omeni' | 'galerija' | 'blog';

export const AdminPage = () => {
  const { adminContent, setAdminContent } = useAdminContent();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'omeni' | 'galerija' | 'usluge' | 'akademija' | 'blog'>('hero');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [saving, setSaving] = useState(false);

  // Local state per section
  const [hero, setHero] = useState(adminContent.hero);
  const [aboutImage, setAboutImage] = useState(adminContent.aboutImage);
  const [aboutBio, setAboutBio] = useState<LocalizedString>(adminContent.aboutBio || emptyLS());
  const [galleryImages, setGalleryImages] = useState<string[]>(adminContent.galleryImages || []);
  const [hiddenGalleryIds, setHiddenGalleryIds] = useState<number[]>(adminContent.hiddenGalleryIds || []);
  const [services, setServices] = useState<ServiceItem[]>(adminContent.services || []);
  const [servicePrices, setServicePrices] = useState<Record<string,string>>(adminContent.servicePrices || {});
  const [academyCert, setAcademyCert] = useState<AcademyCertificate>(adminContent.academyCertificate);
  const [posts, setPosts] = useState<BlogPost[]>(adminContent.blogPosts || []);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  useEffect(() => {
    setHero(adminContent.hero);
    setAboutImage(adminContent.aboutImage || '');
    const existingBio = adminContent.aboutBio;
    if (!existingBio?.sr) {
      setAboutBio({
        sr: 'Ana Muratović – nežna ruka iza snažne lepote. Makeup & Hijab artist koja još od trinaeste godine kroz šminku, kosu i hijab ističe prirodnu ženstvenost. Kreatorka lepote, mentorka budućih umetnica i osnivač škole šminkanja sa individualnim pristupom svakoj učenici. Suptilno, elegantno i sa dušom.\n\nNjen pristup nije samo nanošenje šminke, već razumevanje geometrije lica — filozofija koju prenosi svakom studentu na svojoj akademiji.',
        en: 'Ana Muratović – a gentle hand behind strong beauty. A Makeup & Hijab artist who, since the age of thirteen, has been highlighting natural femininity through makeup, hair, and hijab. A creator of beauty, mentor to future artists, and founder of a makeup school with an individual approach to every student. Subtle, elegant, and with soul.\n\nHer approach is not just about application, but about understanding the geometry of the face—a philosophy she imparts to every student at her academy.',
        de: 'Ana Muratović – eine sanfte Hand hinter starker Schönheit. Eine Make-up- & Hidschab-Künstlerin, die seit ihrem dreizehnten Lebensjahr durch Make-up, Haare und Hidschab die natürliche Weiblichkeit hervorhebt. Eine Schöpferin der Schönheit, Mentorin zukünftiger Künstlerinnen und Gründerin einer Make-up-Schule. Subtil, elegant und mit Seele.\n\nIhr Ansatz besteht nicht nur im Auftragen, sondern im Verständnis der Geometrie des Gesichts.',
      });
    } else {
      setAboutBio(existingBio);
    }
    setGalleryImages(adminContent.galleryImages || []);
    setHiddenGalleryIds(adminContent.hiddenGalleryIds || []);
    setServices(adminContent.services || []);
    setServicePrices(adminContent.servicePrices || {});
    setAcademyCert(adminContent.academyCertificate);
    setPosts(adminContent.blogPosts || []);
  }, [adminContent]);

  const showToast = (msg: string, type: 'success' | 'error' | 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const save = async (overrides?: Partial<AdminContent>) => {
    setSaving(true);
    const content: AdminContent = {
      hero, blogPosts: posts, aboutImage, aboutBio, galleryImages,
      hiddenGalleryIds, services, servicePrices, academyCertificate: academyCert,
      ...overrides,
    };
    const result = await commitFile(
      'public/admin-content.json',
      JSON.stringify(content, null, 2),
      `Admin: izmena sadrzaja ${new Date().toLocaleString('sr')}`
    );
    if (result.success) {
      setAdminContent(content);
      showToast('✅ Sačuvano! Deploy u toku (~30 sek)', 'success');
    } else {
      showToast(`❌ ${result.error}`, 'error');
    }
    setSaving(false);
  };

  // ─── Login ─────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <a href="/" className="absolute top-6 right-6 p-2 text-zinc-600 hover:text-white transition-colors" title="Nazad na sajt">
          <X size={20} />
        </a>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] mb-2">Ana Backstage</p>
            <h1 className="text-white text-2xl font-serif">Admin Panel</h1>
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) { sessionStorage.setItem(SESSION_KEY, '1'); setAuthed(true); }
            else showToast('Pogrešna lozinka', 'error');
          }} className="space-y-4">
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)} placeholder="Lozinka" autoFocus
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 pr-12 rounded focus:outline-none focus:border-[#d4af37] text-sm" />
              <button type="button" onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button type="submit"
              className="w-full bg-[#d4af37] hover:bg-[#c4a030] text-black font-bold uppercase tracking-widest text-xs py-3 rounded transition-colors">
              Prijavi se
            </button>
          </form>
        </div>
        {toast && <Toast {...toast} />}
      </div>
    );
  }

  type Tab = 'hero' | 'omeni' | 'galerija' | 'usluge' | 'akademija' | 'blog';

  const tabs: { key: Tab; label: string }[] = [
    { key: 'hero', label: '🖼️ Hero' },
    { key: 'omeni', label: '👤 O meni' },
    { key: 'galerija', label: '🎓 Galerija' },
    { key: 'usluge', label: '💅 Usluge' },
    { key: 'akademija', label: '🏆 Akademija' },
    { key: 'blog', label: '📝 Blog' },
  ];

  const SaveBtn = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-8 py-3 bg-[#d4af37] hover:bg-[#c4a030] disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs rounded transition-colors">
      {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
      {saving ? 'Čuvam...' : 'Sačuvaj i deploy-uj'}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-50">
        <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em]">Ana Backstage · Admin</span>
        <button onClick={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }}
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs transition-colors">
          <LogOut size={14} /> Odjavi se
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-zinc-800">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-5 py-3 text-xs uppercase tracking-widest font-bold transition-colors border-b-2 -mb-px ${
                activeTab === t.key ? 'border-[#d4af37] text-[#d4af37]' : 'border-transparent text-zinc-500 hover:text-white'
              }`}>{t.label}</button>
          ))}
        </div>

        {/* ── HERO ── */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-serif mb-1">Hero Sekcija</h2>
              <p className="text-zinc-500 text-xs">Originalne slike su uvek u pozadini. Ako dodaš nove, one zamenjuju originalne. Klikni na sliku da je zameniš.</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Trenutne slike (originalne)</p>
              <div className="grid grid-cols-4 gap-2">
                {ORIG_HERO.map((src, i) => (
                  <div key={i} className="relative group aspect-[3/4]">
                    <img src={src} alt={`Hero ${i+1}`} className="w-full h-full object-cover rounded border border-zinc-700" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                      <label className="cursor-pointer text-[10px] text-white text-center px-1">
                        <Upload size={14} className="mx-auto mb-1" />
                        Zameni
                        <input type="file" accept="image/*" className="hidden" onChange={async e => {
                          const file = e.target.files?.[0]; if (!file) return;
                          const reader = new FileReader();
                          reader.onload = async () => {
                            const base64 = reader.result as string;
                            const result = await uploadImage(`${Date.now()}-hero${i}.${file.name.split('.').pop()}`, base64, 'Admin: hero image');
                            const url = result.success && result.url ? result.url : base64;
                            const imgs = [...(hero.images.length ? hero.images : [...ORIG_HERO])];
                            imgs[i] = url;
                            setHero({ ...hero, images: imgs });
                            showToast('✅ Slika ažurirana — klikni Sačuvaj', 'success');
                          };
                          reader.readAsDataURL(file);
                        }} />
                      </label>
                    </div>
                    {hero.images[i] && hero.images[i] !== src && (
                      <div className="absolute top-1 left-1 bg-[#d4af37] text-black text-[8px] px-1 rounded">NOVO</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {hero.images.some(Boolean) && (
              <button onClick={() => setHero({ ...hero, images: [] })} className="text-xs text-red-400 hover:underline">
                ✕ Vrati originalne slike
              </button>
            )}

            <div className="grid gap-4 pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Tekst override (opciono)</p>
              {[
                { field: 'subtitle', label: 'Subtitle (sitni tekst iznad naslova)' },
                { field: 'title', label: 'Naslov (1. red)' },
                { field: 'beauty', label: 'Zlatni tekst (2. red, italic)' },
                { field: 'description', label: 'Opis ispod naslova' },
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">{label}</label>
                  <input type="text" value={(hero as any)[field]}
                    onChange={e => setHero({ ...hero, [field]: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]" />
                </div>
              ))}
            </div>
            <SaveBtn onClick={() => save({ hero })} />
          </div>
        )}

        {/* ── O MENI ── */}
        {activeTab === 'omeni' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-serif mb-1">O meni</h2>
              <p className="text-zinc-500 text-xs">Klikni na sliku da je zameniš. Tekst piši na srpskom, klikni Auto-prevedi.</p>
            </div>

            {/* Photo with click-to-replace overlay */}
            <div className="relative group w-48 aspect-[3/4] mx-auto">
              <img src={aboutImage || aboutImg} alt="O meni" className="w-full h-full object-cover border border-zinc-700 rounded" />
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer rounded">
                <Upload size={20} className="text-white mb-1" />
                <span className="text-white text-xs">Zameni sliku</span>
                <input type="file" accept="image/*" className="hidden" onChange={async e => {
                  const file = e.target.files?.[0]; if (!file) return;
                  showToast('Uploadujem...', 'info');
                  const reader = new FileReader();
                  reader.onload = async () => {
                    const base64 = reader.result as string;
                    const result = await uploadImage(`${Date.now()}-about.${file.name.split('.').pop()}`, base64, 'Admin: about image');
                    setAboutImage(result.success && result.url ? result.url : base64);
                    showToast(result.success ? '✅ Slika uploadovana!' : '⚠️ Preview ok, ali sačuvaj za deploy', result.success ? 'success' : 'error');
                  };
                  reader.readAsDataURL(file);
                }} />
              </label>
              {aboutImage && (
                <button onClick={() => setAboutImage('')}
                  className="absolute top-1 right-1 bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={12} />
                </button>
              )}
            </div>
            {aboutImage && <p className="text-center text-[10px] text-[#d4af37]">✓ Prilagođena slika aktivna</p>}

            <LocalizedField label="Bio tekst" value={aboutBio} onChange={setAboutBio} multiline onToast={showToast} />
            <SaveBtn onClick={() => save({ aboutImage, aboutBio })} />
          </div>
        )}

        {/* ── GALERIJA ── */}
        {activeTab === 'galerija' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-serif mb-1">Galerija učenika</h2>
              <p className="text-zinc-500 text-xs">Sve slike su prikazane. X uklanja sliku iz galerije. Dodaj novu na dnu.</p>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-zinc-600">Originalne slike ({ORIG_GALLERY.length - hiddenGalleryIds.length} vidljive)</p>
            <div className="grid grid-cols-4 gap-2">
              {ORIG_GALLERY.map((src, i) => (
                <div key={i} className={`relative group aspect-square ${hiddenGalleryIds.includes(i) ? 'opacity-30' : ''}`}>
                  <img src={src} alt="" className="w-full h-full object-cover rounded border border-zinc-700" />
                  <button
                    onClick={() => setHiddenGalleryIds(hiddenGalleryIds.includes(i)
                      ? hiddenGalleryIds.filter(id => id !== i)
                      : [...hiddenGalleryIds, i])}
                    className="absolute top-1 right-1 bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title={hiddenGalleryIds.includes(i) ? 'Vrati' : 'Ukloni'}>
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>

            {galleryImages.length > 0 && (
              <>
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 pt-2">Tvoje slike</p>
                <div className="grid grid-cols-4 gap-2">
                  {galleryImages.map((img, i) => (
                    <div key={i} className="relative group aspect-square">
                      <img src={img} alt="" className="w-full h-full object-cover rounded border border-zinc-700" />
                      <button onClick={() => setGalleryImages(galleryImages.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <ImageUploader label="+ Dodaj sliku" value=""
              onChange={url => { if (url) setGalleryImages([...galleryImages, url]); }}
              onToast={showToast} />
            <SaveBtn onClick={() => save({ galleryImages, hiddenGalleryIds })} />
          </div>
        )}

        {/* ── USLUGE ── */}
        {activeTab === 'usluge' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-serif mb-1">Usluge Salona</h2>
                  onToast={showToast} />
              </div>
            ))}

            <button onClick={() => setServices([...services, { name: emptyLS(), price: '', image: '' }])}
              className="flex items-center gap-2 text-xs text-[#d4af37] hover:underline">
              <Plus size={14} /> Dodaj uslugu
            </button>
            <SaveBtn onClick={() => save({ services })} />
          </div>
        )}

        {/* ── AKADEMIJA ── */}
        {activeTab === 'akademija' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-serif mb-1">Akademija — Sertifikat</h2>
              <p className="text-zinc-500 text-xs">Izmeni tekst pored slike sertifikata. Kursevi i Zakaži se ne diraju.</p>
            </div>

            {/* Certificate preview */}
            <div className="flex gap-6 items-start border border-zinc-800 rounded-lg p-4 bg-zinc-900">
              <img src={certificateImg} alt="Sertifikat" className="w-28 h-auto rounded border border-zinc-700 flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Trenutni tekst</p>
                <p className="text-white text-sm font-medium">{academyCert.title.sr || 'Vaš Pečat Majstorstva'}</p>
                <p className="text-zinc-400 text-xs leading-relaxed">{academyCert.desc.sr || 'Naš sertifikat je više od papira...'}</p>
              </div>
            </div>

            <LocalizedField label="Naslov sertifikata"
              value={academyCert.title}
              onChange={v => setAcademyCert({ ...academyCert, title: v })}
              onToast={showToast} />
            <LocalizedField label="Opis sertifikata"
              value={academyCert.desc}
              onChange={v => setAcademyCert({ ...academyCert, desc: v })}
              multiline onToast={showToast} />
            <SaveBtn onClick={() => save({ academyCertificate: academyCert })} />
          </div>
        )}

        {/* ── BLOG ── */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif mb-1">Blog Postovi</h2>
                <p className="text-zinc-500 text-xs">
                  {originalPosts.length} originalna + {posts.length} tvojih. Klikni ✏️ na originalnom da ga kopiraš i izmeniš.
                </p>
              </div>
              <button onClick={() => { setEditingPost(emptyPost()); setIsNewPost(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] hover:bg-[#c4a030] text-black text-xs font-bold uppercase tracking-widest rounded transition-colors">
                <Plus size={14} /> Novi post
              </button>
            </div>

            {editingPost && (
              <div className="border border-[#d4af37]/40 rounded-lg p-6 bg-zinc-900 space-y-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37]">
                    {isNewPost ? 'Novi Post' : 'Izmeni Post'}
                  </h3>
                  <button onClick={() => { setEditingPost(null); setIsNewPost(false); }} className="text-zinc-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>

                <ImageUploader label="Naslovna slika" value={editingPost.image}
                  onChange={url => setEditingPost({ ...editingPost, image: url })} onToast={showToast} />

                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">YouTube URL (opciono)</label>
                  <input type="text" value={editingPost.video || ''}
                    onChange={e => setEditingPost({ ...editingPost, video: e.target.value })}
                    placeholder="https://youtu.be/..."
                    className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">Datum</label>
                  <input type="date" value={editingPost.date}
                    onChange={e => setEditingPost({ ...editingPost, date: e.target.value })}
                    className="bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]" />
                </div>

                <LocalizedField label="Naslov" value={editingPost.title}
                  onChange={v => setEditingPost({ ...editingPost, title: v })} onToast={showToast} />
                <LocalizedField label="Kategorija" value={editingPost.category}
                  onChange={v => setEditingPost({ ...editingPost, category: v })} onToast={showToast} />
                <LocalizedField label="Tekst (sadržaj)" value={editingPost.content}
                  onChange={v => setEditingPost({ ...editingPost, content: v })} multiline onToast={showToast} />

                <div className="flex gap-3 pt-2">
                  <button onClick={async () => {
                    const newPosts = isNewPost ? [...posts, editingPost] : posts.map(p => p.id === editingPost.id ? editingPost : p);
                    await save({ blogPosts: newPosts });
                    setPosts(newPosts); setEditingPost(null); setIsNewPost(false);
                  }} disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-[#d4af37] hover:bg-[#c4a030] disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs rounded">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Sačuvaj
                  </button>
                  <button onClick={() => { setEditingPost(null); setIsNewPost(false); }}
                    className="px-6 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase tracking-widest rounded">
                    Odustani
                  </button>
                </div>
              </div>
            )}

            {/* Original posts — read-only with Clone to Edit */}
            {!editingPost && (
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 pt-2">Originalni postovi (klikni ✏️ da izmeniš)</p>
                {originalPosts.map(post => {
                  const isOverridden = posts.some(p => p.id === post.id);
                  return (
                    <div key={post.id} className={`flex items-center justify-between px-4 py-3 border rounded-lg ${
                      isOverridden ? 'border-[#d4af37]/30 bg-[#d4af37]/5' : 'border-zinc-800 bg-zinc-900'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm text-zinc-300 line-clamp-1">{post.title.sr || post.title.en}</p>
                          <p className="text-xs text-zinc-600">{post.date} {isOverridden && <span className="text-[#d4af37]">· izmenjen</span>}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          // Clone original post into admin-editable copy
                          const clone: BlogPost = { ...post,
                            title: { ...post.title },
                            category: { ...post.category },
                            content: { ...post.content },
                          };
                          if (isOverridden) {
                            // Edit existing override
                            setEditingPost(posts.find(p => p.id === post.id) || clone);
                          } else {
                            setEditingPost(clone);
                          }
                          setIsNewPost(false);
                        }}
                        className="p-2 text-zinc-500 hover:text-[#d4af37] transition-colors" title={isOverridden ? 'Izmeni' : 'Kopiraj i izmeni'}>
                        {isOverridden ? <Edit2 size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Admin posts */}
            {posts.length === 0 && !editingPost && (
              <div className="text-center py-8 text-zinc-700 text-xs">
                Nema tvojih novih postova.
              </div>
            )}

            {!editingPost && posts.filter(p => !originalPosts.some(op => op.id === p.id)).map(post => (
              <div key={post.id} className="flex items-center justify-between px-4 py-3 border border-zinc-800 rounded-lg bg-zinc-900">
                <div className="flex items-center gap-3">
                  {post.image && <img src={post.image} alt="" className="w-10 h-10 object-cover rounded" />}
                  <div>
                    <p className="text-sm font-medium text-white line-clamp-1">{post.title.sr || post.title.en || 'Bez naslova'}</p>
                    <p className="text-xs text-zinc-500">{post.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingPost({ ...post }); setIsNewPost(false); }}
                    className="p-2 text-zinc-400 hover:text-[#d4af37]"><Edit2 size={14} /></button>
                  <button onClick={async () => {
                    if (!confirm('Obrisati?')) return;
                    const newPosts = posts.filter(p => p.id !== post.id);
                    await save({ blogPosts: newPosts }); setPosts(newPosts);
                  }} className="p-2 text-zinc-400 hover:text-red-400"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast {...toast} />}
    </div>
  );
};
