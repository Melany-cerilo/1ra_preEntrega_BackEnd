import Express from "express";
import viewsRouter from "./views.router.js";
import cartsRouter from "./carts.router.js";
import productsRouter from "./products.router.js";
import messageRouter from "./message.router.js";
import sessionsRouter from "./sessions.router.js";

const router = Express.Router();

router.use("/", viewsRouter);
router.use("/", cartsRouter);
router.use("/", productsRouter);
router.use("/", messageRouter);
router.use("/", sessionsRouter);

export default router;
