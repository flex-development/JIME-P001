#!/bin/bash

# Custom Next.js `dev` script

# Get port to run app on
PORT=${NEXT_PORT:=3001}

# PID of port to kill
PID=$(lsof -ti:$PORT)

# Custom dev workflow
# 1. Kill port Next.js app is running on
# 2. Clear terminal
# 3. Start Next.js app
if [[ $PID ]]; then
  kill $PID
fi
clear
next dev -p $PORT
