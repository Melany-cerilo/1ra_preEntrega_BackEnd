import Express from "express";
import ProductManager from "../productManager.js";
const router = Express.Router();
const pathProd = "./src/products.json";
const pathId = "./src/id.json";

//Este servicio le devuelve al home los productos  al cliente.
router.get("/", (req, res) => {
  const manager = new ProductManager(pathProd, pathId);
  const products = manager.getProducts();

  res.render("home", { products, style: "style.css" });
});
//este servicio devuelve al cliente una vista que actualiza sola en tiempo real los productos mediante js con websocket.
router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", { style: "style.css" });
});

export default router;
