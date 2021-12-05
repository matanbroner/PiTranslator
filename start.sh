#!/usr/bin/env bash

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

export GOOGLE_APPLICATION_CREDENTIALS="$SCRIPT_DIR/google_api_keys.json"

cd $SCRIPT_DIR/src/speech
node index.js