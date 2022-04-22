@echo off

if [%1]==[] goto :missing_param

set version=%1

echo --------------------------------------------------
echo - Building docker image
echo --------------------------------------------------
docker build -t parse-server .

echo --------------------------------------------------
echo - Tagging images, using 'latest' and '%version%'
echo --------------------------------------------------
docker image tag parse-server danibjor/parse-server:latest
docker image tag parse-server danibjor/parse-server:%version%

echo --------------------------------------------------
echo - Uploading images to docker hub
echo --------------------------------------------------
docker image push danibjor/parse-server:latest
docker image push danibjor/parse-server:%version%

echo --------------------------------------------------
echo - Script complete
echo --------------------------------------------------

goto :completed


:missing_param

echo --------------------------------------------------
echo Missing version. Usage: build-docker.bat 5.2.0
echo Usage: build-docker.bat version
echo Example: build-docker.bat 5.2.0
echo --------------------------------------------------

goto :completed


:completed
