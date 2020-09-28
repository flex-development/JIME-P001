# Contributing

These instructions will help you install the project on your local machine, as
well as develop, document, and test new features.

## Overview

[Getting Started](../../../docs/CONTRIBUTING.md)  
[Development Environment](#development-environment)  
[Making Changes](#making-changes)  
[Documentation](#documentation)  
[Testing](#testing)

## Development Environment

1. Copy the snippet below to get the project running on your local machine.

   If you're coming from the
   [root Contributing Guide](../../../docs/CONTRIBUTING.md), skip the first
   step.

   ```zsh
    git clone https://github.com/flex-development/JIME-P001.git; cd JIME-P001; yarn
    cd packages/system
   ```

2. Run the project

   - `yarn dev`: Run the project in `development` mode
   - `yarn start`: Run the project in `production` mode

## Making Changes

### Component Library

Directory: `src/lib`

The component library is organized according to the
[Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/).

### Hooks

Directory: `src/hooks`

The component library is implemented as a set of Function components, making the
use of [React Hooks](https://reactjs.org/docs/hooks-intro.html) possible.

This project uses [React Hanger](https://github.com/kitze/react-hanger), a
"helpful hooks" library.

For more information on writing custom hooks, visit
[Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html) from the
React docs.

### Stories

Directory: `storybook/stories`

For more information on writing stories, visit
[Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
from the Storybook docs.

### Theme Styles

Directory: `src/theme`

Stylesheets are written in [Sass](https://sass-lang.com/); this project
currently supports the `.scss` syntax. The theme is built on top of
[Bootstrap 5](https://v5.getbootstrap.com/).

### Utilities

Directory: `src/utils`

## Documentation

[Storybook Docs](https://storybook.js.org/docs/react/writing-docs/introduction)
is used to generate documentation for the component library. DocBlock comments
for components needs to be
[written using Markdown](https://typedoc.org/guides/doccomments/#markdown) in
order to be parsed properly by Storybook Docs.

All other documentation should follow [JSDoc](https://jsdoc.app) format.

## Testing

[CSF format](https://storybook.js.org/docs/react/api/csf) stories are reusable
components that can be rendered outside of Storybook, making them available to
use when writing tests. Test results are displayed in Storybook using
[Storybook Addon Jest](https://github.com/storybookjs/storybook/tree/master/addons/jest).

This project uses the following testing libraries:

- [Cypress](https://www.cypress.io/)
- [React Hooks Testing Library](https://react-hooks-testing-library.com/)
- [React Testing Library](https://testing-library.com/react)

For more information, visit
[Testing with Storybook](https://storybook.js.org/docs/react/workflows/testing-with-storybook)
from the Storybook docs.
