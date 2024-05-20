import Express from "express";
import productController from "../controllers/products.controller.js";
import { authorization } from "../config/authorization.js";
const router = Express.Router();
const productsController = new productController();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//Servicio para obtener productos con posibilidad de limitar la cantidad de resultados, realizar ordenamiento asc o desc, filtrar por categoria y pagina. s
router.get("/api/products", productsController.getProducts);

//Servicio para obtener producto por ID
router.get("/api/products/:idProduct", productsController.getProductById);

//servicio para agregar un producto
router.post(
  "/api/products",
  authorization(["admin", "premium"]),
  productsController.createProduct
);

//servicio para actualizar un producto
router.put(
  "/api/products/:idProduct",
  authorization(["admin"]),
  productsController.updateProduct
);

//servicio para eliminar un producto buscandolo por ID que se envia por parametro
router.delete(
  "/api/products/:idProduct",
  authorization(["admin", "premium"]),
  productsController.deleteProduct
);

export default router;
