#!/bin/sh

if [ -z ${SERVER_URI+x} ]; then echo "SERVER_URI needs to be set"; exit 1 ; else echo "SERVER_URI is set to '$SERVER_URI'"; fi

envsubst '\$SERVER_URI' < http.conf > /etc/nginx/conf.d/default.conf

nginx -t
exec nginx -g 'daemon off;'
