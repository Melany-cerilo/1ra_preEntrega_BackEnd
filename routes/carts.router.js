import Express from "express";
import CartManager from "../src/cartManager.js";

const router = Express.Router();

const pathCarts = "./src/carts.json";
const pathIdCart = "./src/idCart.json";

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//servicio para agregar un carrito al array de carritos. asignandole un ID (al principio estará vacio)
router.post("/api/carts", (req, res) => {
  const manager = new CartManager(pathCarts, pathIdCart);
  let id = manager.addCart();
  res.send({ msg: `carrito agregado al array con ID:`, id: id });
});

//servicio para agregar productos y cantidad al carrito indicado.
router.post("/api/carts/:cartId/product/:prodId", (req, res) => {
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

//servicio para traer el carrito con el ID que se indica con el parametro
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
