/**
 * @file Storybook Canvas & Docs Config
 * @module config/sb
 */

type SBBackgroundColor = {
  name: string
  value: string
}

export const colors: Record<string, string> = {
  black: 'var(--mk-black)',
  danger: 'var(--mk-danger)',
  dark: 'var(--mk-dark)',
  darker: 'var(--mk-darker)',
  ghost: 'var(--mk-ghost)',
  gray: 'var(--mk-gray)',
  light: 'var(--mk-light)',
  muted: 'var(--mk-muted)',
  primary: 'var(--mk-primary)',
  secondary: 'var(--mk-secondary)',
  white: 'var(--mk-white)'
}

export const backgrounds: Record<string, SBBackgroundColor> = {
  dark: { name: 'Dark', value: colors.dark },
  darker: { name: 'Darker', value: colors.darker },
  light: { name: 'Light', value: colors.light },
  primary: { name: 'Primary', value: colors.primary },
  secondary: { name: 'Secondary', value: colors.secondary }
}

export const fonts: Record<string, string> = {
  mono: 'SFMono-Regular, Menlo, "Courier New", monospace',
  sans: 'ibm-plex-sans, sans-serif',
  special: 'quimby-gubernatorial, sans-serif'
}

export const fontSizes: Record<number | string, string> = {
  12: '0.75rem',
  14: '0.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  24: '1.5rem',
  32: '2rem',
  36: '2.25rem',
  48: '3rem',
  60: '3.75rem'
}

fontSizes.xs = fontSizes[12]
fontSizes.sm = fontSizes[14]
fontSizes.md = fontSizes[16]
fontSizes.lg = fontSizes[18]
fontSizes.xl = fontSizes[20]
fontSizes.xxl = fontSizes[24]

fontSizes.h1 = fontSizes[60]
fontSizes.h2 = fontSizes[48]
fontSizes.h3 = fontSizes[36]
fontSizes.h4 = fontSizes.xxl
fontSizes.h5 = fontSizes.xl
fontSizes.h6 = fontSizes.lg

export const fontWeights: number[] = [300, 400, 500, 600, 700]
