import type { Ai } from '@cloudflare/ai';

export type Env = {
  FS: KVNamespace<string>;
  FILE: KVNamespace<string>;
  DB: D1Database;
  DISCORD_PUBLIC_KEY: string;
  DISCORD_APPLICATION_ID: string;
  DISCORD_TOKEN: string;
  OWNER: string;
  GIT_TOKEN: string;
  REPOS: string;
  AI: Ai;
};
