#!/bin/sh
set -e

PORT=${PORT:-8080}
GATEWAY_URL=${GATEWAY_URL:-http://gateway:3000}

case "$GATEWAY_URL" in
  http*) ;;
  *) GATEWAY_URL="http://${GATEWAY_URL}" ;;
esac

sed "s|GATEWAY_URL|${GATEWAY_URL}|g; s|LISTEN_PORT|${PORT}|g" \
  /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
