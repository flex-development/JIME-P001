#!/bin/sh

# Creates the "*/__tests__" folder pattern in a parent folder
for d in $(ls -d */); do mkdir "${d}__tests__" || true; done
