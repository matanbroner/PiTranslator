#!/usr/bin/env bash

# Description:
# This script is used to setup the environment for the project.
#
# Usage:
# ./setup.sh
#

curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm

sudo npm install -g n
sudo n stable
sudo npm install -g npm
sudo npm install -g yarn

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd $SCRIPT_DIR/src/ui
yarn install

cd $SCRIPT_DIR/src/speech
yarn install


