#!/bin/bash

function build() {
  docker image build -t soccerquiz .
}

function run() {
  docker container run -p 3000:3000 -v $(pwd):/usr/src/app --name soccerquiz soccerquiz:latest
}

function rmc() {
  docker container rm soccerquiz
}

function rmi() {
  docker image rm soccerquiz:latest
}

function usage() {
  echo "Usage: ./script.sh [PARAMETER]"
  echo "Possible parameters:"
  echo "---> build  =>  build a docker image from Dockerfile"
  echo "---> run    =>  run the container"
  echo "---> rmc    =>  remove container"
  echo "---> rmi    =>  remove image"
}

if [ $# -ne 1 ]; then
  usage
elif [ $1 = "build" ]; then
  build
elif [ $1 = "run" ]; then
  run
elif [ $1 = "rmc" ]; then
  rmc
elif [ $1 = "rmi" ]; then
  rmi
else
  usage
fi
