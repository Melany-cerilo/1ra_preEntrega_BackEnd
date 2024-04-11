import Express from "express";
import ViewsController from "../controllers/views.controller.js";
const router = Express.Router();
const pathProd = "./src/products.json";
const pathId = "./src/id.json";

const viewsController = new ViewsController();

//Este servicio le devuelve al home los productos  al cliente.
router.get("/", viewsController.getHome);
//este servicio devuelve al cliente una vista que actualiza sola en tiempo real los productos mediante js con websocket.
router.get("/realTimeProducts", viewsController.realTimeProducts);
//este servicio devuelve al cliente una vista con un formulario.
router.get("/message", viewsController.getMessage);
//este servicio devuelve al cliente una vista con los productos.
router.get("/productsPaginate", viewsController.productsPaginate);
//este servicio devuelve al cliente una vista con el carrito seleccionado y sus productos.
router.get("/cartView/:cartId", viewsController.getCart);
// servicio para la vista de login
router.get("/logIn", viewsController.logIn);
//servicio que devuelve la vista del formulario del registro
//si la sesion se encuentra iniciada y quiere cambiar la URL para registrarse
//se redireccionará a home
router.get("/signIn", viewsController.signIn);

//servicio que devuelve la vista del perfil del usuario.
//si la sesion no esta iniciada me redireccionará a login
router.get("/profile", viewsController.profile);
export default router;
