#!/usr/bin/env bash
# Build the site into public/ with the Hugo version pinned in .hugo-version.
# Extra arguments go to hugo, for example: scripts/build.sh --destination /tmp/out
# A version mismatch is a warning on a local machine and an error in CI.
set -euo pipefail
cd "$(dirname "$0")/.."

want=$(tr -d '[:space:]' < .hugo-version)
have=$(hugo version | sed -E 's/^hugo v([0-9.]+).*/\1/')

if [ "$have" != "$want" ]; then
  echo "hugo $have is installed, but .hugo-version pins $want" >&2
  if [ -n "${CI:-}" ]; then
    exit 1
  fi
fi

hugo --minify "$@"
