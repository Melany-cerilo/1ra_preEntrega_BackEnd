// import ProductManager from "./productManager.js";
import Express from "express";
import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import ProductManager from "./productManager.js";

const app = Express();
const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`servidor con express en el puerto ${PORT}`)
);
const socketServer = new Server(httpServer); //Instancio el socketServer

const pathProd = "./src/products.json";
const pathId = "./src/id.json";

//configuración de handlebars
app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

app.use(Express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/", cartsRouter);
app.use("/", productsRouter);

//Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

//dejo en escucha el servidor
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  //instancio manager para emitir a la primera los productos del archivo de products.
  const manager = new ProductManager(pathProd, pathId);
  const products = manager.getProducts();
  socket.emit("product_change", products);
});

//exporto socketserver para poder usarlo en los router.
export default socketServer;
