#!/bin/bash

set -e

mongosh < /scripts/config-rs.js
mongosh --nodb < /scripts/wait.js
mongosh < /scripts/config-user.js
