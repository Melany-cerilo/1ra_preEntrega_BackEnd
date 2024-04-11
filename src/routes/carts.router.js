import Express from "express";
import CartController from "../controllers/carts.controller.js";

const router = Express.Router();
const cartController = new CartController();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//servicio para agregar un carrito a la colección de carritos en la db. asignandole un ID (al principio estará vacio)
router.post("/api/carts", cartController.addCart);

//servicio para agregar productos y cantidad al carrito indicado.
router.post("/api/carts/:cartId/product/:prodId", cartController.addToCart);

//servicio para traer el carrito con el ID que se indica con el parametro
router.get("/api/carts/:cartId", cartController.getCartById);
//servicio para traer todos los carritos de la colección carritos.
router.get("/api/carts", cartController.getCarts);

//servicio para eliminar del carrito el producto seleccionado.
router.delete(
  "/api/carts/:cartId/products/:prodId",
  cartController.removeProductFormCart
);
//servicio para actualizar el carrito con nuevo arreglo de productos.
router.put("/api/carts/:cartId", cartController.updateCart);
//servicio para actualizar solo la cantidad de ejemplares del producto.
router.put(
  "/api/carts/:cartId/products/:prodId",
  cartController.updateQuantity
);
//servicio para eliminar todos los productos del carrito.
router.delete("/api/carts/:cartId", cartController.removeAllProductsFormCart);

export default router;
