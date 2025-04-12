FROM node:20-alpine

VOLUME ["/app/server/node_modules"]

RUN npm config set legacy-peer-deps true

WORKDIR /app/server
COPY server .
RUN npm install
