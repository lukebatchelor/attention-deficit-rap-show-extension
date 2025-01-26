#!/usr/bin/env bash
mkdir -p dist
rm -rf dist/*

echo "Creating ./dist/rap-disorder-extension.tar.gz"

tar -czvf ./dist/rap-disorder-extension.tar.gz ./attention-deficit-rap-disorder-extension/*

echo "Created ./dist/rap-disorder-extension.tar.gz"