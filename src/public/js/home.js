let path = "http://localhost:8080/api/carts/";
let prodPath = "http://localhost:8080/api/products/";
const productsToAdd = document.getElementsByClassName("productAdd");
const stockTexts = document.getElementsByClassName("stockText");
const productsToDel = document.getElementsByClassName("productDel");
const resultTexts = document.getElementsByClassName("resultText");

console.log(productsToAdd);

Array.prototype.forEach.call(productsToAdd, function (button) {
  button.addEventListener("click", () => {
    let url = path + "session" + "/product/" + button.id;
    fetch(url, {
      method: "post",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const stockToSubtract = Array.prototype.find.call(
          stockTexts,
          (stock) => stock.id === button.id
        );
        stockToSubtract.innerHTML = response.msg;
      });
  });
});
Array.prototype.forEach.call(productsToDel, function (button) {
  button.addEventListener("click", () => {
    let url = prodPath + button.id;
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
        const resultTextToUpdate = Array.prototype.find.call(
          resultTexts,
          (text) => text.id === button.id
        );
        resultTextToUpdate.innerHTML = response.msg;
      });
  });
});
// let fullPath = path + cartId.innerHTML;

// //Registro eventos
// events();

// fetchData(fullPath);

// function fetchData(url) {
//   fetch(url, {
//     method: "get",
//     dataType: "json",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       actualizarHTML(response.payload.products);
//     });
// }

// function actualizarHTML(productsArray) {
//   products.innerHTML = "";
//   productsArray.forEach((product) => {
//     products.innerHTML += HTMLcart(product.id);
//   });
// }
// function HTMLcart(product) {
//   return `
// <div class="c-cart">
//     <div class="c-cart-body" >
//         <h1> ${product.title}</h1>
//         <h2>ID: ${product._id}</h2>
//         <p>Descripción: ${product.description}</p>
//         <p>Precio: ${product.price}</p>
//     </div>
// </div>

// `;
// }

// function events() {
//   cartPurchase.addEventListener("click", () => {
//     let purchaseUrl = fullPath + "/purchase";
//     fetch(purchaseUrl, {
//       method: "post",
//       dataType: "json",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         mostrarResultadoCompra(response);
//         actualizarHTML(response.productsNotOk);
//       });
//   });
// }

// function mostrarResultadoCompra(response) {
//   purchaseMsg.innerHTML = response.msg;
// }
