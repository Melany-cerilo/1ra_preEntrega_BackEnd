import Express from "express";
import userController from "../controllers/users.controller.js";
import { authorization } from "../config/authorization.js";
const router = Express.Router();
const usersController = new userController();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//Servicio para obtener productos con posibilidad de limitar la cantidad de resultados, realizar ordenamiento asc o desc, filtrar por categoria y pagina. s
router.get("/api/users/premium/:idUser", usersController.makeUserPremium);
router.post("/api/users/updatePass", usersController.updatePass);
export default router;
