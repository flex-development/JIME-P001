#!/bin/bash

# Custom Storybook start script

# Get port to run app on
PORT=${STORYBOOK_PORT:=3000}

# Get storybook static directory
STATIC_DIR=${STORYBOOK_STATIC_DIR:=../app/public}

# PID of port to kill
PID=$(lsof -ti:$PORT)

# Custom start workflow
# 1. Kill port Storybook is running on
# 2. Clear terminal
# 3. Run unit tests to display with `@storybook/addon-jest`
# 4. Start Storybook app and set static directory
if [[ $PID ]]; then
  kill $PID
fi
clear
yarn test:quiet
start-storybook -p $PORT -s $STATIC_DIR --ci $@
