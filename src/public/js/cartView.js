let path = "http://localhost:8080/api/carts/";
const cart = document.getElementById("cart");
const cartId = document.querySelector("#cart-header h1 span");
const products = document.getElementById("products");

//Concatenación ruta fija con el id de carrito que desde el render de la vista.
let fullPath = path + cartId.innerHTML;

fetchData(fullPath);

function fetchData(url) {
  fetch(url, {
    method: "get",
    dataType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      actualizarHTML(response);
    });
}

function actualizarHTML(response) {
  products.innerHTML = "";
  response.payload.products.forEach((product) => {
    products.innerHTML += HTMLcart(product.id);
  });
}
function HTMLcart(product) {
  return `
<div class="c-cart">
    <div class="c-cart-body" >
        <h1> ${product.title}</h1>
        <h2>ID: ${product._id}</h2>
        <p>Descripción: ${product.description}</p>
        <p>Precio: ${product.price}</p>
    </div>
</div>


`;
}
