import express from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT;

//importar conexão
import conn from "./config/conn.js";

app.get("/", (request, response) => {
  response.send("Olá, Mundo!");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
