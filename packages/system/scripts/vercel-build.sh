#!/bin/bash

# Vercel Build Workflow
# 1. Build shared modules package
# 2. Link package with Lerna
# 3. Build Storybook application
lerna run compile --scope @flex-development/kustomzcore
lerna link
yarn build
