import Express from "express";
import { authorization } from "../config/authorization.js";
import CartController from "../controllers/carts.controller.js";

const router = Express.Router();
const cartController = new CartController();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//servicio para agregar un carrito a la colección de carritos en la db. asignandole un ID (al principio estará vacio)
router.post("/api/carts", authorization(["admin"]), cartController.addCart);

//servicio para agregar productos y cantidad al carrito indicado.
router.post(
  "/api/carts/:cartId/product/:prodId",
  authorization(["user", "premium"]),
  cartController.addToCart
);

//servicio para traer el carrito con el ID que se indica con el parametro
router.get(
  "/api/carts/:cartId",
  authorization(["user", "premium"]),
  cartController.getCartById
);
//servicio para traer todos los carritos de la colección carritos.
router.get("/api/carts", authorization(["admin"]), cartController.getCarts);

//servicio para eliminar del carrito el producto seleccionado.
router.delete(
  "/api/carts/:cartId/products/:prodId",
  authorization(["user", "premium"]),
  cartController.removeProductFormCart
);
//servicio para actualizar el carrito con nuevo arreglo de productos.
router.put(
  "/api/carts/:cartId",
  authorization(["user", "premium"]),
  cartController.updateCart
);
//servicio para actualizar solo la cantidad de ejemplares del producto.
router.put(
  "/api/carts/:cartId/products/:prodId",
  authorization(["user", "premium"]),
  cartController.updateQuantity
);
//servicio para eliminar todos los productos del carrito.
router.delete(
  "/api/carts/:cartId",
  authorization(["user", "premium"]),
  cartController.removeAllProductsFormCart
);

router.post(
  "/api/carts/:cartId/purchase",
  authorization(["user", "premium"]),
  cartController.cartPurchase
);

export default router;
