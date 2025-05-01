FROM node:20-alpine

VOLUME ["/app/data/node_modules", "/app/frontend/node_modules","/app/server/node_modules"]

RUN apk -q --no-progress add --no-cache rsync

RUN echo @edge http://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && apk upgrade --update-cache --available \
    && apk update \
    && apk add --no-cache \
        python3 \
        py3-pip \
        libjpeg-turbo-dev \
        imagemagick-libs@edge \
        imagemagick@edge

RUN npm config set legacy-peer-deps true

WORKDIR /app
COPY . .

WORKDIR /app/data
RUN npm install
RUN npm run build

WORKDIR /app/frontend
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN npm install

WORKDIR /app
