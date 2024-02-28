import cartsModel from "../models/carts.model.js";

class cartManagerDb {
  addCart() {
    //Metodo para agregar un carrito vacio a la coleccion de carritos en la DB.
    const resultado = cartsModel.create({
      products: [],
    });

    return resultado;
  }

  getCarts() {
    //Metodo que retorna toda la colección de carritos.
    return cartsModel.find();
  }

  async getCartById(id) {
    //Metodo que retorna el carrito con ID indicado que viene por parametro.
    let result = cartsModel.findOne({ _id: id }).populate("products.id");
    return result;
  }

  async addtoCart(cartId, prodId, quantity) {
    //Metodo que agrega ID de productos y cantidad al carrito indicado por ID.

    if (!quantity) {
      quantity = 1;
    }
    let cart = await cartsModel.findOne({ _id: cartId });
    if (cart === null) {
      return "No se encontró carrito para modificar";
    }
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
    cartsModel.updateOne({ _id: cartId }, cart).catch((error) => {
      console.error("Error al modificar carrito", error);
      return "Error al modificar carrito";
    });

    return;
  }

  async removeAllProductsFormCart(cartId) {
    const cart = await cartsModel.findOne({ _id: cartId });
    if (cart === null) {
      return "No se encontró carrito para modificar";
    }

    // Eliminar todos los productos del carrito
    cart.products = [];

    let result = await cartsModel
      .updateOne(
        { _id: cartId },
        { $set: { products: cart.products } } // Establece los productos del carrito como un array vacío
      )
      .catch((error) => {
        console.error("Error al eliminar los productos del carrito", error);
        return "Error al eliminar los productos del carrito";
      });

    if (result.matchedCount === 0) {
      return "No se encontró el carrito para modificar";
    } else if (result.modifiedCount === 0) {
      return "No hay cambios";
    }

    return;
  }

  async updateCart(cartId, updateCartInfo) {
    let cart = await cartsModel.findOne({ _id: cartId });
    if (cart === null) {
      return "No se encontró carrito para modificar";
    }

    cart.products = updateCartInfo;

    const result = await cartsModel
      .updateOne({ _id: cartId }, cart)
      .catch((error) => {
        console.error("Error al modificar", error);
        return "Error al modificar";
      });
    if (result.matchedCount === 0) {
      return "No se encontró carrito para modificar";
    } else if (result.modifiedCount === 0) {
      return "No hay cambios en el carrito enviado";
    }
    return;
  }

  async removeProductFormCart(cartId, prodId) {
    let cart = await cartsModel.findOne({ _id: cartId });
    if (cart === null) {
      return "No se encontró carrito para modificar";
    }
    const indexProduct = cart.products.findIndex(
      (product) => product.id.toString() === prodId
    );
    if (indexProduct !== -1) {
      cart.products.splice(indexProduct, 1);
    } else {
      return "no se encontro tu producto para eliminar";
    }
    let result = await cartsModel
      .updateOne({ _id: cartId }, cart)
      .catch((error) => {
        console.error("Error al eliminar el producto", error);
        return "Error al modificar";
      });
    if (result.matchedCount === 0) {
      return "No se encontró tu busqueda para modificar";
    } else if (result.modifiedCount === 0) {
      return "No hay cambios ";
    }
    return;
  }

  async updateQuantity(cartId, prodId, modifyQuantity) {
    let cart = await cartsModel.findOne({ _id: cartId });
    if (cart === null) {
      return "No se encontró carrito para modificar";
    }
    const indexProduct = cart.products.findIndex(
      (product) => product.id.toString() === prodId
    );
    if (indexProduct !== -1) {
      cart.products[indexProduct].quantity = modifyQuantity;
    } else {
      return "no se encontro tu producto para modificar la cantidad";
    }
    const result = await cartsModel
      .updateOne({ _id: cartId }, cart)
      .catch((error) => {
        console.error("Error al modificar", error);
        return "Error al modificar";
      });
    if (result.matchedCount === 0) {
      return "No se encontró tu busqueda para modificar";
    } else if (result.modifiedCount === 0) {
      return "No hay cambios ";
    }
    return;
  }
}

export default cartManagerDb;
