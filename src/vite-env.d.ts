/// <reference types="vite/client" />

// Fallback: manually declare env vars in case vite/client is not available
interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string;
  readonly VITE_GITHUB_REPO: string;
  readonly VITE_GITHUB_BRANCH: string;
  readonly VITE_ADMIN_PASSWORD: string;
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
