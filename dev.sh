#!/bin/sh

#this shell script is start script for development

MONGO_PATH="/home/$(whoami)/mongodb-linux-x86_64-2.6.7"

sh "$MONGO_PATH/start.sh" 

nodemon
