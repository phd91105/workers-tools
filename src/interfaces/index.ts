export * from './film';
export * from './fshare';

export interface Env {
  FS: KVNamespace<string>;
  FILE: KVNamespace<string>;
  DB: D1Database;
}
