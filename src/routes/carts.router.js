import Express from "express";
import cartManagerDb from "../dao/mongoDb/cartManagerDb.js";

const router = Express.Router();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//servicio para agregar un carrito a la colección de carritos en la db. asignandole un ID (al principio estará vacio)
router.post("/api/carts", async (req, res) => {
  const manager = new cartManagerDb();
  let resultado = await manager.addCart();
  if (!resultado._id) {
    res.send({ status: "error", msg: `No se pudo crear el carrito` });
  } else {
    res.send({
      status: "success",
      msg: `Carrito creado con ID:`,
      id: resultado._id,
    });
  }
});

//servicio para agregar productos y cantidad al carrito indicado.
router.post("/api/carts/:cartId/product/:prodId", async (req, res) => {
  const manager = new cartManagerDb();
  let cartId = req.params.cartId;
  let prodId = req.params.prodId;
  let quantity = parseInt(req.body.quantity);
  let error = await manager.addtoCart(cartId, prodId, quantity);
  if (!error) {
    res.send({ status: "success", msg: "Agregaste productos a tu carrito." });
  } else {
    res.send({ status: "error", msg: error });
  }
});

//servicio para traer el carrito con el ID que se indica con el parametro
router.get("/api/carts/:cartId", async (req, res) => {
  const manager = new cartManagerDb();
  let cartId = req.params.cartId;
  let cart = await manager.getCartById(cartId);
  if (cart) {
    res.send({ status: "success", payload: cart });
  } else {
    res.send({
      status: "error",
      msg: `No se encontró carrito con Id: ${cartId}`,
    });
  }
});
//servicio para traer todos los carritos de la colección carritos.
router.get("/api/carts", async (req, res) => {
  const manager = new cartManagerDb();
  let carts = await manager.getCarts();
  if (carts.length > 0) {
    res.send({
      status: "success",
      msg: "Se encontraron carritos",
      payload: carts,
    });
  } else {
    res.send({ status: "error", msg: "No se encontraron carritos" });
  }
});

//servicio para eliminar del carrito el producto seleccionado.
router.delete("/api/carts/:cartId/products/:prodId", async (req, res) => {
  const manager = new cartManagerDb();
  let cartId = req.params.cartId;
  let prodId = req.params.prodId;
  let error = await manager.removeProductFormCart(cartId, prodId);
  if (!error) {
    res.send({ status: "success", msg: "Producto eliminado de tu carrito" });
  } else {
    res.send({ status: "error", msg: error });
  }
});
//servicio para actualizar el carrito con nuevo arreglo de productos.
router.put("/api/carts/:cartId", async (req, res) => {
  const manager = new cartManagerDb();
  let cartId = req.params.cartId;
  let updateCartInfo = req.body.products;
  let error = await manager.updateCart(cartId, updateCartInfo);
  if (!error) {
    res.send({
      status: "success",
      msg: "Carrito modificado con productos nuevos",
    });
  } else {
    res.send({ status: "error", msg: error });
  }
});
//servicio para actualizar solo la cantidad de ejemplares del producto.
router.put("/api/carts/:cartId/products/:prodId", async (req, res) => {
  const manager = new cartManagerDb();
  let cartId = req.params.cartId;
  let prodId = req.params.prodId;
  let modifyQuantity = req.body.quantity;
  let error = await manager.updateQuantity(cartId, prodId, modifyQuantity);
  if (!error) {
    res.send({ status: "success", msg: "Quantity de tu producto modificado" });
  } else {
    res.send({ status: "error", msg: error });
  }
});
//servicio para eliminar todos los productos del carrito.
router.delete("/api/carts/:cartId", async (req, res) => {
  const manager = new cartManagerDb();
  let cartId = req.params.cartId;
  let error = await manager.removeAllProductsFormCart(cartId);
  if (!error) {
    res.send({ status: "success", msg: "Productos eliminados de tu carrito" });
  } else {
    res.send({ status: "error", msg: error });
  }
});

export default router;
