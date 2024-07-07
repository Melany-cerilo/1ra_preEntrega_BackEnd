import Express from "express";
import { addLogger, logger } from "./logger/logger_entorno.js";
import mongoose from "mongoose";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./config/config.js";
import handlebars from "express-handlebars";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import ProductManagerDb from "../src/dao/mongoDb/productManagerDb.js";
import errorHandler from "./config/errorMiddleware.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = Express();
const PORT = 3000;

console.log(config);
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
//logger
app.use(addLogger);
app.use(Express.static(__dirname + "/public"));

//Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 900,
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//configuracion de rutas
app.use(appRouter);

//Manejo de errores
app.use(errorHandler);

//dejo en escucha el servidor
socketServer.on("connection", async (socket) => {
  logger.info("Nuevo cliente conectado");

  //instancio manager para emitir a la primera los productos del archivo de products.
  const manager = new ProductManagerDb();
  const products = await manager.getProducts();
  socket.emit("product_change", products);
});

//LO NUEVO mongoose
mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("Conectado a la DB");
  })
  .catch((error) => {
    logger.error("Error al conectarse con la DB", error);
  });

//swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación del poder y el saber",
      description: "API pensada para la clase de swagger",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

//exporto socketserver para poder usarlo en los router.
export default socketServer;
