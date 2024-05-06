import { cartService } from "../repositories/repository.config.js";
import { productService } from "../repositories/repository.config.js";
import { userService } from "../repositories/repository.config.js";
import { ticketService } from "../repositories/repository.config.js";

import mongoose from "mongoose";

class CartController {
  constructor() {
    this.cartService = cartService;
    this.ticketService = ticketService;
    this.userService = userService;
    this.productService = productService;
  }

  addCart = async (req, res) => {
    let resultado = await this.cartService.addCart();
    if (!resultado._id) {
      req.logger.debug("resultado de addCart fallido" + " " + resultado);
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
    if (cartId === "session") {
      const user = await this.userService.getUser({ email: req.session.email });
      cartId = user.cart;
    }
    let prodId = req.params.prodId;
    let quantity = parseInt(req.body.quantity);
    let error;
    let totalQuantity;
    if (!quantity) {
      quantity = 1;
    }
    let cart = await this.cartService.getCartById(cartId);
    if (cart === null) {
      error = "No se encontró carrito para modificar";
    } else {
      const product = await this.productService.getProductById(prodId);
      if (!product) {
        error = "No existe el producto " + prodId;
      } else {
        const indexProduct = cart.products.findIndex(
          (product) => product.id.toString() === prodId
        );
        if (indexProduct !== -1) {
          //Para este caso si se agrega un producto con un ID ya guardado en el carrito seleccionado, solo se sumará la cantidad.
          cart.products[indexProduct].quantity += quantity;
          totalQuantity = cart.products[indexProduct].quantity;
        } else {
          //Este caso es el que NO encuentra ID y genera un nuevo objeto en el array de product del carrito seleccionado.
          const newAdd = {
            id: prodId,
            quantity: quantity,
          };
          cart.products.push(newAdd);
          totalQuantity = quantity;
        }
        if (product.stock < totalQuantity) {
          error =
            "No hay suficiente stock" +
            (totalQuantity - quantity !== 0
              ? ", ya agregaste " + (totalQuantity - quantity) + " en total"
              : "");
        } else {
          let resultado = await this.cartService.addtoCart(cartId, cart);
          if (resultado === null) {
            error = "Error de sistema";
          }
        }
      }
    }
    if (!error) {
      res.send({
        status: "success",
        msg: "Agregaste " + totalQuantity + " a tu carrito.",
      });
    } else {
      req.logger.error(error);
      res.send({ status: "error", msg: error });
    }
  };

  getCartById = async (req, res) => {
    let cartId = req.params.cartId;
    let cart = await this.cartService.getCartByIdPopu(cartId);
    if (cart) {
      res.send({ status: "success", payload: cart });
    } else {
      let error = `No se encontró carrito con Id: ${cartId}`;
      req.logger.error(error);
      res.send({
        status: "error",
        msg: error,
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
      let error = "No se encontraron carritos";
      req.logger.error(error);
      res.send({ status: "error", msg: error });
    }
  };

  removeProductFormCart = async (req, res) => {
    let cartId = req.params.cartId;
    let prodId = req.params.prodId;
    let error = await this.removeProductFormCartFunctional(cartId, prodId);
    if (!error) {
      res.send({
        status: "success",
        msg: "Producto eliminado de tu carrito",
      });
    } else {
      req.logger.error(error);
      res.send({ status: "error", msg: error });
    }
  };

  removeProductFormCartFunctional = async (cartId, prodId) => {
    let cart = await this.cartService.getCartById(cartId);
    if (cart === null) {
      return "No se encontró carrito para modificar";
    } else {
      const indexProduct = cart.products.findIndex(
        (product) => product.id.toString() === prodId
      );
      if (indexProduct === -1) {
        return "no se encontro tu producto para eliminar";
      } else {
        cart.products.splice(indexProduct, 1);
        let resultado = await this.cartService.removeProductFormCart(
          cartId,
          cart
        );
        if (resultado.matchedCount === 0) {
          return "No se encontró tu busqueda para modificar";
        } else if (resultado.modifiedCount === 0) {
          return "No hay cambios ";
        } else if (resultado === null) {
          return "Error de sistema";
        }
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
      req.logger.error(error);
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
      req.logger.error(error);
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
      req.logger.error(error);
      res.send({ status: "error", msg: error });
    }
  };

  removeProductsFromCart = async (cartId, products) => {
    const resultado = await this.cartService.removeProductsFromCart(
      cartId,
      products.map((product) => product.id._id)
    );
    if (resultado.matchedCount === 0) {
      return "No se encontró el carrito para modificar";
    } else if (resultado.modifiedCount === 0) {
      return "No hay cambios";
    } else if (resultado === null) {
      return "Error de sistema";
    }
  };

  cartPurchase = async (req, res) => {
    let productsOk = [];
    let productsNotOk = [];
    let response = {};
    let cartId = req.params.cartId;
    let cart = await this.cartService.getCartByIdPopu(cartId);
    if (cart) {
      if (cart.products.length !== 0) {
        //valido stock
        cart.products.forEach((product) => {
          if (product.quantity <= product.id.stock) {
            //hay stock disponible, este producto entra
            productsOk.push(product);
          } else {
            //no hay stock disponible, este producto no entra, lo tengo que devolver
            productsNotOk.push(product);
          }
        });

        if (productsOk.length !== 0) {
          //genero el ticket
          let newTicket = {
            code: new mongoose.Types.ObjectId(),
            purchase_datetime: new Date(),
            amount: productsOk.reduce(
              (acc, product) => (acc += product.quantity * product.id.price),
              0
            ),
            purchaser: req.session.email,
            products: productsOk.map((product) => ({
              id: product.id._id,
              quantity: product.quantity,
            })),
          };
          //create one ticket
          let result = await this.ticketService.addTicket(newTicket);
          if (!result._id) {
            response.status = "error";
            response.msg = "Error al crear Ticket";
          } else {
            response.status = "success";
            response.msg = "Ticket creado correctamente";
            response.id = result._id;
            //borro productos del carrito en MongoDB que ya se compraron
            await this.removeProductsFromCart(cartId, productsOk);
            //Descuento stock de productos
            await this.productService.consumeStockFromProduct(productsOk);
          }
        } else {
          response.status = "error";
          response.msg = "No hay productos con disponibilidad";
        }

        if (productsNotOk.length !== 0) {
          response.productsNotOk = productsNotOk;
        }
      } else {
        response.status = "error";
        response.msg = "Carrito vacío";
      }
    } else {
      response.status = "error";
      response.msg = "Carrito no existe";
    }

    res.send(response);
  };
}

export default CartController;
