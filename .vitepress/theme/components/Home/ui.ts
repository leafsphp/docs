export const ui = {
  section: 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8',
  spacious: 'my-24 lg:my-48',
  band: 'w-full border-y border-black/[0.08] bg-neutral-100 dark:border-white/[0.08] dark:bg-white/[0.03]',
  bandInner: 'mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8',
  header: 'mx-auto mb-12 max-w-2xl text-center lg:mb-14',
  headerWide: 'max-w-3xl',
  eyebrow:
    '!m-0 mb-3.5 text-xs font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400',
  title:
    '!m-0 mb-4 !border-0 !p-0 text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-neutral-950 dark:text-neutral-50',
  subtitle: '!m-0 text-[1.0625rem] font-normal leading-[1.65] text-neutral-500 dark:text-neutral-400',
  heroSubtitle:
    'max-w-xl text-lg leading-[1.6] text-neutral-500 dark:text-neutral-400 md:text-xl',
  panel:
    'relative overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-white/[0.02] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_24px_48px_-24px_rgba(0,0,0,0.45)]',
  marker: 'pointer-events-none absolute z-[2] h-[5px] w-[5px] bg-[var(--vp-c-brand-1)]',
  markerTL: '-left-0.5 -top-0.5',
  markerTR: '-right-0.5 -top-0.5',
  markerBL: '-bottom-0.5 -left-0.5',
  markerBR: '-bottom-0.5 -right-0.5',
  actions: 'flex flex-wrap items-center gap-3',
  btn:
    'inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent px-4 text-sm font-medium leading-none !no-underline transition-colors duration-150',
  btnPrimary: 'bg-neutral-950 text-white hover:opacity-90 dark:bg-neutral-50 dark:text-neutral-950',
  btnGhost:
    'border-black/[0.08] text-neutral-950 hover:border-neutral-300 hover:bg-neutral-50 dark:border-white/[0.08] dark:text-neutral-50 dark:hover:border-white/20 dark:hover:bg-white/[0.04]',
  btnBrand: 'bg-[var(--vp-c-brand-1)] text-white hover:opacity-90',
  link:
    'inline-flex items-center gap-1 text-sm font-medium text-neutral-950 !no-underline transition-colors hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-400 [&_svg]:opacity-50 [&_svg]:transition [&_svg]:duration-150 hover:[&_svg]:translate-x-px hover:[&_svg]:-translate-y-px hover:[&_svg]:opacity-100',
  badge:
    'inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[0.8125rem] font-medium text-neutral-500 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-neutral-400',
  badgeDot: 'h-1.5 w-1.5 rounded-full bg-[var(--vp-c-brand-1)]',
  card:
    'rounded-xl border border-black/[0.08] bg-white transition-colors hover:bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:bg-white/[0.04]',
  cardFeatured: 'border-[color-mix(in_srgb,var(--vp-c-brand-1)_35%,rgba(0,0,0,0.08))] dark:border-[color-mix(in_srgb,var(--vp-c-brand-1)_35%,rgba(255,255,255,0.08))]',
  codeLabel:
    '!m-0 mb-3 text-xs font-medium uppercase tracking-[0.04em] text-neutral-500 dark:text-neutral-400',
  accent: 'text-[var(--vp-c-brand-1)]',
  terminal:
    'overflow-hidden rounded-[10px] border border-black/[0.08] bg-neutral-50 dark:border-white/[0.08] dark:bg-[#0a0807]',
  terminalHeader:
    'flex items-center gap-2 border-b border-black/[0.08] bg-neutral-100 px-4 py-3 dark:border-white/[0.08] dark:bg-[#110e0b]',
  terminalLabel: 'ml-1 font-mono text-[0.6875rem] text-neutral-500 dark:text-neutral-400',
  terminalBody:
    'min-h-[280px] px-5 pb-6 pt-5 font-mono text-[0.8125rem] leading-[1.75] text-neutral-900 dark:text-neutral-200',
};
