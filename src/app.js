import Express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import messageRouter from "./routes/message.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import ProductManagerDb from "../src/dao/mongoDb/productManagerDb.js";
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

//Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://melCoder:melany1234@cluster0.xapkieu.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "mel1234lany",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", viewsRouter);
app.use("/", cartsRouter);
app.use("/", productsRouter);
app.use("/", messageRouter);
app.use("/", sessionsRouter);
//dejo en escucha el servidor
socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  //instancio manager para emitir a la primera los productos del archivo de products.
  const manager = new ProductManagerDb();
  const products = await manager.getProducts();
  socket.emit("product_change", products);
});

//LO NUEVO mongoose
mongoose
  .connect(
    "mongodb+srv://melCoder:melany1234@cluster0.xapkieu.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conectado a la DB");
  })
  .catch((error) => {
    console.error("Error al conectarse con la DB", error);
  });

//exporto socketserver para poder usarlo en los router.
export default socketServer;
