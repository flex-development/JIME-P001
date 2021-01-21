/**
 * @file Jest Configuration
 * @see https://jestjs.io/docs/en/configuration
 */

module.exports = {
  globals: {
    animated: {
      a: 'a',
      aside: 'aside',
      button: 'button',
      details: 'details',
      dialog: 'dialog',
      div: 'div',
      footer: 'footer',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      header: 'header',
      img: 'img',
      input: 'input',
      label: 'label',
      li: 'li',
      main: 'main',
      nav: 'nav',
      ol: 'ol',
      option: 'option',
      p: 'p',
      section: 'section',
      select: 'select',
      span: 'span',
      summary: 'summary',
      textarea: 'textarea',
      ul: 'ul'
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '^.+\\.(css|sass|scss|less)$': 'identity-obj-proxy',
    '^@mdx-js/runtime': '<rootDir>/../../node_modules/@mdx-js/runtime/dist/cjs',
    '^react-hanger/(.*)$': '<rootDir>/../../node_modules/react-hanger/$1',
    '^react-use/(.*)$': '<rootDir>/../../node_modules/react-use/lib/$1'
  },
  prettierPath: '<rootDir>/../../node_modules/prettier',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '__tests__/__mocks__/',
    'dist/',
    'node_modules/',
    'public/',
    '(.*).d.ts'
  ],
  transform: {
    '^.+\\.(js|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  transformIgnorePatterns: [
    '<rootDir>/../../node_modules/(?!@flex-development)'
  ],
  verbose: true
}
