import fs from "fs";

class cartManager {
  constructor(pathCarts, pathIdCart) {
    this.pathCarts = pathCarts;
    this.pathIdCart = pathIdCart;

    //Lectura de archivos con FileSystem
    try {
      const id = fs.readFileSync(this.pathIdCart, "utf8");
      id ? (this.id = parseInt(id)) : (this.id = 0);
    } catch (error) {
      console.log(error);
    }

    try {
      const carts = fs.readFileSync(this.pathCarts, "utf8");
      carts ? (this.carts = JSON.parse(carts)) : (this.carts = []);
    } catch (error) {
      console.log(error);
    }
  }

  updateIdDocument() {
    try {
      fs.writeFileSync(this.pathIdCart, this.id.toString());
    } catch (error) {
      console.log(error);
    }
  }

  updateCartsDocument() {
    try {
      fs.writeFileSync(this.pathCarts, JSON.stringify(this.carts));
    } catch (error) {
      console.log(error);
    }
  }

  addCart() {
    this.id++;
    const newCart = {
      id: this.id,
      products: [],
    };
    this.carts.push(newCart);
    this.updateIdDocument();
    this.updateCartsDocument();
  }

  getCarts() {
    return this.carts;
  }

  getCartById(id) {
    const foundCart = this.carts.find((cart) => cart.id === id);

    return foundCart;
  }

  addtoCart(cartId, prodId, quantity) {
    const newAdd = {
      id: prodId,
      quantity: quantity,
    };
    const indexCart = this.carts.findIndex((cart) => cart.id === cartId);
    if (indexCart !== -1) {
      this.carts[indexCart].products.push(newAdd);
      this.updateCartsDocument();
    } else {
      return "No se encontró el objeto para modificar";
    }
  }
}

export default cartManager;
