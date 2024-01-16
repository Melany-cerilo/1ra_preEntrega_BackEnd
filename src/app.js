import ProductManager from "./productManager.js";
import Express from "express";

const app = Express();
const PORT = 8080;
const pathProd = "./src/products.txt";
const pathId = "./src/id.txt";

app.get("/products", (req, res) => {
  //Servicio para obtener productos con posibilidad de limitar la cantidad de resultados.
  const manager = new ProductManager(pathProd, pathId);
  let products = manager.getProducts();
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    products = products.slice(0, limit);
  }
  res.json(products);
});

app.get("/products/:idProduct", (req, res) => {
  //Servicio para obtener producto por ID
  const manager = new ProductManager(pathProd, pathId);
  let idProduct = parseInt(req.params.idProduct);
  let product = manager.getProductById(idProduct);
  if (!product) return res.send({ error: "No se encuentra el producto" });
  res.send({ product });
});

app.listen(PORT, () =>
  console.log(`servidor con express en el puerto ${PORT}`)
);
