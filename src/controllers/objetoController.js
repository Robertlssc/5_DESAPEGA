import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import { response } from "express";

export const create = async (request, response) => {
  const { nome, peso, cor, descricao } = request.body;
  const disponivel = 1;

  //buscar o token do usuário cadastrado
  const token = getToken(request);
  const user = await getUserByToken(token);

  if (!nome) {
    response.status(400).json({ message: "O nome do objeto é obrigatório" });
    return;
  }
  if (!peso) {
    response.status(400).json({ message: "O peso do objeto é obrigatório" });
    return;
  }
  if (!cor) {
    response.status(400).json({ message: "A cor do objeto é obrigatório" });
    return;
  }
  if (!descricao) {
    response
      .status(400)
      .json({ message: "A descricao do objeto é obrigatório" });
    return;
  }

  const objeto_id = uuidv4();
  const usuario_id = user.usuario_id;
  const insertSql = /*sql*/ `
  INSERT INTO objetos (??, ??, ??, ??, ??, ??, ??)VALUES(?, ?, ?, ?, ?, ?, ?)`;
  const insertData = [
    "objeto_id",
    "nome",
    "peso",
    "cor",
    "descricao",
    "disponivel",
    "usuario_id",
    objeto_id,
    nome,
    peso,
    cor,
    descricao,
    disponivel,
    usuario_id,
  ];
  conn.query(insertSql, insertData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Erro ao cadastrar objeto" });
      return;
    }
    if (request.files) {
      //cadastrar no banco
      const insertImageSql = /*sql*/ `INSERT INTO objeto_images
        (image_id, objeto_id, image_path) VALUES ?`;
      const imageValues = request.files.map((file) => [
        uuidv4(),
        objeto_id,
        file.filename,
      ]);
      conn.query(insertImageSql, [imageValues], (err) => {
        if (err) {
          console.error(err);
          response
            .status(500)
            .json({ err: "Erro ao salvar imagens do objeto" });
          return;
        }
        response
          .status(201)
          .json({ message: "Objeto cadastrado com sucesso!" });
      });
    } else {
      response.status(201).json({ message: "Objeto cadastrado com sucesso!" });
    }
  });
};

export const getAllObjectUser = async (request, response) => {
  try {
    const token = getToken(request);
    const user = await getUserByToken(token);

    const usuarioId = user.usuario_id;
    const selectSql = /*sql*/ `
    SELECT
    obj.objeto_id,
    obj.usuario_id,
    obj.nome,
    obj.peso,
    obj.cor,
    obj.descricao,
    GROUP_CONCAT(obj_img.image_path SEPARATOR',') AS image_path
    FROM 
      objetos AS obj
    LEFT JOIN 
      objeto_images AS obj_img ON obj.objeto_id = obj_img.objeto_id
    WHERE 
      obj.usuario_id = ?
    GROUP BY
      obj.objeto_id, obj.usuario_id, obj.nome, obj.peso, obj.cor, obj.descricao
    `;
    conn.query(selectSql, [usuarioId], (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao buscar objeto" });
        return;
      }
      const objetosUsuario = data;
      response.status(200).json(objetosUsuario);
    });
  } catch (error) {
    console.error(err);
  }
};
