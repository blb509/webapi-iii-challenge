const express = require("express");

const postsRouter = require("./data/routers/posts-router.js");
const usersRouter = require("./data/routers/users-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <p>hi</p>
  `);
});

server.use("/api", usersRouter, postsRouter);

module.exports = server;
