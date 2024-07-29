export const validarUsuario = (request, response, next) => {
  const { nome, email, telefone, senha, confirmsenha } = request.body;

  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!email) {
    response.status(400).json({ message: "O email é obrigatório" });
    return;
  }
  if (!telefone) {
    response.status(400).json({ message: "O telefone é obrigatório" });
    return;
  }
  if (!senha) {
    response.status(400).json({ message: "A senha é obrigatória" });
    return;
  }
  if (!confirmsenha) {
    response.status(400).json({ message: "confirmar a senha é obrigatório" });
    return;
  }
  if (!email.includes("@")) {
    response.status(409).json({ message: "O email deve conter @" });
    return;
  }
  if (senha !== confirmsenha) {
    response
      .status(409)
      .json({ message: "A senha e confirmação devem ser iguais" });
  }
  next()
};

export default validarUsuario;
