# Contributing

These instructions will help you develop and test new features.

## Overview

[Getting Started](../../../docs/CONTRIBUTING.md)  
[Run the App](#run-the-app)  
[Making Changes](#making-changes)  
[Testing](#testing)  
[Documentation](#documentation)  
[Build Workflow](#build-workflow)

## Run the App

- From project root: `yarn dev:store-ui`, `yarn dev:ui`
- From app root: `yarn dev`

The app will start on `http://localhost:3000`.

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
currently supports the `.scss` syntax.

### Utilities

Directory: `src/utils`

## Testing

Unit and interaction tests are conducted while implementing a new component or
feature. Unit tests are used to verify the output of a component, hook, or
function against a fixed input value. Interaction tests render components in the
browser and assert qualities about the way the component renders or changes.

[CSF format](https://storybook.js.org/docs/react/api/csf) stories are reusable
components that can be rendered outside of Storybook, making them available to
use when writing tests. For more information, visit
[Unit testing](https://storybook.js.org/docs/react/workflows/unit-testing) and
[Interaction testing](https://storybook.js.org/docs/react/workflows/interaction-testing)
from the Storybook docs.

This project uses the following testing libraries:

- [Cypress](https://www.cypress.io/)
- [React Hooks Testing Library](https://react-hooks-testing-library.com/)
- [React Testing Library](https://testing-library.com/react)

Test results for components are displayed in Storybook using
[Storybook Addon Jest](https://github.com/storybookjs/storybook/tree/master/addons/jest).
Before running or building the project, `__tests__/jest-test-results.json` must
be generated. The Jest addon uses this file to display test results. Failing
tests will not hinder builds, but be displayed in the addon panel.

The `dev` and `build` scripts for this project are configured to run the test
suite before starting or building the project.

## Documentation

[Storybook Docs](https://storybook.js.org/docs/react/writing-docs/introduction)
is used to generate documentation for the component library. DocBlock comments
for components needs to be
[written using Markdown](https://typedoc.org/guides/doccomments/#markdown) in
order to be parsed properly by Storybook Docs.

All other documentation should follow [JSDoc](https://jsdoc.app) format.

## Build Workflow

**TODO**: Update documentation.
