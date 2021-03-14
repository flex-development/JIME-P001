#!/bin/bash

# Vercel Ignored Build Step
# If the following workflow exists with "0", the build will be skipped.
# If a code "1" or greater is returned, then a new deployment will be built.
# See: https://vercel.com/docs/platform/projects#ignored-build-step

# Get number of commits to check for initial commit
HEAD_COMMIT_COUNT=$(git rev-list --count HEAD)

# Common files to check for changes in the root of each package
COMMON="package.json vercel.json"

# Check for changes in `packages/core`
CORE="../core/src ../core/package.json ../core/tsconfig.*"

# Check for changes in root package
ROOT="../../scripts ../../.vercelignore ../../tsconfig.*"

# Check for changes in root Babel file
ROOT_BABEL="../../babel.config.json"

if [[ $HEAD_COMMIT_COUNT == 1 ]]; then
  exit 1
elif [[ "$@" == "api" ]]; then
  git diff HEAD^ HEAD --quiet api lib tsconfig.* $COMMON $CORE $ROOT
elif [[ "$@" == "app" ]]; then
  git diff HEAD^ HEAD --quiet public scripts/next-build.sh scripts/js src babel.config.js next.config.js postcss.config.js robots-txt.config.js tsconfig.json tsconfig.dev.json tsconfig.prod.json ../system/scripts/prepare.sh ../system/src/**/* ../system/src/index.ts ../system/package.json ../system/tsconfig.json ../system/tsconfig.prod.json $COMMON $CORE $ROOT $ROOT_BABEL
elif [[ "$@" == "system" ]]; then
  git diff HEAD^ HEAD --quiet .storybook scripts/vercel-build.sh src postcss.config.js webpack.* tsconfig.* $COMMON $CORE $ROOT $ROOT_BABEL
else
  git diff HEAD^ HEAD --quiet $COMMON $ROOT
fi
