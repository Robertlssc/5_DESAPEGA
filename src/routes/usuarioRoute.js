import { Router } from "express";

//importar Controllers de usuario
import {
  register,
  login,
  checkUser,
} from "../controllers/usuarioController.js";

//Importar os helpers
import validarUsuario from "../helpers/validar-user.js";

const router = Router();

//localhost:3333/usuarios/register
router.post("/register", validarUsuario, register);
router.post("/login", login);
router.get("/:id", checkUser);

export default router;
