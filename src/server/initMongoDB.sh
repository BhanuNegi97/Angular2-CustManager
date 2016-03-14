#! /bin/bash
scriptDir=$(dirname $0)
echo ${scriptDir}
mongo ${scriptDir}/initMongoData.js
echo -
echo Your data is loaded
read -p "Press [Enter] to exit..."