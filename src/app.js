// import ProductManager from "./productManager.js";
import Express from "express";
import cartsRouter from "../routes/carts.router.js";
import productsRouter from "../routes/products.router.js";

const app = Express();
const PORT = 8080;
// const pathProd = "./src/products.txt";
// const pathId = "./src/id.txt";

//prueba nueva de rutas:
app.use("/", cartsRouter);
app.use("/", productsRouter);

//Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.listen(PORT, () =>
  console.log(`servidor con express en el puerto ${PORT}`)
);
