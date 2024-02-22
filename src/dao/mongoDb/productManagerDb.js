import productsModel from "../models/products.model.js";

class ProductManagerDb {
  async addProduct(newProduct) {
    //Este metodo agrega productos a la colección de productos en la DB.
    //Verifico que los campos no esten vacios
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.code ||
      !newProduct.stock ||
      !newProduct.category
    ) {
      return { msg: "Ingresar todos los campos." };
    }

    const product = await this.getProductByCode(newProduct.code);
    console.log(product);
    if (product) {
      return { msg: "Error. Codigo repetido" };
    }

    const resultado = productsModel.create({
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
      code: newProduct.code,
      stock: newProduct.stock,
      category: newProduct.category,
      status: true,
    });
    return resultado;
  }

  getProducts() {
    //Este metodo retorna todos los productos de la colección de productos de la DB
    return productsModel.find().lean();
  }

  getProductById(id) {
    //Este metodo retorna el producto indicado por ID que viene por parametro.
    return productsModel.findOne({ _id: id });
  }
  async getProductByCode(code) {
    //Este metodo retorna el producto indicado por ID que viene por parametro.
    return await productsModel.findOne({ code: code });
  }
  async updateProduct(updatedProductInfo, id) {
    //Este metodo actualizará el producto indicado por ID
    //Validando que: todos los campos esten completos,
    //que se encuentre el producto a modificar,
    //si no hay cambios a realizar.
    if (
      !updatedProductInfo.title ||
      !updatedProductInfo.description ||
      !updatedProductInfo.price ||
      !updatedProductInfo.code ||
      !updatedProductInfo.stock ||
      !updatedProductInfo.category
    ) {
      return "Ingresar todos los campos.";
    }
    const resultado = await productsModel
      .updateOne({ _id: id }, updatedProductInfo)
      .catch((error) => {
        console.error("Error al modificar", error);
        return "Error al modificar";
      });
    if (resultado.matchedCount === 0) {
      return "No se encontró producto para modificar";
    } else if (resultado.modifiedCount === 0) {
      return "No hay cambios en el producto enviado";
    }
    return;
  }

  async deleteProduct(id) {
    //Este metodo elimina un producto indicado por ID que viene por parametro.
    const resultado = await productsModel
      .deleteOne({ _id: id })
      .catch((error) => {
        console.error("Error ", error);
        return "Error ";
      });
    if (resultado.deletedCount === 0) {
      return "No se encontró producto para eliminar";
    }

    return;
  }
}

export default ProductManagerDb;
