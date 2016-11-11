#!/bin/bash
rsync -av --progress . ~/Desktop/sbm-theme --exclude bower_components --exclude node_modules --exclude .git
cd ~/Desktop
zip -r sbm-theme.zip sbm-theme
rm -rf sbm-theme