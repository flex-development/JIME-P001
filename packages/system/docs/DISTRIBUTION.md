# Distribution

Below you'll find instructions on distributing this project locally using Lerna,
and how to publish the package to the Github Package Registry.

## Overview

[Local Distribution](#local-distribution)  
[Github Package Registry](#github-package-registry)

## Local Distribution

1. Be sure the package is built before attempting to install it

   If the script you're using doesn't already build the package, run
   `lerna run prepare --scope @flex-development/kustomz`

2. Add `"@flex-development/kustomz": "*"` to your project `dependencies`

3. Run `yarn` to re-install the project dependencies

## 🚧 Github Package Registry

TODO: Update documentation.
