export const ui = {
  section: 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8',
  spacious: 'py-24 lg:py-32',
  band: 'w-full border-y border-black/[0.08] bg-neutral-100/60 dark:border-white/[0.08] dark:bg-white/[0.02]',
  bandInner: 'mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8',
  header: 'mb-12 max-w-2xl lg:mb-16',
  headerWide: 'max-w-3xl',
  eyebrow:
    '!m-0 !mb-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[var(--vp-c-brand-1)] before:mr-2 before:content-["//"] before:text-neutral-400 dark:before:text-neutral-600',
  title:
    '!m-0 !mb-4 !border-0 !p-0 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-neutral-950 dark:text-neutral-50',
  subtitle: '!m-0 text-[1.0625rem] font-normal leading-[1.65] text-neutral-500 dark:text-neutral-400',
  heroSubtitle:
    'max-w-xl text-lg leading-[1.6] text-neutral-500 dark:text-neutral-400 md:text-xl',
  panel:
    'relative overflow-hidden rounded-none border border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-white/[0.02]',
  marker: 'pointer-events-none absolute z-[2] h-[5px] w-[5px] bg-[var(--vp-c-brand-1)]',
  markerTL: '-left-0.5 -top-0.5',
  markerTR: '-right-0.5 -top-0.5',
  markerBL: '-bottom-0.5 -left-0.5',
  markerBR: '-bottom-0.5 -right-0.5',
  // hairline tile grids: gap-px over a line-colored bed
  tilebed: 'grid gap-px border border-black/[0.08] bg-black/[0.08] dark:border-white/[0.08] dark:bg-white/[0.08]',
  tile: 'bg-white p-6 dark:bg-[var(--vp-c-bg)]',
  stripes:
    'bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.05)_0,rgba(0,0,0,0.05)_1px,transparent_0,transparent_50%)] bg-[length:9px_9px] dark:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.055)_0,rgba(255,255,255,0.055)_1px,transparent_0,transparent_50%)]',
  actions: 'flex flex-wrap items-center gap-3',
  btn:
    'inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-none border border-transparent px-4 text-sm font-medium leading-none !no-underline transition-colors duration-150',
  // !text-white: vitepress's `.vp-doc a` color rule outranks plain text-white,
  // leaving brand-on-brand invisible labels on link-buttons
  btnPrimary:
    'bg-[var(--vp-c-brand-1)] !text-white shadow-[0_16px_34px_-24px_rgba(232,117,58,0.8)] hover:bg-[#d7662f] dark:bg-[var(--vp-c-brand-1)]',
  btnGhost:
    'border-black/[0.08] text-neutral-950 hover:border-neutral-300 hover:bg-neutral-50 dark:border-white/[0.08] dark:text-neutral-50 dark:hover:border-white/20 dark:hover:bg-white/[0.04]',
  btnBrand: 'bg-[var(--vp-c-brand-1)] !text-white hover:opacity-90',
  link:
    'inline-flex items-center gap-1 text-sm font-medium text-neutral-950 !no-underline transition-colors hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-400 [&_svg]:opacity-50 [&_svg]:transition [&_svg]:duration-150 hover:[&_svg]:translate-x-px hover:[&_svg]:-translate-y-px hover:[&_svg]:opacity-100',
  badge:
    'inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 font-mono text-[0.75rem] font-medium text-neutral-500 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-neutral-400',
  badgeDot: 'h-1.5 w-1.5 rounded-full bg-[var(--vp-c-brand-1)]',
  card:
    'rounded-none border border-black/[0.08] bg-white transition-colors hover:bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:bg-white/[0.04]',
  cardFeatured: 'border-[color-mix(in_srgb,var(--vp-c-brand-1)_35%,rgba(0,0,0,0.08))] dark:border-[color-mix(in_srgb,var(--vp-c-brand-1)_35%,rgba(255,255,255,0.08))]',
  codeLabel:
    '!m-0 mb-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400',
  accent: 'text-[var(--vp-c-brand-1)]',
  accentBar:
    'hidden',
  terminal:
    'overflow-hidden rounded-none border border-black/[0.08] bg-neutral-50 dark:border-white/[0.08] dark:bg-[#0a0807]',
  terminalHeader:
    'flex items-center gap-2 border-b border-black/[0.08] bg-neutral-100 px-4 py-3 dark:border-white/[0.08] dark:bg-[#110e0b]',
  terminalLabel: 'ml-1 font-mono text-[0.6875rem] text-neutral-500 dark:text-neutral-400',
  terminalBody:
    'min-h-[280px] px-5 pb-6 pt-5 font-mono text-[0.8125rem] leading-[1.75] text-neutral-900 dark:text-neutral-200',
};
