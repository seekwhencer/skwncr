FROM alpine:3.22

ENV NODE_VERSION 22.16.0-r2
ENV NPM_VERSION 11.3.0-r0
ENV CHROMIUM_VERSION 137.0.7151.55-r0

VOLUME ["/app/data/node_modules", "/app/frontend/node_modules","/app/server/node_modules"]

RUN apk -q --no-progress add --no-cache rsync

RUN echo @edge http://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories
RUN apk upgrade --update-cache --available
RUN apk update
RUN apk add --no-cache \
    python3 \
    py3-pip \
    libjpeg-turbo-dev \
    imagemagick-libs@edge \
    imagemagick@edge \
    chromium="$CHROMIUM_VERSION"

RUN apk add --no-cache \
    nodejs="$NODE_VERSION" \
    npm="$NPM_VERSION"

RUN npm config set legacy-peer-deps true
RUN npm i -g npm-check-updates

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
