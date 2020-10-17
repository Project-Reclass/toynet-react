#!/bin/sh

currURI=https://raw.githubusercontent.com/Project-Reclass/toynet-django/master
if [ -z ${SERVER_URI+x} ]; then echo "SERVER_URI needs to be set"; exit 1 ; else echo "SERVER_URI is set to '$SERVER_URI'"; fi

if [ -z ${CURR_URI} ]; then echo "CURR_URI not set. Defaulting to $currURI" ; else set $CURR_URI=$currURI; echo "CURR_URI is et to '$currURI'"; fi

echo $CURR_URI

envsubst '\${CURR_URI},\${SERVER_URI}' < http.conf > /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

nginx -t
exec nginx -g 'daemon off;'
