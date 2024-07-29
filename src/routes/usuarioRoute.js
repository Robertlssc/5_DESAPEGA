import { response, Router } from "express";

//importar Controllers de usuario
import { register } from "../controllers/usuarioController.js"

//Importar os helpers
import validarUsuario from "../helpers/validar-user.js";

const router = Router();

//localhost:3333/usuarios/register
router.post("/register", validarUsuario, register);

export default router;
