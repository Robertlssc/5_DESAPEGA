import { Router } from "express";
import verifyToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js";

import { create, getAllObjectUser } from "../controllers/objetoController.js";

const router = Router();
router.post("/create", verifyToken, imageUpload.array("imagens", 10), create);
router.get("/usuarios/imagens", verifyToken, getAllObjectUser);
//listar todos os objetos
//regatar objeto pelo id
//listar todas as imagens de um objeto
//listar todas as imagens que pertence a um usuário

export default router;
