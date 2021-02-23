#!/bin/bash

# Custom Prepare Package Script

# If `$SKIP_PREPARE` is true, don't prepare package
if [[ $SKIP_PREPARE == true ]]; then
  exit 0
fi

# 1. Build shared modules packages
# 2. Link packages with Lerna
# 3. Compile package
lerna run compile --scope @flex-development/kustomzcore
lerna link
yarn compile
