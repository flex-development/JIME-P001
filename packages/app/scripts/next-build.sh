#!/bin/bash

# Custom Next.js `build` script
# See: https://nextjs.org/docs/api-reference/cli#build
# See: https://github.com/itgalaxy/generate-robotstxt

# Custom build workflow
# 1. Get local production environment variables and delete development variables
# 2. Delete Next.js build directory
# 3. Delete `robots.txt` file
# 4. Generate new `robots.txt` file
# 5. Build Next.js app with production profiling and verbose build output
dotenv -e .env.production.local -- rm .env.development.local || true
rm -rf .next
rm public/robots.txt
generate-robotstxt public/robots.txt
next build --debug --profile
