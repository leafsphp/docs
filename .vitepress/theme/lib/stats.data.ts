// Build-time stats for the home page. Falls back to null so the page never breaks the build.
async function getJson(url: string): Promise<any> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'leafphp-docs-build' } });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export default {
  async load() {
    let installs: number | null = null;
    let url: string | null = 'https://packagist.org/search.json?q=leafs/&per_page=100';
    let total = 0;
    let pages = 0;
    while (url && pages < 10) {
      const data = await getJson(url);
      if (!data) break;
      for (const p of data.results || []) {
        if (String(p.name).startsWith('leafs/') || String(p.name).startsWith('leafphp/')) {
          total += Number(p.downloads) || 0;
        }
      }
      url = data.next || null;
      pages++;
      if (!url) installs = total;
    }
    const repo = await getJson('https://api.github.com/repos/leafsphp/leaf');
    return {
      installs,
      stars: repo?.stargazers_count ?? null,
    };
  },
};
