class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async addProduct(newProduct) {
    return await this.dao.addProduct(newProduct);
  }

  getProducts() {
    return this.dao.getProducts();
  }

  async paginateProducts(query, options) {
    return await this.dao.paginateProducts(query, options);
  }

  getProductById(id) {
    return this.dao.getProductById(id);
  }

  async getProductByCode(code) {
    return await this.dao.getProductByCode(code);
  }
  async updateProduct(updatedProductInfo, id) {
    return await this.dao.updateProduct(updatedProductInfo, id);
  }

  async deleteProduct(id) {
    return await this.dao.deleteProduct(id);
  }
  async consumeStockFromProduct(products) {
    return await this.dao.consumeStockFromProduct(products);
  }
}

export default ProductRepository;
