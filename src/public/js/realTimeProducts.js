const socket = io();
const lista = document.getElementById("lista"); //utilizo manipulacion de DOM para traer el elemento con el con el ID lista que viene desde la vista de realTimeProducts.
let products = []; //declaro products para que lo tome en cuenta como array
//Configuro la escucha del evento product_change, el cual me va a traer el array de productos actualizado (obtenido en el backend mediante get_products() de ProductManager
// Defino el parametro changedProducts para que me traiga esa informacion, para entonces pisar el array completo, y actualizar el html en base a eso.
// Este evento se emite en cada cambio en la lista de productos. Esto es en algunos servicios del router de productos.
socket.on("product_change", (changedProducts) => {
  products = changedProducts;
  actualizarHTML();
});
//funcion para imprimir todos los productos.
function actualizarHTML() {
  lista.innerHTML = "";
  products.forEach((product) => {
    lista.innerHTML += HTMLPorProducto(product);
  });
}
//funcion que devuelve html por cada producto.
function HTMLPorProducto(product) {
  return `  
            
              <div class="card" >
                <h1> ${product.title}</h1>
                <h2>ID: ${product.id}</h2>
                <p>Descripción: ${product.description}</p>
                <p>Precio: ${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Categoria: ${product.stock}</p>
                <p>Status:${product.status} </p>
                <p>Codigo: ${product.code}</p>
            </div>
            `;
}
