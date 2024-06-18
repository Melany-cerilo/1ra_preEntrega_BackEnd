import Express from "express";
import userController from "../controllers/users.controller.js";
import { authorization } from "../config/authorization.js";
import { uploader } from "../utils.js";
const router = Express.Router();
const usersController = new userController();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//Servicio para obtener productos con posibilidad de limitar la cantidad de resultados, realizar ordenamiento asc o desc, filtrar por categoria y pagina. s
router.get("/api/users/premium/:idUser", usersController.makeUserPremium);
router.post("/api/users/updatePass", usersController.updatePass);
router.post(
  "/api/users/:idUser/documents",
  uploader.fields([
    { name: "identificacion", maxCount: 1 },
    { name: "cmpdom", maxCount: 1 },
    { name: "cmpedc", maxCount: 1 },
  ]),
  usersController.saveDocuments
);
export default router;
