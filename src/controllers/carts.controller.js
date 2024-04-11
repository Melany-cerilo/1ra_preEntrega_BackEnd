import cartManagerDb from "../dao/mongoDb/cartManagerDb.js";

class CartController {
  constructor() {
    this.cartService = new cartManagerDb();
  }

  addCart = async (req, res) => {
    let resultado = await this.cartService.addCart();
    if (!resultado._id) {
      res.send({ status: "error", msg: `No se pudo crear el carrito` });
    } else {
      res.send({
        status: "success",
        msg: `Carrito creado con ID:`,
        id: resultado._id,
      });
    }
  };

  addToCart = async (req, res) => {
    let cartId = req.params.cartId;
    let prodId = req.params.prodId;
    let quantity = parseInt(req.body.quantity);
    let error;
    if (!quantity) {
      quantity = 1;
    }
    let cart = await this.cartService.getCartById(cartId);
    if (cart === null) {
      error = "No se encontró carrito para modificar";
    } else {
      console.log(cart);
      console.log(prodId);
      const indexProduct = cart.products.findIndex(
        (product) => product.id.toString() === prodId
      );
      if (indexProduct !== -1) {
        //Para este caso si se agrega un producto con un ID ya guardado en el carrito seleccionado, solo se sumará la cantidad.
        cart.products[indexProduct].quantity += quantity;
      } else {
        //Este caso es el que NO encuentra ID y genera un nuevo objeto en el array de product del carrito seleccionado.
        const newAdd = {
          id: prodId,
          quantity: quantity,
        };
        cart.products.push(newAdd);
      }
      let resultado = await this.cartService.addtoCart(cartId, cart);
      if (resultado === null) {
        error = "Error de sistema";
      }
    }
    if (!error) {
      res.send({ status: "success", msg: "Agregaste productos a tu carrito." });
    } else {
      res.send({ status: "error", msg: error });
    }
  };

  getCartById = async (req, res) => {
    let cartId = req.params.cartId;
    let cart = await this.cartService.getCartByIdPopu(cartId);
    if (cart) {
      res.send({ status: "success", payload: cart });
    } else {
      res.send({
        status: "error",
        msg: `No se encontró carrito con Id: ${cartId}`,
      });
    }
  };

  getCarts = async (req, res) => {
    let carts = await this.cartService.getCarts();
    if (carts.length > 0) {
      res.send({
        status: "success",
        msg: "Se encontraron carritos",
        payload: carts,
      });
    } else {
      res.send({ status: "error", msg: "No se encontraron carritos" });
    }
  };

  removeProductFormCart = async (req, res) => {
    let cartId = req.params.cartId;
    let prodId = req.params.prodId;
    let error;
    let cart = await this.cartService.getCartById(cartId);
    if (cart === null) {
      error = "No se encontró carrito para modificar";
    } else {
      const indexProduct = cart.products.findIndex(
        (product) => product.id.toString() === prodId
      );
      if (indexProduct === -1) {
        error = "no se encontro tu producto para eliminar";
      } else {
        cart.products.splice(indexProduct, 1);
        resultado = await this.cartService.removeProductFormCart(cartId, cart);
        if (resultado.matchedCount === 0) {
          error = "No se encontró tu busqueda para modificar";
        } else if (resultado.modifiedCount === 0) {
          error = "No hay cambios ";
        } else if (resultado === null) {
          error = "Error de sistema";
        }
      }
      if (!error) {
        res.send({
          status: "success",
          msg: "Producto eliminado de tu carrito",
        });
      } else {
        res.send({ status: "error", msg: error });
      }
    }
  };

  updateCart = async (req, res) => {
    let cartId = req.params.cartId;
    let updateCartInfo = req.body.products;
    let error;
    let cart = await this.cartService.getCartById(cartId);
    if (cart === null) {
      error = "No se encontró carrito para modificar";
    } else {
      cart.products = updateCartInfo;

      const resultado = await this.cartService.updateCart(cartId, cart);
      if (resultado.matchedCount === 0) {
        error = "No se encontró carrito para modificar";
      } else if (resultado.modifiedCount === 0) {
        error = "No hay cambios en el carrito enviado";
      } else if (resultado === null) {
        error = "Error de sistema";
      }
    }

    if (!error) {
      res.send({
        status: "success",
        msg: "Carrito modificado con productos nuevos",
      });
    } else {
      res.send({ status: "error", msg: error });
    }
  };

  updateQuantity = async (req, res) => {
    let cartId = req.params.cartId;
    let prodId = req.params.prodId;
    let modifyQuantity = req.body.quantity;
    let error;
    let cart = await this.cartService.getCartById(cartId);
    if (cart === null) {
      error = "No se encontró carrito para modificar";
    } else {
      const indexProduct = cart.products.findIndex(
        (product) => product.id.toString() === prodId
      );
      if (indexProduct === -1) {
        error = "no se encontro tu producto para modificar la cantidad";
      } else {
        cart.products[indexProduct].quantity = modifyQuantity;
        const resultado = await this.cartService.updateQuantity(cartId, cart);
        if (resultado.matchedCount === 0) {
          error = "No se encontró tu busqueda para modificar";
        } else if (resultado.modifiedCount === 0) {
          error = "No hay cambios ";
        } else if (resultado === null) {
          error = "Error de sistema";
        }
      }
    }
    if (!error) {
      res.send({
        status: "success",
        msg: "Quantity de tu producto modificado",
      });
    } else {
      res.send({ status: "error", msg: error });
    }
  };

  removeAllProductsFormCart = async (req, res) => {
    let cartId = req.params.cartId;
    let error;
    const cart = await this.cartService.getCartById(cartId);
    if (cart === null) {
      error = "No se encontró carrito para modificar";
    } else {
      cart.products = [];

      const resultado = await this.cartService.removeAllProductsFormCart(
        cartId,
        cart
      );
      if (resultado.matchedCount === 0) {
        error = "No se encontró el carrito para modificar";
      } else if (resultado.modifiedCount === 0) {
        error = "No hay cambios";
      } else if (resultado === null) {
        error = "Error de sistema";
      }
    }

    // Eliminar todos los productos del carrito

    if (!error) {
      res.send({
        status: "success",
        msg: "Productos eliminados de tu carrito",
      });
    } else {
      res.send({ status: "error", msg: error });
    }
  };
}

export default CartController;
