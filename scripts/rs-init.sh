#!/bin/bash

set -e

DELAY=25

mongosh < /scripts/config-rs.js
mongosh --nodb < /scripts/wait.js
mongosh < /scripts/config-user.js
