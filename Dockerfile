FROM node as builder

WORKDIR app

COPY package.json package-lock.json ./

COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json

RUN npm i

RUN npm run build
RUN npm prune --production


FROM nginx:alpine

WORKDIR app

RUN mkdir -p /app/frontend/build

COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh

COPY --from=builder "/app/build" "/usr/share/nginx/html"

RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
