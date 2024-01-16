import ProductManager from "./productManager";
function main() {
  const manager = new ProductManager("./src/products.txt", "./src/id.txt");

  console.log(manager.getProducts()); //Muestra todos los productos hasta el momento

  let newProduct = {
    title: "Producto 3",
    description: "Descripción 3",
    price: 10,
    thumbnail: "thumbnail3.jpg",
    code: "CODE11",
    stock: 100,
  };

  let error = manager.addProduct(newProduct); //TEST de agregado de producto
  if (error) {
    console.log(error);
  } else {
    console.log("Producto agregado");
  }
  console.log(manager.getProducts()); //Muestra el array de productos.

  const id = 2; // Cambiar el ID para probar distintos casos
  const product = manager.getProductById(id); // Obtener un producto por su ID

  if (product) {
    console.log("Producto encontrado: ", product);
    product.title = "titulo modificado del producto "; //TEST de actualización de atributo de un producto.
    error = manager.updateProduct(product);
    if (error) {
      console.log(error);
    } else {
      console.log("¡Producto actualizado!", product);
    }
  } else {
    console.log(`No se encontró ningún producto con el ID ${id}`);
  }

  // error = manager.deleteProduct(id); //TEST de eliminación del producto
  // if (error) {
  //   console.log(error);
  // } else {
  //   console.log(`Se eliminó el producto con ID ${id}`);
  // }
}

main(); //Ejecución de función de testing del desafio
