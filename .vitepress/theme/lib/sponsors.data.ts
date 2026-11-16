// Reads src/public/sponsors.json at build time so the homepage renders sponsors
// in the static HTML (Vite won't import files from the public folder).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default {
  watch: ['../../../src/public/sponsors.json'],
  load(files?: string[]) {
    const path = files?.[0] ?? resolve(process.cwd(), 'src/public/sponsors.json');
    try {
      return JSON.parse(readFileSync(path, 'utf8'));
    } catch {
      return { sponsor: [] };
    }
  },
};
