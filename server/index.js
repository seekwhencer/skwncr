import express from "express";

const server = express();
const port = parseInt(process.env?.SERVER_PORT || 9090);

server.use((req, res, next) => {
    next();
});

server.use(express.static('../frontend/dist'));

server.listen({
    port: port,
    host: '0.0.0.0'
}, () => {
    console.log(`WTF ${port}`);
});
