import { ColorItemProps, SBBackgroundColor } from '@system/types/storybook'

/**
 * @file Storybook Canvas & Docs Config
 * @module config/sb
 */

export const colors: Record<string, string> = {
  dark: '#232946',
  darker: '#121629',
  light: '#fffffe',
  primary: '#eebbc3',
  secondary: '#b8c1ec'
}

colors.body = colors.secondary
colors.headings = colors.light

export const colors_docs: Record<keyof typeof colors, ColorItemProps> = {
  dark: { colors: [colors.dark], subtitle: 'var(--bs-dark)', title: 'Dark' },
  darker: {
    colors: [colors.darker],
    subtitle: 'var(--bs-darker)',
    title: 'Darker'
  },
  light: {
    colors: [colors.light],
    subtitle: 'var(--bs-light)',
    title: 'Light'
  },
  primary: {
    colors: [colors.primary],
    subtitle: 'var(--bs-primary)',
    title: 'Primary'
  },
  secondary: {
    colors: [colors.secondary],
    subtitle: 'var(--bs-secondary)',
    title: 'Secondary'
  }
}

export const colors_sb_bkg: Record<string, SBBackgroundColor> = {
  dark: { name: colors_docs.dark.title, value: colors_docs.dark.colors[0] },
  darker: {
    name: colors_docs.darker.title,
    value: colors_docs.darker.colors[0]
  },
  light: { name: colors_docs.light.title, value: colors_docs.light.colors[0] },
  primary: {
    name: colors_docs.primary.title,
    value: colors_docs.primary.colors[0]
  },
  secondary: {
    name: colors_docs.secondary.title,
    value: colors_docs.secondary.colors[0]
  }
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

export const fontWeights: number[] = [200, 400, 500, 600, 700]
