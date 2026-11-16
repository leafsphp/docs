// Tiny PHP/JS highlighter for the homepage code samples. Returns one entry per
// line so templates can render line numbers without relying on <pre> newlines.
export type Seg = { t: string; k: 'c' | 's' | 'v' | 'k' | 'f' | 'p' };
export type Line = { n: number; segs: Seg[] };

const re =
  /(\/\/.*$|#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\$[A-Za-z_]\w*)|\b(public|private|protected|static|function|return|class|extends|namespace|use|new|if|export|default|const|true|false)\b|([A-Za-z_]\w*)(?=\()/gm;

export function highlight(code: string): Line[] {
  return code.split('\n').map((line, n) => {
    const segs: Seg[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((m = re.exec(line))) {
      if (m.index > last) segs.push({ t: line.slice(last, m.index), k: 'p' });
      const k = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'v' : m[4] ? 'k' : 'f';
      segs.push({ t: m[0], k });
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    if (last < line.length) segs.push({ t: line.slice(last), k: 'p' });
    return { n: n + 1, segs };
  });
}
