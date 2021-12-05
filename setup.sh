#!/usr/bin/env bash

# Description:
# This script is used to setup the environment for the project.
#
# Usage:
# ./setup.sh
#

sudo apt install -y sox

curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm

sudo npm install -g n
sudo n stable
sudo npm install -g npm
sudo npm install -g yarn

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd $SCRIPT_DIR/src/ui
sudo rm -rf node_modules || true
sudo rm -rf yarn.lock || true
sudo rm -rf package-lock.json || true
sudo yarn install

cd $SCRIPT_DIR/src/speech
sudo rm -rf node_modules || true
sudo rm -rf yarn.lock || true
sudo rm -rf package-lock.json || true
sudo yarn install


