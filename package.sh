#!/bin/sh
# Build the store-upload zip: runtime files only, no docs/VCS.
set -eu
cd "$(dirname "$0")"
VERSION=$(node -p "JSON.parse(require('fs').readFileSync('manifest.json','utf8')).version")
OUT="dist/tab-custodian-${VERSION}.zip"
mkdir -p dist
rm -f "$OUT"
zip -q "$OUT" manifest.json background.js popup.html popup.js options.html options.js icon.png
echo "Built ${OUT}:"
unzip -l "$OUT"
