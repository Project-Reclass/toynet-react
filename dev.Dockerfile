FROM nginx:alpine

WORKDIR app

COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh
COPY ./http.conf /app/http.conf

RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
