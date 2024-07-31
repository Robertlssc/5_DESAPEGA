import jwt from "jsonwebtoken";

//assincrono
const createUserToken = async (usuario, request, response) => {
  //criar token
  const token = jwt.sign(
    {
      nome: usuario.nome,
      id: usuario.usuario_id,
    },
    "SENHASUPERSEGURAEDIFICIL" //senha
  );
  //Retornar o token
  response.status(200).json({
    message: "Você está logado!",
    token: token,
    usuarioId: usuario.usuario_id,
  });
};

export default createUserToken;
