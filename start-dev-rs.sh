#!/bin/sh

set -e

docker compose down -v --remove-orphans
docker compose up -d

docker exec mongo1 bash -c "chmod +x /scripts/rs-init.sh"
docker exec mongo1 /scripts/rs-init.sh
