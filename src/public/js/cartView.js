let path = "http://localhost:8080/api/carts/";
const cart = document.getElementById("cart");
const cartId = document.querySelector("#cart-header h1 span");
const products = document.getElementById("products");
const cartPurchase = document.getElementById("cart-purchase");
const purchaseMsg = document.getElementById("purchase-msg");

//Concatenación ruta fija con el id de carrito que desde el render de la vista.
let fullPath = path + cartId.innerHTML;

//Registro eventos
events();

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
      actualizarHTML(response.payload.products);
    });
}

function actualizarHTML(productsArray) {
  //Actualizo HTML
  products.innerHTML = "";
  productsArray.forEach((product) => {
    products.innerHTML += HTMLcart(product.id, product.quantity);
  });

  //registro eventos de boton quitar producto
  const productsToDel = document.getElementsByClassName("productDel");
  Array.prototype.forEach.call(productsToDel, function (button) {
    button.addEventListener("click", () => {
      let url = fullPath + "/products/" + button.id;
      fetch(url, {
        method: "delete",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          fetchData(fullPath);
        });
    });
  });
}
function HTMLcart(product, quantity) {
  return `
<div class="c-cart">
    <div class="c-cart-body" >
        <h1> ${product.title}</h1>
        <h4>Cantidad: ${quantity}</h4>
        <h7>ID: ${product._id}</h7>
        <p>Descripción: ${product.description}</p>
        <p>Precio: ${product.price}</p>
        <div id="${product._id}" class="productDel btn btn-danger">Quitar del carrito</div>
    </div>
</div>


`;
}

function events() {
  cartPurchase.addEventListener("click", () => {
    let purchaseUrl = fullPath + "/purchase";
    fetch(purchaseUrl, {
      method: "post",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        mostrarResultadoCompra(response);
        actualizarHTML(response.productsNotOk);
      });
  });
}

function mostrarResultadoCompra(response) {
  purchaseMsg.innerHTML = response.msg;
}
