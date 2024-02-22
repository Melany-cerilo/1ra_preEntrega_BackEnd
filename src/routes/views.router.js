import Express from "express";
import ProductManager from "../dao/fileSystem/productManager.js";
import ProductManagerDb from "../dao/mongoDb/productManagerDb.js";
const router = Express.Router();
const pathProd = "./src/products.json";
const pathId = "./src/id.json";

//Este servicio le devuelve al home los productos  al cliente.
router.get("/", async (req, res) => {
  // const manager = new ProductManager(pathProd, pathId);
  const manager = new ProductManagerDb();
  const products = await manager.getProducts();

  res.render("home", { products, style: "style.css" });
});
//este servicio devuelve al cliente una vista que actualiza sola en tiempo real los productos mediante js con websocket.
router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", { style: "style.css" });
});
//este servicio devuelve al cliente una vista con un formulario.
router.get("/message", (req, res) => {
  res.render("message");
});
export default router;
