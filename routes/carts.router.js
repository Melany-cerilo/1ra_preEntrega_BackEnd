import Express from "express";
import CartManager from "../src/cartManager.js";

const router = Express.Router();

const pathCarts = "./src/carts.json";
const pathIdCart = "./src/idCart.json";

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

router.post("/api/carts", (req, res) => {
  const manager = new CartManager(pathCarts, pathIdCart);
  manager.addCart(req.body);
  res.send({ msg: "carrito agregado al array" });
});

router.post("/:cartId/product/:prodId", (req, res) => {
  const manager = new CartManager(pathCarts, pathIdCart);
  let cartId = parseInt(req.params.cartId);
  let prodId = parseInt(req.params.prodId);
  let quantity = req.body.quantity;
  let error = manager.addtoCart(cartId, prodId, quantity);
  if (error) {
    res.send({
      msg: `No se pudo agregar producto a tu carrito con ID ${cartId}`,
    });
  }
  res.send({
    msg: `se agregó un nuevo producto a tu carrito con ID ${cartId}`,
  });
});

router.get("/api/carts/:cartId", (req, res) => {
  const manager = new CartManager(pathCarts, pathIdCart);
  let cartId = parseInt(req.params.cartId);
  let result = manager.getCartById(cartId);
  if (result) {
    res.send({ result });
  } else {
    res.status(404).json({
      msg: `No se encontró carrito con Id: ${cartId}`,
    });
  }
});

export default router;
