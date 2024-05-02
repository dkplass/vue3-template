/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_SESSION_EXPIRATION: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
