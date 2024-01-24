import Express from "express";
import ProductManager from "../src/productManager.js";

const router = Express.Router();

const pathProd = "./src/products.json";
const pathId = "./src/id.json";
//endpoint products
//hacer aca todos el get el post el put y el delete

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

router.get("/api/products", (req, res) => {
  //Servicio para obtener productos con posibilidad de limitar la cantidad de resultados.
  const manager = new ProductManager(pathProd, pathId);
  let products = manager.getProducts();
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) products = products.slice(0, limit);
  res.json(products);
});

router.get("/api/products/:idProduct", (req, res) => {
  //Servicio para obtener producto por ID
  const manager = new ProductManager(pathProd, pathId);
  let idProduct = parseInt(req.params.idProduct);
  let product = manager.getProductById(idProduct);
  if (!product) return res.send({ error: "No se encuentra el producto" });
  res.send({ product });
});

//servicio para agregar un producto
router.post("/api/products", (req, res) => {
  const manager = new ProductManager(pathProd, pathId);
  let error = manager.addProduct(req.body);
  if (!error) {
    res.send({ msg: "Producto agregado" });
  }
  res.send(error);
});

//servicio para actualizar un producto
router.put("/api/products/:idProduct", (req, res) => {
  const manager = new ProductManager(pathProd, pathId);
  let idProduct = parseInt(req.params.idProduct);
  let error = manager.updateProduct(req.body, idProduct);
  if (!error) {
    res.send({ msg: "Producto modificado" });
  }
  res.send(error);
});

//servicio para eliminar un producto buscandolo por ID que se envia por parametro
router.delete("/api/products/:idProduct", (req, res) => {
  const manager = new ProductManager(pathProd, pathId);
  let idProduct = parseInt(req.params.idProduct);
  let error = manager.deleteProduct(idProduct);
  if (!error) {
    res.send({ msg: "Producto eliminado" });
  }
  res.send(error);
});

export default router;
