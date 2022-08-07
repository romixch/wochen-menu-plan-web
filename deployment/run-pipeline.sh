#!/usr/bin/env bash

if [ ./build-hook/main -nt ./build-hook/last-main ]; then
    touch ./build-hook/last-main
    echo "Building Wochenmenuplan App..."

    cd ..
    git pull
    git checkout main
    docker compose build
    docker compose up -d

    echo "Done building!"
else
    echo "Nothing to do"
fi