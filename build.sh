#!/bin/bash

# stop
cd ~/projects/skwncr.net
docker-compose -f docker-compose-prod.yml down --rmi all

# remove old stuff
cd ~/projects
rm -rf skwncr.net

# checkout
git clone https://github.com/seekwhencer/skwncr.git skwncr.net
cd skwncr.net
chmod +x build.sh

# build
docker-compose build --no-cache

# start
docker-compose -f docker-compose-prod.yml up -d


