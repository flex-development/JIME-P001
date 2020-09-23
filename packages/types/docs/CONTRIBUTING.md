# Contributing

These instructions will help you install the project on your local machine, as
well follow our coding guidelines. You'll also find information on making a pull
request.

## Overview

[Getting Started](../../../docs/CONTRIBUTING.md)  
[Development Environment](#development-environment)  
[Making Changes](#making-changes)

## Development Environment

1. Copy the snippet below to get the project running on your local machine.

   If you're coming from the
   [root Contributing Guide](../../../docs/CONTRIBUTING.md), skip the first
   step.

   ```zsh
    git clone https://github.com/flex-development/JIME-P001.git; cd JIME-P001; yarn
    cd packages/types
   ```

2. Run the project in development or production mode

   - `yarn dev`: Compile types in watch mode
   - `yarn build`: Compile types for distribution

## Making Changes

Type declarations used by **both**
[`@flex-development/morenaskustomz`](../../app/README.md) and
[`@flex-development/kustomz`](../../system/README.md) should be added to the
[`lib`](../lib) directory.
