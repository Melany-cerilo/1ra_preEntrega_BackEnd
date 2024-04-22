import productsModel from "../models/products.model.js";

class ProductManagerDb {
  async addProduct(newProduct) {
    try {
      return productsModel.create(newProduct);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getProducts() {
    try {
      return productsModel.find().lean();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async paginateProducts(query, options) {
    try {
      return await productsModel.paginate(query, options);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getProductById(id) {
    try {
      return productsModel.findOne({ _id: id });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getProductByCode(code) {
    try {
      return await productsModel.findOne({ code: code });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateProduct(updatedProductInfo, id) {
    try {
      return await productsModel.updateOne({ _id: id }, updatedProductInfo);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      return await productsModel.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async consumeStockFromProduct(products) {
    try {
      const querys = products.map((product) => ({
        updateOne: {
          filter: {
            _id: product.id._id,
          },
          update: {
            $set: { stock: product.id.stock - product.quantity },
          },
        },
      }));
      await productsModel.bulkWrite(querys);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default ProductManagerDb;
