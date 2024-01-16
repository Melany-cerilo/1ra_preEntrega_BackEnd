import fs from "fs";
class ProductManager {
  constructor(pathprod, pathid) {
    //Esta clase requiere de dos rutas
    //Ruta al archivo que almacena el ID para luego persistir el mismo si es que un objeto se elimina del array.
    //Ruta al archivo que almacena el array de productos
    this.pathid = pathid;
    this.pathprod = pathprod;

    //Lectura de archivos con FileSystem
    try {
      const id = fs.readFileSync(this.pathid, "utf8");
      id ? (this.id = parseInt(id)) : (this.id = 0);
    } catch (error) {
      console.log(error);
    }

    try {
      const products = fs.readFileSync(this.pathprod, "utf8");
      products ? (this.products = JSON.parse(products)) : (this.products = []);
    } catch (error) {
      console.log(error);
    }
  }

  addProduct(newProduct) {
    //Este metodo agrega productos al array "Products"
    //Verifico que los campos no esten vacios
    //Mediante el metodo FindIndex busco si el campo code ya existe.
    //Si todo esta ok genero un id unico y hago un push
    //Utilizo los metodos updateIdDocument y updateProductsDocument para persistir los datos.
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.thumbnail ||
      !newProduct.code ||
      !newProduct.stock
    ) {
      return "Ingresar todos los campos.";
    }

    const indexFound = this.products.findIndex(
      (product) => product.code === newProduct.code
    );
    if (indexFound !== -1) {
      return "Error. Codigo repetido";
    }
    this.id++;
    newProduct.id = this.id;
    this.products.push(newProduct);
    this.updateIdDocument();
    this.updateProductsDocument();
  }

  updateIdDocument() {
    //Este metodo escribe el ID en el archivo.
    try {
      fs.writeFileSync(this.pathid, this.id.toString());
    } catch (error) {
      console.log(error);
    }
  }

  updateProductsDocument() {
    ///Este metodo escribe el array de productos en el archivo.
    try {
      fs.writeFileSync(this.pathprod, JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
    }
  }

  getProducts() {
    //Este metodo se utiliza para obtener el array completo de Products
    return this.products;
  }

  getProductById(id) {
    //Mediante el metodo Find busco por ID. Si existe devuelve el objeto del producto con todos sus atributos.
    const foundProduct = this.products.find((product) => product.id === id);

    return foundProduct;
  }
  updateProduct(updatedProductInfo) {
    //Este metodo busca el indice del producto en el array
    //Utilizo spread operator para modificar atributos del producto
    //Con el metodo updateProductsDocument actualizo para persistir los cambios
    const indexFound = this.products.findIndex(
      (product) => product.id === updatedProductInfo.id
    );

    if (indexFound !== -1) {
      this.products[indexFound] = { ...updatedProductInfo };
    } else {
      return "No se encontró el objeto para modificar";
    }
    this.updateProductsDocument();
  }

  deleteProduct(id) {
    //Este metodo busca el indice del producto en el array buscando por ID requerido por parametro
    //Utilizo el metodo Splice para eliminar el producto del array
    //Con el metodo updateProductsDocument actualizo para persistir los cambios

    let positionProd = id;
    const indexFound = this.products.findIndex(
      (product) => product.id === positionProd
    );
    if (indexFound !== -1) {
      this.products.splice(indexFound, 1);
    } else {
      return "No se encontró el objeto para borrar";
    }
    this.updateProductsDocument();
  }
}
export default ProductManager;
