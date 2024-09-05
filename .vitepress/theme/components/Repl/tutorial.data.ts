import path from 'path';
// import markdownit from 'markdown-it';

import { readExamples, ExampleData } from './examples.data';

export declare const data: Record<string, ExampleData>;

export default {
  watch: '../../../src/tutorial/src/**',
  async load() {
    const createMarkdownRenderer = await import('vitepress').then(
      (s) => s.createMarkdownRenderer
    );

    const md = await createMarkdownRenderer(
      process.cwd(),
      {
        // @ts-ignore
        // highlight: await createHighlighter()
      },
      '/'
    );
    // const md = markdownit({
    //   html: true,
    //   linkify: true,
    //   typographer: true,
    //   // highlight: await createHighlighter(),
    // });

    // const ShikiPlugin = await import('@shikijs/markdown-it').then(
    //   (s) => s.default
    // );

    // md.use(
    //   await ShikiPlugin({
    //     themes: {
    //       light: 'vitesse-light',
    //       dark: 'vitesse-dark',
    //     },
    //   })
    // );

    const files = readExamples(
      path.resolve(__dirname, '../../../..', './src/tutorial/src/')
    );

    for (const step in files) {
      const stepFiles = files[step];
      const desc = stepFiles['description.md'] as string;

      if (desc) {
        stepFiles['description.md'] = md.render(desc);
      }
    }

    return files;
  },
};

// const htmlEscapes = {
//   '&': '&amp;',
//   '<': '&lt;',
//   '>': '&gt;',
//   '"': '&quot;',
//   "'": '&#39;',
// };

// function escapeHtml(html: any) {
//   return html.replace(/[&<>"']/g, (chr: any) => htmlEscapes[chr]);
// }

// const createHighlighter = async (theme = 'github-dark') => {
//   // const highlighter = import('shiki').then((s) => s.default.getHighlighter({
//   //   theme,
//   // }));

//   const highlighter = await import('shiki').then((s) => s.getHighlighter({
//     theme,
//   }));

//   return (code: any, lang: any) => {
//     if (!lang || lang === 'text') {
//       return `<pre v-pre><code>${escapeHtml(code)}</code></pre>`;
//     }

//     return highlighter
//       .codeToHtml(code, lang)
//       .replace(/^<pre.*?>/, '<pre v-pre>');
//   };
// };
