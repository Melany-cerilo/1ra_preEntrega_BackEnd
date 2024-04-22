import cartsModel from "../models/carts.model.js";

class cartManagerDb {
  addCart() {
    //Metodo para agregar un carrito vacio a la coleccion de carritos en la DB.
    try {
      return cartsModel.create({
        products: [],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getCarts() {
    //Metodo que retorna toda la colección de carritos.
    try {
      return cartsModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCartById(id) {
    //Metodo que retorna el carrito con ID indicado que viene por parametro.
    try {
      return cartsModel.findOne({ _id: id });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCartByIdPopu(id) {
    //Metodo que retorna el carrito con ID indicado que viene por parametro.
    try {
      return cartsModel.findOne({ _id: id }).populate("products.id");
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addtoCart(cartId, cart) {
    //Metodo que agrega ID de productos y cantidad al carrito indicado por ID.
    try {
      return cartsModel.updateOne({ _id: cartId }, cart);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeAllProductsFormCart(cartId, cart) {
    try {
      return await cartsModel.updateOne(
        { _id: cartId },
        { $set: { products: cart.products } } // Establece los productos del carrito como un array vacío
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeProductsFromCart(cartId, productKeys) {
    try {
      return await cartsModel.updateOne(
        { _id: cartId },
        { $pull: { products: { id: { $in: productKeys } } } }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateCart(cartId, cart) {
    try {
      return await cartsModel.updateOne({ _id: cartId }, cart);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeProductFormCart(cartId, cart) {
    try {
      return await cartsModel.updateOne({ _id: cartId }, cart);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateQuantity(cartId, cart) {
    try {
      return await cartsModel.updateOne({ _id: cartId }, cart);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default cartManagerDb;
