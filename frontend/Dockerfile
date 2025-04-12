FROM node:20-alpine

VOLUME ["/app/frontend/node_modules"]

RUN npm config set legacy-peer-deps true

WORKDIR /app/frontend
COPY frontend .
RUN npm install
