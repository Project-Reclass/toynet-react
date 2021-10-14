FROM node as content

WORKDIR /content

RUN git clone https://github.com/Project-Reclass/toynet-content.git

FROM nginx:alpine

WORKDIR /app

COPY --from=content "/content/toynet-content/" "/usr/share/nginx/html"

COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh
COPY ./http.conf /app/http.conf

RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
