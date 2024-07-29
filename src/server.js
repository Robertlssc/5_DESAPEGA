import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;

//importar conexão
import conn from "./config/conn.js";

const app = express();

app.use((request, response) => {
  response.status(404).json({ message: "Recurso não encontrado " });
}); //404

// app.get("*", (request, response) => {
//   response.send("Olá, Mundo!");
// });

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
