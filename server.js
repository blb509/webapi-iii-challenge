const express = require("express");

const postsRouter = require("./data/routers/posts-router.js");
const usersRouter = require("./data/routers/users-router.js");

const server = express();

server.use(express.json());

function toUpper(req, res, next) {
  if (req.method == "POST" || req.method == "PUT") {
    req.body.name = req.body.name.toUpperCase();
  }
  next();
}

server.get("/", (req, res) => {
  res.send(`
    <p>hi</p>
  `);
});

server.use("/api/users", toUpper);
server.use("/api", usersRouter, postsRouter);

module.exports = server;
