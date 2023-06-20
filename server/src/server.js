const express = require("express");
const server = express();

const morgan = require("morgan");
const cors = require("cors");

const router = require("./routes");

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
