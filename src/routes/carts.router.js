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
    res.send({ msg: `No se pudo crear el carrito` });
  } else {
    res.send({ msg: `Carrito creado con ID:`, id: resultado._id });
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
    res.send({ msg: "Agregaste productos a tu carrito." });
  } else {
    res.send({ msg: error });
  }
});

//servicio para traer el carrito con el ID que se indica con el parametro
router.get("/api/carts/:cartId", async (req, res) => {
  const manager = new cartManagerDb();
  let cartId = req.params.cartId;
  let cart = await manager.getCartById(cartId);
  if (cart) {
    res.send({ cart });
  } else {
    res.send({
      msg: `No se encontró carrito con Id: ${cartId}`,
    });
  }
});
//servicio para traer todos los carritos de la colección carritos.
router.get("/api/carts", async (req, res) => {
  const manager = new cartManagerDb();
  let carts = await manager.getCarts();
  if (carts.length > 0) {
    res.send({ msg: "Se encontraron carritos", payload: carts });
  } else {
    res.send({ msg: "No se encontraron carritos" });
  }
});

export default router;
