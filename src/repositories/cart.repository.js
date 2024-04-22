class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addCart() {
    return this.dao.addCart();
  }

  getCarts() {
    return this.dao.getCarts();
  }

  async getCartById(id) {
    return await this.dao.getCartById(id);
  }

  async getCartByIdPopu(id) {
    return await this.dao.getCartByIdPopu(id);
  }

  async addtoCart(cartId, cart) {
    return await this.dao.addtoCart(cartId, cart);
  }

  async removeAllProductsFormCart(cartId, cart) {
    return await this.dao.removeAllProductsFormCart(cartId, cart);
  }

  async removeProductsFromCart(cartId, productKeys) {
    return await this.dao.removeProductsFromCart(cartId, productKeys);
  }

  async updateCart(cartId, cart) {
    return await this.dao.updateCart(cartId, cart);
  }

  async removeProductFormCart(cartId, cart) {
    return await this.dao.removeProductFormCart(cartId, cart);
  }

  async updateQuantity(cartId, cart) {
    return await this.dao.updateQuantity(cartId, cart);
  }
}

export default CartRepository;
