#!/bin/bash

# Compile Workflow
# See: https://github.com/cevek/ttypescript

# 1. Remove distribution folder
# 2. Compile project using ttypescript
# 2. Copy distribution artifacts
# 4. Fix node module paths
rm -rf ./dist
ttsc -p tsconfig.prod.json
cp README.md package.json ./dist
node ../../scripts/js/fix-node-module-paths
