import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const register = (request, response) => {
  const { nome, email, telefone, senha, confirmsenha } = request.body;

  const checkEmailSQL = /*sql*/ `SELECT * FROm usuarios WHERE ?? = ?`;
  const checkEmailData = ["email", email];
  conn.query(checkEmailSQL, checkEmailData, async (err, data) => {
    if (err) {
      console.log(err);
      response.status(500).json({ err: "Não foi possível buscar usuario" });
    }
    if (data.length > 0) {
      response.status(409).json({ err: "E-mail já está em uso!" });
    }
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);
    // console.log(salt);
    // console.log("senha recebida: ", senha);
    // console.log("Senha Criptografada: ", senhaHash);

    // Cadastrar Usuário
    const id = uuidv4();
    const imagem = "userDefault.png";

    const insertSql = /*sql*/ `INSERT INTO usuarios
    (??, ??, ??, ??, ??, ??) Values (?, ?, ?, ?, ?, ?)`;

    const insertData = [
      "usuario_id",
      "nome",
      "email",
      "telefone",
      "senha",
      "imagem",
      id,
      nome,
      email,
      telefone,
      senhaHash,
      imagem,
    ];
    conn.query(insertSql, insertData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao cadastrar usuário" });
        return;
      }

      response.status(201).json({ message: "Usuário cadastrado" });
    });
  });
};
