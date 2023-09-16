#!/bin/bash

echo "obfuscating..."
exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1>obflog.log 2>&1
start=`date +%s`
error_exit()
{
  # Function. Parameter 1 is the return code
  # Parameter 2 is text to display on failure.
  if [ "${1}" -ne "0" ]; then
    echo "ERROR # ${1} : ${2}"
    exit ${1}
  fi
}

javascript-obfuscator -v &> /dev/null

if [ $? -eq 0 ]; then
   echo "javascript-obfusctor package is installed ..."
else
    npm i -g --save-dev javascript-obfuscator
fi


if [ "$1" != "" ]; then 
    echo $1
else
	error_exit $? "Kony Visualizer Web Archive File Path must be present"
fi


# $new={"$1"::-4}

#-d is for directory
unzip $1  -d Spotlight
rm -rf $1
cd Spotlight

#cache id
cat meta.json | sed -n 's|.*"cacheId":"\([^"]*\)".*|\1|p' > cacheIdFile.txt
value=$(<cacheIdFile.txt)


rm -rf cacheIdFile.txt

cd $value
cd desktopweb

echo "obfuscator started $((`date +%s` -start)) sec"

find . -type f \( -name "*Controller.js" -o -name "app.js" -o -name "konyframework.js" -o -name "kvmodules.js" \) | while read fname; do 
	ofc_start=`date +%s`;
	javascript-obfuscator "${fname}" --compact true --control-flow-flattening false --rename-globals false --unicode-escape-sequence false --self-defending true --output "${fname}";
	echo "${fname} timetaken = $((`date +%s` -ofc_start)) sec";
done;

echo "obfuscator end $((`date +%s` -start)) sec"

cd ../..

newvalue=$(( $value + 1 ))
mv $value $newvalue

sed -i -e "s+$value+$newvalue+g" meta.json

cd nocache/desktopweb
sed -i -e "s+$value+$newvalue+g" kony.manifest

cd ../..
if [ "$(uname -s)" == "Darwin" ]; then
  # For Mac OS using E option for grep as P is not avaiable
  echo "Running in MAC Configurations"
   cd ../Spotlight
   zip -r "$1" .
else
   "C:\Program Files\7-Zip\7z.exe" a -tzip "$1"
fi

cd ..
rm -rf Spotlight

echo "end $((`date +%s` -start)) sec"