import process from 'node:process';

import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.dev.vars' });

const baseURL = 'https://api.cloudflare.com/client/v4';
const apiKey = process.env.CLOUDFLARE_API_KEY;
const isPreview = process.argv.includes('--preview');
const kvId = isPreview
  ? process.env.CLOUDFLARE_KV_ID_PREVIEW
  : process.env.CLOUDFLARE_KV_ID;

const baseKV = `${baseURL}/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${kvId}`;
const bulkKvUpdateURL = `${baseKV}/bulk`;
const kvListURL = `${baseKV}/keys`;

const UPLOAD_FOLDER = 'public';

const directory = `./${UPLOAD_FOLDER}`;

async function readDirectory(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.filter((file) => !file.isDirectory());
  const directories = entries.filter((directory) => directory.isDirectory());

  if (files.length) {
    const arrayUpload = files.map((file) => {
      const filePath = path.join(dir, file.name);
      const key = path.join(prefix, file.name).split(path.sep).join('/');
      const value = fs.readFileSync(filePath, 'utf8');
      const base64 = Buffer.from(value).toString('base64');
      console.log(filePath);

      return {
        base64: true,
        key: `/${key}`,
        value: base64,
      };
    });

    // Implement rate limiting logic if necessary
    await fetch(bulkKvUpdateURL, {
      method: 'PUT',
      body: JSON.stringify(arrayUpload),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  if (directories.length) {
    // Control the concurrency of directory processing if needed
    await Promise.all(
      directories.map(async (subDirectory) => {
        const subDirPath = path.join(dir, subDirectory.name);
        const subDirPrefix = path.join(prefix, subDirectory.name);
        await readDirectory(subDirPath, subDirPrefix);
      }),
    );
  }
}

async function deleteAllKeys() {
  try {
    // List all keys
    const response = await fetch(kvListURL, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const { result } = await response.json();
    const kvList = result.map((item) => item.name);

    await fetch(bulkKvUpdateURL, {
      method: 'DELETE',
      body: JSON.stringify(kvList),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('All old keys have been deleted.');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function main() {
  if (process.argv.includes('--clear')) {
    console.log('[Delete file]');
    await deleteAllKeys();
  } else {
    console.log('[Upload file]');
    await readDirectory(directory);
    console.log('Done.');
  }
}

main().catch(console.error);
