// GitHub API service - writes content changes directly to the repository
// Vercel auto-deploys on every commit, so changes go live in ~30 seconds

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'edisdesign/anabackstage';
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main';

const API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;

interface GitHubFile {
  sha?: string;
  content: string;
  encoding: string;
}

async function getFileSha(path: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/contents/${path}?ref=${GITHUB_BRANCH}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.sha;
  } catch {
    return null;
  }
}

export async function commitFile(
  path: string,
  content: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  if (!GITHUB_TOKEN) {
    return {
      success: false,
      error: 'GitHub token nije konfigurisan. Dodaj VITE_GITHUB_TOKEN u Vercel Environment Variables.',
    };
  }

  try {
    const sha = await getFileSha(path);
    const encodedContent = btoa(unescape(encodeURIComponent(content)));

    const body: Record<string, unknown> = {
      message,
      content: encodedContent,
      branch: GITHUB_BRANCH,
    };

    if (sha) {
      body.sha = sha;
    }

    const res = await fetch(`${API_BASE}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.message || 'GitHub API greška' };
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function uploadImage(
  filename: string,
  base64Data: string,
  message: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!GITHUB_TOKEN) {
    return {
      success: false,
      error: 'GitHub token nije konfigurisan.',
    };
  }

  // Strip the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64Content = base64Data.split(',')[1];
  const path = `public/admin-images/${filename}`;

  try {
    const sha = await getFileSha(path);
    const body: Record<string, unknown> = {
      message,
      content: base64Content,
      branch: GITHUB_BRANCH,
    };
    if (sha) body.sha = sha;

    const res = await fetch(`${API_BASE}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.message || 'Upload greška' };
    }

    // Return the raw GitHub URL for the image
    const imageUrl = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${path.replace('public/', '')}`;
    return { success: true, url: imageUrl };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
