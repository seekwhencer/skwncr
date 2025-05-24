FROM node:20-alpine

VOLUME ["/app/frontend/node_modules"]

RUN npm config set legacy-peer-deps true

RUN npm i -g npm-check-updates

WORKDIR /app/frontend
COPY frontend .
RUN npm install
