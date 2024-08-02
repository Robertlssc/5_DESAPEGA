import jwt from "jsonwebtoken";
import getToken from "./get-token.js";

const verifyToken = (request, response, next) => {
  if (!request.headers.authorization) {
    response.status(401).json({ err: "Acesso negado" });
    return;
  }

  const token = getToken(request);
  if (!token) {
    response.status(401).json({ err: "Acesso negado" });
    return;
  }

  try {
    const verified = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL");
    console.log(verified);
    request.usuario = verified;
    next();
  } catch (error) {
    response.status(400).json({ err: "Token Inválido" });
  }
};

export default verifyToken;
