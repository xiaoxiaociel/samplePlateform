#!/bin/bash
MOD_NAME="samplemis"
TAR="feUI.bz2"
# add path
export PATH=/home/fis/npm/bin:$PATH
fisp --version --no-color
fisp release -cuompDd output
cd output
rm -rf test
tar cvfj $TAR ./*
mv $TAR ../
cd ..
rm -rf output
mkdir output
mv $TAR output/
echo "build end"
