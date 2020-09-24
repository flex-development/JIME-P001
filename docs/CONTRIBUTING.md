# Contributing

These instructions will help you install the project on your local machine, as
well follow our coding guidelines. You'll also find information on making a pull
request.

## Overview

[Getting Started](#getting-started)  
[Coding Guidelines](#coding-guidlines)  
[Testing](#testing)  
[Creating a Pull Request](#creating-a-pull-request)

## Getting Started

### Git Configuration

Copy the [starter Git global configuration](.gitconfig) to stay inline with our
coding guidelines, as well as begin extending your own workflow.

**Note**:

- The examples below will uses aliases from the starter config
- The examples below require you to
  [install Git Flow](https://github.com/nvie/gitflow/wiki/Installation)

### Yarn

This project uses [Lerna](https://lerna.js.org/) with Yarn workspaces. To
install Yarn, view the
[installation documentation](https://classic.yarnpkg.com/en/docs/install).

### Development Environment

Copy the snippet below to get your development environment setup:

```zsh
git clone https://github.com/flex-development/JIME-P001.git; cd JIME-P001
yarn
```

- `yarn dev:app`: Start Next.js app on port `3001`
- `yarn dev:ui`: Start Storyboook app on port `3000`

## Coding Guidelines

### Code Formatting

This project uses [Prettier](https://prettier.io/) to format all code.

To review our formatting guidelines, see our configuration files:

- Configuration:`[.prettierrc.js](../.prettierrc.js)`
- Ignore Patterns: `[.prettierignore](../.prettierignore)`

### Code Linting

This project uses [ESLint](https://eslint.org/) to lint JavaScript and
TypeScript files.

To review our linting guidelines, see our configuration files:

- Configuration:`[.eslintrc.json](../.eslintrc.json)`
- Ignore Patterns: `[.eslintignore](../.eslintignore)`

### Commit Messages

This project follows [Emoji Log](https://github.com/ahmadawais/Emoji-Log)
standards when making commits.

Commit messages should follow one of the following templates:

1. **`📦 NEW: MESSAGE_GOES_HERE`** - Use when you add something entirely new
2. **`✅ TEST: MESSAGE_GOES_HERE`** - Use when changes are related to testing or
   mock data
3. **`👌🏾 IMPROVE: MESSAGE_GOES_HERE`** - Use when you improve/enhance a piece of
   code (ex: refactoring)
4. **`🐛 FIX: MESSAGE_GOES_HERE`** - Use when you fix a bug
5. **`📖 DOC: MESSAGE_GOES_HERE`** - Use when you add/update documentation (ex:
   README, inline docs)
6. **`🚀 RELEASE: MESSAGE_GOES_HERE`** - Use when changes are related to a
   release

For example:

```zsh
  git new "eslint configuration"
```

This will produce the following commit: `📦 NEW: eslint configuration`

### Documentation

- JavaScript: [JSDoc](https://jsdoc.app)
- Sass: [SassDoc](http://sassdoc.com/annotations/)
- TypeScript: [TypeDoc](https://typedoc.org/guides/doccomments/)

Before making a pull request, be sure your code is well documented, as it will
be part of your code review.

### Workflow

This project uses the Gitflow Workflow, a Git workflow design that was first
published and made popular by
[Vincent Driessen at nvie](https://nvie.com/posts/a-successful-git-branching-model/).

Gitflow has several benefits:

- Assigns specific roles to branches
- Defines how branches should interact
- Uses individual branches for preparing, maintaining, and recording releases
- Leverages all benefits of
  [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

#### Branch Naming Convention

When creating a new branch, the name should match the following format:
**`feature/`**, **`hotfix/`**, **`release/`**, or **`support/`** followed by
**`<branch_name>`**

For example:

```zsh
  git feature repo-setup
```

will create a new branch titled `feature/repo-setup` and tell Git to set up
tracking information for the branch.

## Testing

This project uses [Jest](https://jestjs.io/) as its test runner.

To run the tests in this project, run `lerna run test`.

## Creating a Pull Request

If you need help, make note of any issues in their respective files. If
possible, create a test to reproduce the error. Make sure to label your pr as
"bug" and "help wanted."

If you're ready to have your changes reviewed, make sure your code is
[well documented](#documentation) and run `yarn format; yarn lint` to check your
files for style errors.

### Submit for Review

- Use [**this template**](./pull_request_template.md)
- Label your pull request appropriately
- Prefix your pull request title with `[PR]`
- Assign the task to yourself and the appropriate reviewer
