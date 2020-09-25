/**
 * @file Typography Constants
 * @module storybook/config/typography
 */

/**
 * Font sizes used in this project.
 */
export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.75rem',
  '4xl': '2rem',
  '5xl': '2.5rem',
  '6xl': '3rem',
  '7xl': '3.5rem',
  '8xl': '4rem',
}

/**
 * Font weights used in this project.
 */
export const fontWeights = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}

/**
 * Font families used in this project.
 *
 * @todo Update fonts weights and headings font config
 */
export const fonts = {
  body: {
    name: 'var(--bs-font-sans-serif)',
    weights: fontWeights,
    sizes: fontSizes,
  },
  headings: {
    name: '',
    weights: fontWeights,
    sizes: {
      h6: '1rem',
      h5: '1.25rem',
      h4: '1.5rem',
      h3: '1.75rem',
      h2: '2rem',
      h1: '2.5rem',
    },
  },
}
