import express from "express";
const server = express();
const port = 8080;

server.use(express.static('../frontend/dist'));

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});