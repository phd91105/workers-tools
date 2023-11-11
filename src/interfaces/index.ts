import type { D1Database, KVNamespace } from '@cloudflare/workers-types';

export * from './film';
export * from './fshare';

export interface Env {
  FS: KVNamespace<string>;
  DB: D1Database;
}
