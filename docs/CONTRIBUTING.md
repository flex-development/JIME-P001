# Contributing

These instructions will help you begin making changes on your local machine, as
well follow our coding guidelines.

## Overview

[Getting Started](#getting-started)  
[Coding Standards](#coding-standards)  
[Making Changes](#making-changes)  
[Testing](#testing)  
[Documentation](#documentation)  
[Getting Help](#getting-help)  
[Creating a Pull Request](#creating-a-pull-request)

## Getting Started

This project is structured as a monorepo and uses [Lerna][1] with Yarn
workspaces. All projects are deployed with Vercel.

### Git Configuration

Copy the [starter Git global configuration](.gitconfig) to stay inline with our
coding guidelines, as well as begin extending your own workflow.

**Note**: The examples below will uses aliases from the starter config.

### Development Environment

1. Copy the snippet below to clone the project onto your local machine:

   ```zsh
   git clone https://github.com/flex-development/JIME-P001.git; cd JIME-P001
   yarn # or npm install
   ```

2. Retrieve the following files from a development admin:

   - `kapi.json`
   - `kustomzdesign.json`
   - `morenaskustomz.json`

   Place them in the root of the project directory.

3. To finish configuring your Vercel development environment:

   ```zsh
   mv kapi.json ~/.vercel/kapi.json;
   mkdir packages/system/.vercel;
   mv kustomzdesign.json packages/system/.vercel/project.json;
   mkdir packages/app/.vercel;
   mv morenaskustomz.json packages/app/.vercel/project.json;
   ```

4. Run the project!

   - `yarn dev:api`: Start API on port `8080`
   - `yarn dev:store`: Start Next.js app on port `3001`; API on port `8080`
   - `yarn dev:store-ui`: Start Storybook app on port `3000`; API on port `8080`
   - `yarn dev:ui`: Start Storyboook app on port `3000`

### Environment Variables

All required environment variables are documented in the `package.json` of each
project, under the `required-env` field.

Vercel supports adding environment variables for Development, Preview, and
Production environments. A set of Vercel system environemnt variables can also
be exposed for each project.

For more information, see [Environment Variables][2] from the Vercel docs.

## Coding Standards

[Husky][3] is used to enforce coding and commit message standards.

## Branch Naming Conventions

When creating a new branch, the name should match the following format:
**`feat/`**, **`hotfix/`**, **`release/`**, or **`support/`** followed by
**`<branch_name>`**.

For example:

```zsh
  git feat repo-setup
```

will create a new branch titled `feat/repo-setup` and push it to `origin`.

### Commit Messages

This project follows [Conventional Commits][4] standards.

Commit messages should be one of the following types:

- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Changes that don't impact external users
- `docs`: Documentation only changes
- `feat`: New features
- `fix`: Bug fixes
- `perf`: Performance improvements
- `refactor`: Code improvements
- `revert`: Revert past changes
- `style`: Changes that do not affect the meaning of the code
- `test`: Adding missing tests or correcting existing tests
- `wip`: Working on changes, but you need to go to bed :wink:

For example:

```zsh
  git chore "add eslint configuration"
```

will produce the following commit: `chore: add eslint configuration`

[commitlint][5] is used to enforce commit guidlelines.

To review our commitlint rules, see the configuration file:

- [`commitlint.config.js`](../commitlint.config.js)

### Formatting & Linting

#### Formatting

This project uses [Prettier][6] to format all code.

To review our formatting guidelines, see our configuration files:

- Configuration:[`.prettierrc.js`](../.prettierrc.js)
- Ignore Patterns: [`.prettierignore`](../.prettierignore)

#### Linting

This project uses [ESLint][7] to lint JavaScript and TypeScript files.

To review our linting guidelines, see our configuration files:

- Configuration: [`.eslintrc.js`](../.eslintrc.js)
- Ignore Patterns: [`.eslintignore`](../.eslintignore)

## Making Changes

For more information on how to make changes within different package scopes, see
the Contributing Guide for each package:

- [`api`](../packages/api/docs/CONTRIBUTING.md)
- [`app`](../packages/app/docs/CONTRIBUTING.md)
- [`core`](../packages/core/docs/CONTRIBUTING.md)
- [`system`](../packages/system/docs/CONTRIBUTING.md)

## Documentation

- JavaScript & TypeScript: [JSDoc][8], linted with [`eslint-plugin-jsdoc`][9]
- Sass: [SassDoc][10]

Before making a pull request, be sure your code is well documented, as it will
be part of your code review.

## Testing

This project uses [Jest][11] as its test runner. To run the tests in this
project, run `yarn test` from the project root.

Husky is configured to run tests before every push. If a bug report concerning a
failed test is needed, use the command `git pnv` to push your code without
running the Husky `pre-push` hook.

## Getting Help

If you need help, make note of any issues in their respective files. Whenever
possible, create a test to reproduce the error. Make sure to label your issue as
`discussion`, `help wanted`, and/or `question`.

## Creating a Pull Request

When you're ready to have your changes reviewed, make sure your code is
[well documented](#documentation). The `pre-commit` and `pre-push` hooks will
test your changes against our coding guidelines, as well run all of the tests in
this project.

### Submit for Review

- Use [**this template**](./pull_request_template.md)
- Label your pull request appropriately
- Assign the task to yourself and the appropriate reviewer

[1]: https://lerna.js.org/
[2]: https://vercel.com/docs/environment-variables
[3]: https://github.com/typicode/husky
[4]: https://www.conventionalcommits.org/
[5]: https://github.com/conventional-changelog/commitlint
[6]: https://prettier.io/
[7]: https://eslint.org/
[8]: https://jsdoc.app
[9]: https://github.com/gajus/eslint-plugin-jsdoc
[10]: http://sassdoc.com/annotations/
[11]: https://jestjs.io/
