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
    //Metodo para escritura en el archivo IdCarts.json con FileSystem
    try {
      fs.writeFileSync(this.pathIdCart, this.id.toString());
    } catch (error) {
      console.log(error);
    }
  }

  updateCartsDocument() {
    //Metodo para escritura en el archivo Carts.json con FileSystem
    try {
      fs.writeFileSync(this.pathCarts, JSON.stringify(this.carts));
    } catch (error) {
      console.log(error);
    }
  }

  addCart() {
    //Metodo para agregar un nuevo carrito al array de carritos generando un ID y el array de productos vacio.
    this.id++;
    const newCart = {
      id: this.id,
      products: [],
    };
    this.carts.push(newCart);
    this.updateIdDocument();
    this.updateCartsDocument();
    return this.id;
  }

  getCarts() {
    //Metodo para traer todos los carritos.
    return this.carts;
  }

  getCartById(id) {
    //Metodo para traer un carrito por ID.
    const foundCart = this.carts.find((cart) => cart.id === id);

    return foundCart;
  }

  addtoCart(cartId, prodId, quantity) {
    //Metodo para agregar un nuevo producto y sus cantidades.
    const newAdd = {
      id: prodId,
      quantity: quantity,
    };
    const indexCart = this.carts.findIndex((cart) => cart.id === cartId);
    if (indexCart !== -1) {
      const indexProduct = this.carts[indexCart].products.findIndex(
        (product) => product.id === prodId
      );
      if (indexProduct !== -1) {
        //Para este caso si se agrega un producto con un ID ya guardado en el carrito seleccionado, solo se sumará la cantidad.
        this.carts[indexCart].products[indexProduct].quantity += quantity;
      } else {
        //Este caso es el que NO encuentra ID y genera un nuevo objeto en el array de product del carrito seleccionado
        this.carts[indexCart].products.push(newAdd);
      }

      this.updateCartsDocument();
    } else {
      return "No se encontró el objeto para modificar";
    }
  }
}

export default cartManager;
