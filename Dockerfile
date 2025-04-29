FROM node:20-alpine

VOLUME ["/app/data/node_modules", "/app/frontend/node_modules","/app/server/node_modules"]

RUN apk add rsync

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
