#! /bin/bash

# get local dir
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd $DIR

# update app
git pull origin master

# run app
node app.js
