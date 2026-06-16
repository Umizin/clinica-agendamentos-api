#!/bin/sh
set -e
GATEWAY_URL=${GATEWAY_URL:-http://gateway:3000}
case "$GATEWAY_URL" in
  http*) ;;
  *) GATEWAY_URL="http://${GATEWAY_URL}" ;;
esac
sed "s|GATEWAY_URL|${GATEWAY_URL}|g" /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
