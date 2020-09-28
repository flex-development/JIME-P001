/**
 * @file Custom viewports for @storybook/addon-viewport
 * @module storybook/config/viewports
 * @see {@link https://www.npmjs.com/package/@storybook/addon-viewport}
 */

/* eslint-disable sort-keys */

/**
 * Adobe XD artboard sizes formatted for the Storybook Viewports addon.
 *
 * @enum {object}
 */
export const AdobeXDArtboards = {
  'Web 1920': {
    name: 'Web 1920',
    styles: {
      width: '1920px',
      height: '1080px'
    },
    type: 'desktop'
  },
  'Web 1440': {
    name: 'Web 1440',
    styles: {
      width: '1440px',
      height: '960px'
    },
    type: 'desktop'
  },
  'Web 1366': {
    name: 'Web 1366',
    styles: {
      width: '1366px',
      height: '768px'
    },
    type: 'desktop'
  },
  'Tablet 1024': {
    name: 'iPad Pro 12.9in',
    styles: {
      width: '1024px',
      height: '1366px'
    },
    type: 'tablet'
  },
  'Tablet 834': {
    name: 'iPad Pro 11in',
    styles: {
      width: '834px',
      height: '1194px'
    },
    type: 'tablet'
  },
  'Tablet 768': {
    name: 'iPad',
    styles: {
      width: '768px',
      height: '1024px'
    },
    type: 'tablet'
  },
  'Mobile 414': {
    name: 'iPhone XR/XS Max/11',
    styles: {
      width: '414px',
      height: '896px'
    },
    type: 'mobile'
  },
  'Mobile 375': {
    name: 'iPhone X/XS/11 Pro',
    styles: {
      width: '375px',
      height: '812px'
    },
    type: 'mobile'
  },
  'Mobile 320': {
    name: 'iPhone 5/SE',
    styles: {
      width: '320px',
      height: '568px'
    },
    type: 'mobile'
  }
}

export const defaultViewport = 'Web 1440'
