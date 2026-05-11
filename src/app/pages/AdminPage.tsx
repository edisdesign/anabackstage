import React, { useState, useRef, useEffect } from 'react';
import { commitFile, uploadImage } from '@/lib/githubApi';
import { useAdminContent, AdminContent, HeroContent } from '@/app/context/AdminContentContext';
import { BlogPost } from '@/app/data/blogPosts';
import { LogOut, Plus, Edit2, Trash2, Save, Image, Eye, EyeOff, Upload, X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

// ─── Auth ────────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'anabackstage2024';
const SESSION_KEY = 'ab_admin_session';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const generateId = () =>
  `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const emptyLocalizedString = () => ({ en: '', sr: '', de: '' });

const emptyPost = (): BlogPost => ({
  id: generateId(),
  image: '',
  video: '',
  date: new Date().toISOString().split('T')[0],
  title: emptyLocalizedString(),
  category: emptyLocalizedString(),
  content: emptyLocalizedString(),
});

// ─── Sub-components ──────────────────────────────────────────────────────────

const Toast = ({ msg, type }: { msg: string; type: 'success' | 'error' | 'info' }) => {
  const colors = {
    success: 'bg-emerald-900 border-emerald-500 text-emerald-100',
    error: 'bg-red-900 border-red-500 text-red-100',
    info: 'bg-zinc-800 border-zinc-500 text-zinc-100',
  };
  return (
    <div className={`fixed bottom-6 right-6 z-[9999] border px-5 py-3 text-sm font-medium rounded shadow-xl max-w-xs ${colors[type]}`}>
      {msg}
    </div>
  );
};

const ImageUploader = ({
  label,
  value,
  onChange,
  onToast,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    onToast('Uploadujem sliku...', 'info');

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const result = await uploadImage(filename, base64, `Admin: upload slike ${filename}`);
      if (result.success && result.url) {
        onChange(result.url);
        onToast('Slika uspešno upload-ovana!', 'success');
      } else {
        // Fallback: use base64 locally (won't persist after deploy but works in dev)
        onChange(base64);
        onToast(result.error || 'Upload nije uspeo, koristim lokalni preview', 'error');
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-widest text-zinc-400">{label}</label>
      <div className="flex gap-2 items-start">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="URL slike ili upload ispod"
          className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs rounded transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {value && (
        <img src={value} alt="preview" className="h-24 object-cover rounded border border-zinc-700 mt-1" />
      )}
    </div>
  );
};

const LocalizedField = ({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: { en: string; sr: string; de: string };
  onChange: (v: { en: string; sr: string; de: string }) => void;
  multiline?: boolean;
}) => {
  const [tab, setTab] = useState<'sr' | 'en' | 'de'>('sr');
  const tabs = [
    { key: 'sr', label: 'SR' },
    { key: 'en', label: 'EN' },
    { key: 'de', label: 'DE' },
  ] as const;

  return (
    <div className="space-y-1">
      <label className="block text-xs uppercase tracking-widest text-zinc-400">{label}</label>
      <div className="flex gap-1 mb-1">
        {tabs.map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-3 py-1 text-xs rounded font-bold transition-colors ${
              tab === t.key ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {multiline ? (
        <textarea
          value={value[tab]}
          onChange={e => onChange({ ...value, [tab]: e.target.value })}
          rows={8}
          className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37] resize-y"
        />
      ) : (
        <input
          type="text"
          value={value[tab]}
          onChange={e => onChange({ ...value, [tab]: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
        />
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const AdminPage = () => {
  const { adminContent, setAdminContent, refreshContent } = useAdminContent();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'blog'>('hero');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [saving, setSaving] = useState(false);

  // Hero state
  const [hero, setHero] = useState<HeroContent>(adminContent.hero);

  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>(adminContent.blogPosts);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  useEffect(() => { setHero(adminContent.hero); }, [adminContent.hero]);
  useEffect(() => { setPosts(adminContent.blogPosts); }, [adminContent.blogPosts]);

  const showToast = (msg: string, type: 'success' | 'error' | 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
    } else {
      showToast('Pogrešna lozinka', 'error');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  const buildAndSave = async (newHero: HeroContent, newPosts: BlogPost[]) => {
    setSaving(true);
    const content: AdminContent = { hero: newHero, blogPosts: newPosts };
    const json = JSON.stringify(content, null, 2);

    const result = await commitFile(
      'public/admin-content.json',
      json,
      `Admin: izmena sadrzaja ${new Date().toLocaleString('sr')}`
    );

    if (result.success) {
      setAdminContent(content);
      showToast('✅ Sačuvano! Vercel deploy u toku (~30 sek)...', 'success');
    } else {
      showToast(`❌ Greška: ${result.error}`, 'error');
    }
    setSaving(false);
  };

  // ─── Login Screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-[#d4af37] text-xs uppercase tracking-[0.4em] mb-2">Ana Backstage</p>
            <h1 className="text-white text-2xl font-serif">Admin Panel</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Lozinka"
                autoFocus
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 pr-12 rounded focus:outline-none focus:border-[#d4af37] text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#d4af37] hover:bg-[#c4a030] text-black font-bold uppercase tracking-widest text-xs py-3 rounded transition-colors"
            >
              Prijavi se
            </button>
          </form>
        </div>
        {toast && <Toast {...toast} />}
      </div>
    );
  }

  // ─── Admin Dashboard ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-50">
        <div className="flex items-center gap-4">
          <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em]">Ana Backstage</span>
          <span className="text-zinc-600 text-xs">Admin</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs transition-colors">
          <LogOut size={14} /> Odjavi se
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-zinc-800 pb-0">
          {(['hero', 'blog'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-xs uppercase tracking-widest font-bold transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-[#d4af37] text-[#d4af37]'
                  : 'border-transparent text-zinc-500 hover:text-white'
              }`}
            >
              {tab === 'hero' ? '🖼️ Hero Sekcija' : '📝 Blog Postovi'}
            </button>
          ))}
        </div>

        {/* ─── HERO TAB ─── */}
        {activeTab === 'hero' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-serif mb-1">Hero Sekcija</h2>
              <p className="text-zinc-500 text-xs">
                Ako ostaviš prazno, koriste se originalni tekstovi iz i18n fajla i Figma slike.
              </p>
            </div>

            {/* Hero Images */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-widest text-zinc-400">
                Hero Slike (slideshow) — dodaj do 6
              </label>
              {(hero.images || []).map((img, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <ImageUploader
                    label={`Slika ${i + 1}`}
                    value={img}
                    onChange={url => {
                      const imgs = [...hero.images];
                      imgs[i] = url;
                      setHero({ ...hero, images: imgs });
                    }}
                    onToast={showToast}
                  />
                  <button
                    type="button"
                    onClick={() => setHero({ ...hero, images: hero.images.filter((_, idx) => idx !== i) })}
                    className="p-2 text-red-400 hover:text-red-300 mt-6"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(hero.images || []).length < 6 && (
                <button
                  type="button"
                  onClick={() => setHero({ ...hero, images: [...(hero.images || []), ''] })}
                  className="flex items-center gap-2 text-xs text-[#d4af37] hover:underline"
                >
                  <Plus size={14} /> Dodaj sliku
                </button>
              )}
            </div>

            {/* Hero Text Overrides */}
            <div className="grid gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">
                  Subtitle (iznad naslova)
                </label>
                <input
                  type="text"
                  value={hero.subtitle}
                  onChange={e => setHero({ ...hero, subtitle: e.target.value })}
                  placeholder="npr. Makeup Artist & Content Creator"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">
                  Naslov (h1 — prvi red)
                </label>
                <input
                  type="text"
                  value={hero.title}
                  onChange={e => setHero({ ...hero, title: e.target.value })}
                  placeholder="npr. Otkrijte svoju"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">
                  Zlatni tekst (italic — drugi red)
                </label>
                <input
                  type="text"
                  value={hero.beauty}
                  onChange={e => setHero({ ...hero, beauty: e.target.value })}
                  placeholder="npr. Lepotu"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">
                  Opis (paragraf ispod naslova)
                </label>
                <textarea
                  value={hero.description}
                  onChange={e => setHero({ ...hero, description: e.target.value })}
                  rows={3}
                  placeholder="Kratki opis..."
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => buildAndSave(hero, posts)}
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-[#d4af37] hover:bg-[#c4a030] disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs rounded transition-colors"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'Čuvam...' : 'Sačuvaj i deploy-uj'}
            </button>
          </div>
        )}

        {/* ─── BLOG TAB ─── */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif mb-1">Blog Postovi</h2>
                <p className="text-zinc-500 text-xs">
                  Postojećih {6} originalnih postova + {posts.length} admin postova
                </p>
              </div>
              <button
                onClick={() => {
                  const np = emptyPost();
                  setEditingPost(np);
                  setIsNewPost(true);
                  setExpandedId(np.id);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] hover:bg-[#c4a030] text-black text-xs font-bold uppercase tracking-widest rounded transition-colors"
              >
                <Plus size={14} /> Novi post
              </button>
            </div>

            {/* New/Edit Post Form */}
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

                <ImageUploader
                  label="Naslovna slika"
                  value={editingPost.image}
                  onChange={url => setEditingPost({ ...editingPost, image: url })}
                  onToast={showToast}
                />

                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">YouTube URL (opciono)</label>
                  <input
                    type="text"
                    value={editingPost.video || ''}
                    onChange={e => setEditingPost({ ...editingPost, video: e.target.value })}
                    placeholder="https://youtu.be/..."
                    className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">Datum</label>
                  <input
                    type="date"
                    value={editingPost.date}
                    onChange={e => setEditingPost({ ...editingPost, date: e.target.value })}
                    className="bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <LocalizedField
                  label="Naslov"
                  value={editingPost.title}
                  onChange={v => setEditingPost({ ...editingPost, title: v })}
                />

                <LocalizedField
                  label="Kategorija"
                  value={editingPost.category}
                  onChange={v => setEditingPost({ ...editingPost, category: v })}
                />

                <LocalizedField
                  label="Tekst (sadržaj)"
                  value={editingPost.content}
                  onChange={v => setEditingPost({ ...editingPost, content: v })}
                  multiline
                />

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={async () => {
                      const newPosts = isNewPost
                        ? [...posts, editingPost]
                        : posts.map(p => p.id === editingPost.id ? editingPost : p);
                      await buildAndSave(hero, newPosts);
                      setPosts(newPosts);
                      setEditingPost(null);
                      setIsNewPost(false);
                    }}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-[#d4af37] hover:bg-[#c4a030] disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs rounded transition-colors"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? 'Čuvam...' : 'Sačuvaj'}
                  </button>
                  <button
                    onClick={() => { setEditingPost(null); setIsNewPost(false); }}
                    className="px-6 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase tracking-widest rounded transition-colors"
                  >
                    Odustani
                  </button>
                </div>
              </div>
            )}

            {/* Posts List */}
            {posts.length === 0 && !editingPost && (
              <div className="text-center py-16 text-zinc-600 border border-zinc-800 rounded-lg">
                <p className="text-sm">Nema admin postova. Klikni "Novi post" da dodaš.</p>
              </div>
            )}

            {posts.map(post => (
              <div key={post.id} className="border border-zinc-800 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900">
                  <div className="flex items-center gap-3">
                    {post.image && (
                      <img src={post.image} alt="" className="w-10 h-10 object-cover rounded" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-white line-clamp-1">{post.title.sr || post.title.en || 'Bez naslova'}</p>
                      <p className="text-xs text-zinc-500">{post.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingPost({ ...post }); setIsNewPost(false); }}
                      className="p-2 text-zinc-400 hover:text-[#d4af37] transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm('Obrisati ovaj post?')) return;
                        const newPosts = posts.filter(p => p.id !== post.id);
                        await buildAndSave(hero, newPosts);
                        setPosts(newPosts);
                      }}
                      className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
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
