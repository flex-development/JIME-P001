#!/bin/bash

# Custom Jest Workflow Script

# 1. Set `BABEL_ENV` environment variable
# 2. Run Jest with global flags and allow for additional arguments
clear
BABEL_ENV=jest
jest --detectOpenHandles --passWithNoTests $@
