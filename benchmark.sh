#!/bin/bash

set -e

./start-dev-rs.sh > /dev/null

npm run start &

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:3000/benchmark/mongoose)" != "200" ]]; do sleep 5; done

echo "Benchmarking Mongoose..."
autocannon -c 100 -d 30 http://localhost:3000/benchmark/mongoose

fuser -k 3000/tcp

./start-dev-rs.sh > /dev/null

npm run start &

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:3000/benchmark/prisma)" != "200" ]]; do sleep 5; done

echo "Benchmarking Prisma..."
autocannon -c 100 -d 30 http://localhost:3000/benchmark/prisma

fuser -k 3000/tcp
