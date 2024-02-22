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

  getCartById(id) {
    //Metodo que retorna el carrito con ID indicado que viene por parametro.
    return cartsModel.findOne({ _id: id });
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
      (product) => product.id === prodId
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
}

export default cartManagerDb;
