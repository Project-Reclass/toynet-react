#!/bin/sh

if [ -z ${SERVER_URI+x} ]; then echo "SERVER_URI needs to be set"; exit 1 ; else echo "SERVER_URI is set to '$SERVER_URI'"; fi

cat > "client.template" <<- EOM
server {
    listen       80;
    server_name  default;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    location /api {
        proxy_pass ${SERVER_URI};
        proxy_redirect off;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
EOM

envsubst < client.template > /etc/nginx/conf.d/default.conf

nginx -t
exec nginx -g 'daemon off;'