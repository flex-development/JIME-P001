# Kustomz

Storybook design system

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://storybook.js.org/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Overview

[Getting Started](#getting-started)  
[Usage](#usage)  
[Contributing](docs/CONTRIBUTING.md)  
[Distribution](docs/DISTRIBUTION.md)

## Getting Started

This project is a [Storybook](https://storybook.js.org/docs/react) design system
built with [React](https://reactjs.org). Storybook is a development environment
and documentation tool for UI components that allows developers to build and
test components independently, as well as showcase them interactively in an
isolated environment.

For more information about building design systems with Storybook, visit
[Design Systems for Developers](https://www.learnstorybook.com/design-systems-for-developers)
from the [Learn Storybook](https://www.learnstorybook.com) docs.

## Usage

### Local

1. Be sure the package is built before attempting to install it

   If the script you're using doesn't already build the package, run
   `lerna run build:bundle --scope @flex-development/kustomz`

2. Add `"@flex-development/kustomz": "*"` to your project `dependencies`

3. Run `yarn` to re-install the project dependencies (if needed)

### 🚧 Production

TODO: Update documentation.
