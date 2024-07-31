import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
''
//?helpers
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";

//Criar usuário
export const register = (request, response) => {
  const { nome, email, telefone, senha, confirmsenha } = request.body;

  const checkEmailSQL = /*sql*/ `SELECT * FROm usuarios WHERE ?? = ?`;
  const checkEmailData = ["email", email];

  conn.query(checkEmailSQL, checkEmailData, async (err, data) => {
    if (err) {
      console.log(err);
      response.status(500).json({ err: "Não foi possível buscar usuario" });
      return;
    }
    if (data.length > 0) {
      response.status(409).json({ err: "E-mail já está em uso!" });
      return;
    }
    //Criar senha do usuário
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

      const usuarioSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
      const usuarioData = ["usuario_id", id];

      conn.query(usuarioSql, usuarioData, async (err, data) => {
        if (err) {
          console.error(err);
          response.status(500).json({ err: "Erro ao selecionar usuario" });
          return;
        }
        const usuario = data[0];
        try {
          await createUserToken(usuario, request, response);
        } catch (error) {
          console.error(err);
        }
      });
      //Usuario esteja logado na aplicacao
      //createUserToken()
      //response.status(200).json({ message: "Usuário cadastrado" });
    });
  });
};

//Logar usuário
export const login = (request, response) => {
  const { email, senha } = request.body;

  //validações
  if (!email) {
    response.status(400).json({ err: "O email é obrigatório" });
  }

  if (!senha) {
    response.status(400).json({ err: "A senha é obrigatória" });
  }

  const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
  const checkData = ["email", email];
  conn.query(checkSql, checkData, async (err, data) => {
    if (err) {
      console.log(err);
      response.status(500).json({ err: "Erro ao buscar usuário" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ err: "Usuário não encontrado" });
      return;
    }
    const usuario = data[0];

    const compararSenha = await bcrypt.compare(senha, usuario.senha);
    // console.log("senha do usuario", senha);
    // console.log("senha do objeto", usuario.senha);
    // console.log("comparar senha", compararSenha);
    if (!compararSenha) {
      return response.status(401).json({ message: "Senha inválida" });
    }
    try {
      await createUserToken(usuario, request, response);
    } catch (error) {
      console.error(error);
      response.status(500).json({ err: "Erro ao processar informação" });
    }
  });
};

//Verficar usuário
export const checkUser = (request, response) => {
  let usuarioAtual;

  //criar um helper para fazer a verificacaxo
  if (request.headers.authorization) {
    const token = getToken(request);

    const decoded = jwt.decode(token, "SENHASUPERSEGURAEDIFICIL")
    console.log(decoded)
  } else {
  }
};
