import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;

//importar conexão
import conn from "./config/conn.js";

//Importar dos módulos (TABELA)
import "./models/usuarioModel.js";

//importar as rotas
import usuarioRouter from "./routes/usuarioRoute.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Utilizar a rota
app.use("/usuarios", usuarioRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Recurso não encontrado " });
}); //404

// app.get("*", (request, response) => {
//   response.send("Olá, Mundo!");
// });

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
