FROM node:14-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json
COPY ./header.js ./header.js
COPY ./.eslintrc.json ./.eslintrc.json

RUN npm run build

FROM nginx:1-alpine

WORKDIR /app

COPY --from=builder "/app/build" "/usr/share/nginx/html"

COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh
COPY ./http.conf /app/http.conf

RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
