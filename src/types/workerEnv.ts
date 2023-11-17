export type Env = {
  FS: KVNamespace<string>;
  FILE: KVNamespace<string>;
  DB: D1Database;
};
