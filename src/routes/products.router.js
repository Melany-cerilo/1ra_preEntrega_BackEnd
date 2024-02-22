import Express from "express";
import ProductManagerDb from "../dao/mongoDb/productManagerDb.js";
import socketServer from "../app.js";
const router = Express.Router();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

router.get("/api/products", async (req, res) => {
  //Servicio para obtener productos con posibilidad de limitar la cantidad de resultados.
  const manager = new ProductManagerDb();
  let products = await manager.getProducts();
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) products = products.slice(0, limit);
  if (products.length > 0) {
    res.send({ msg: "Se encontraron productos", payload: products });
  } else {
    res.send({ msg: "No se encontraron productos" });
  }
});

router.get("/api/products/:idProduct", async (req, res) => {
  //Servicio para obtener producto por ID
  const manager = new ProductManagerDb();
  let idProduct = req.params.idProduct;
  let product = await manager.getProductById(idProduct);
  if (!product) {
    res.send({ error: "No se encuentra el producto" });
  } else {
    res.send({ product });
  }
});

//servicio para agregar un producto
router.post("/api/products", async (req, res) => {
  const manager = new ProductManagerDb();
  let resultado = await manager.addProduct(req.body);
  if (resultado._id) {
    res.send({ msg: "Producto agregado", _id: resultado.id });
    socketServer.emit("product_change", await manager.getProducts());
  } else {
    res.send({ msg: "Error al agregar producto: " + resultado.msg });
  }
});

//servicio para actualizar un producto
router.put("/api/products/:idProduct", async (req, res) => {
  const manager = new ProductManagerDb();
  let idProduct = req.params.idProduct;
  let error = await manager.updateProduct(req.body, idProduct);
  if (!error) {
    res.send({ msg: "Producto modificado" });
    socketServer.emit("product_change", await manager.getProducts());
  } else {
    res.send({ msg: error });
  }
});

//servicio para eliminar un producto buscandolo por ID que se envia por parametro

router.delete("/api/products/:idProduct", async (req, res) => {
  const manager = new ProductManagerDb();
  let idProduct = req.params.idProduct;
  let error = await manager.deleteProduct(idProduct);
  if (!error) {
    res.send({ msg: "Producto eliminado" });
    socketServer.emit("product_change", await manager.getProducts());
  } else {
    res.send({ msg: error });
  }
});

export default router;
