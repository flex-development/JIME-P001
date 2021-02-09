#!/bin/bash

# Vercel Ignored Build Step
# If the following workflow exists with "0", the build will be skipped.
# If a code "1" or greater is returned, then a new deployment will be built.
# See: https://vercel.com/docs/platform/projects#ignored-build-step

# Common files to check for changes in the root of each package
COMMON_FILES="package.json tsconfig.json vercel.json"

# Check for changes in `packages/core`
CORE_PACKAGE="../core/src ../core/package.json ../core/tsconfig.json ../core/tsconfig.prod.json"

# Check for changes in root package
ROOT_PACKAGE="../../scripts ../../.vercelignore ../../babel.config.json ../../lerna.json ../../package.json ../../tsconfig.json ../../yarn.lock"

if [[ "$@" == "api" ]]; then
  git diff HEAD^ HEAD --quiet api lib $COMMON_FILES $CORE_PACKAGE $ROOT_PACKAGE
elif [[ "$@" == "app" ]]; then
  git diff HEAD^ HEAD --quiet plugins public scripts src babel.config.js next.config.js postcss.config.js robots-txt.config.js tsconfig.dev.json tsconfig.prod.json ../api/lib/types ../system/src/**/* ../system/src/index.ts ../system/package.json ../system/tsconfig.prod.json $COMMON_FILES $CORE_PACKAGE $ROOT_PACKAGE
elif [[ "$@" == "system" ]]; then
  git diff HEAD^ HEAD --quiet .storybook src babel.config.js postcss.config.js tsconfig.app.json webpack.common.js $COMMON_FILES $CORE_PACKAGE $ROOT_PACKAGE
else
  git diff HEAD^ HEAD --quiet $COMMON_FILES $ROOT_PACKAGE
fi
