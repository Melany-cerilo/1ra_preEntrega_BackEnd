class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //Este metodo agrega productos al array "Products"
    //Verifico que los campos no esten vacios
    //Mediante el metodo FindIndex busco si el campo code ya existe.
    const newProduct = {
      id: this.products.length + 1, //Asigna ID único consecutivo
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
    //Este metodo se utiliza para obtener el array completo de Products
    return this.products;
  }

  getProductById(id) {
    //Mediante el metodo Find busco por ID. Si existe devuelve el objeto del producto con todos sus atributos.
    const foundProduct = this.products.find((product) => product.id === id);

    return foundProduct;
  }
}

function main() {
  const manager = new ProductManager();

  console.log(manager.getProducts());
  // Agrega productos
  //Verifica si el campo "code" esta repetido

  let error = manager.addProduct(
    "Producto 1", //Prueba quitar nombre de producto para que muestre el mensaje de campo incompleto.
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
    "CODE1", //Se repite campo "code" para verificar el error
    150
  );
  if (error) {
    console.log(error);
  } else {
    console.log("Producto agregado");
  }

  console.log(manager.getProducts());

  // Obtener un producto por su ID
  const id = 2; // Cambiar el ID para probar distintos casos
  const product = manager.getProductById(id);

  if (product) {
    console.log("Producto encontrado: ", product);
  } else {
    console.log(`No se encontró ningún producto con el ID ${id}`);
  }
}

main(); //Ejecución de función de testing del desafio
