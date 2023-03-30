const express = require("express");
const cors = require("cors");
const logger = require('./functions/logger.js');
const path = require("path");
require("dotenv").config();
 
const userRoutes = require("./routes/userRoutes.js");
const providerRoutes = require("./routes/providerRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");

// Variaveis
const port = process.env.PORT;
const server = express();

// Middlewares
server.use(cors());
server.use(express.json());
server.use(logger);

// Rotas
server.use("/", userRoutes);
server.use("/", providerRoutes);
server.use("/", categoryRoutes);

server.get("/", (req, res) => {
  return res.send("<h1>Servidor rodando ...<h1>");
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} ...`);
});

