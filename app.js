class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "Ingresar todos los campos.";
    }

    const indexFound = this.products.findIndex(
      (product) => product.code === code
    );
    if (indexFound !== -1) {
      return "Error. Codigo repetido";
    }

    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const foundProduct = this.products.find((product) => product.id === id);

    return foundProduct;
  }
}

function main() {
  const manager = new ProductManager();

  // Agregar productos
  //Verifica si el campo "code" esta repetido
  let error = manager.addProduct(
    "Descripción 1",
    10,
    "thumbnail1.jpg",
    "CODE1",
    100
  );
  if (error) {
    console.log(error);
  } else {
    console.log("Producto agregado");
  }
  console.log(manager.getProducts()); //Muestra el array de productos.

  error = manager.addProduct(
    "Producto 2",
    "Descripción 2",
    20,
    "thumbnail2.jpg",
    "CODE2",
    150
  );
  if (error) {
    console.log(error);
  } else {
    console.log("Producto agregado");
  }

  console.log(manager.getProducts());

  error = manager.addProduct(
    "Producto 3",
    "Descripción 3",
    20,
    "thumbnail3.jpg",
    "CODE2", //codigo repetido
    150
  );
  if (error) {
    console.log(error);
  } else {
    console.log("Producto agregado");
  }
  console.log(manager.getProducts());

  // Obtener un producto por su ID
  const id = 4; // Cambia el ID para probar distintos casos
  const product = manager.getProductById(id);

  if (product) {
    console.log("Producto encontrado: ", product);
  } else {
    console.log(`No se encontró ningún producto con el ID ${id}`);
  }
}

main();
