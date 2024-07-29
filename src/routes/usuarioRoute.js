import { response, Router } from "express";

//importar Controllers de usuario
import { register } from "../controllers/usuarioController.js"

const router = Router();

//localhost:3333/usuarios/register
router.post("/register", register);

export default router;
