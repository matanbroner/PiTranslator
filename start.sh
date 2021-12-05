#!/usr/bin/env bash

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd $SCRIPT_DIR/src/speech
export GOOGLE_APPLICATION_CREDENTIALS=../../gkeys.json && node index.js