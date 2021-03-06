# KustomzDesign

Storybook design system

[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://storybook.js.org/)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Overview

[Getting Started](#getting-started)  
[Usage](#usage)  
[Built With](#built-with)  
[Contributing](docs/CONTRIBUTING.md)

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

### Development Environment

To start the Storybook application and the [KAPI](../api/README.md) dev server,
run the following command from the root of the repository:

```zsh
yarn dev:store-ui
```

Storybook will be available at `http://localhost:3000`, and the API at
`http://localhost:8080`.

#### Storybook Only

To start **only** the Storybook application:

```zsh
yarn dev:ui
```

from the root of the repository, or

```zsh
yarn dev
```

from this directory.

### Installation

1. Add `"@flex-development/kustomzdesign": "*"` to package `dependencies`

   This package isn't published, so it can only be installed within this repo.

2. Run `yarn` from the root of the repository to re-install project dependencies

## Built With

- [React][1] - JavaScript library for building user interfaces
- [Storybook][2] - UI development and documentation tool
- [TypeScript][3] - Typed JavaScript
- [Vercel][4] - Hosting platform for static sites and serverless functions

[1]: https://reactjs.org/
[2]: https://storybook.js.org/
[3]: https://www.typescriptlang.org/
[4]: https://vercel.com/
