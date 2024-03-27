let baseURL = "http://localhost:8080";
let initialPath = "/api/products?limit=5&page=1&sort=asc";
let prevPath = "";
let nextPath = "";
const lista = document.getElementById("lista");
const currPage = document.getElementById("curr-page");

//Boton de pagina anterior
const buttonPrev = document.getElementById("button-prev");
buttonPrev.addEventListener("click", function () {
  if (prevPath !== "") {
    fetchData(prevPath);
  }
});

//Boton de pagina proxima
const buttonNext = document.getElementById("button-next");
buttonNext.addEventListener("click", function () {
  if (nextPath !== "") {
    fetchData(nextPath);
  }
});

fetchData(initialPath);

function fetchData(path) {
  let fullURL = baseURL + path;

  fetch(fullURL, {
    method: "get",
    dataType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      prevPath = response.prevLink;
      nextPath = response.nextLink;
      actualizarHTML(response);
    });
}
//funcion para imprimir todos los productos.
function actualizarHTML(response) {
  lista.innerHTML = "";
  response.payload.forEach((product) => {
    lista.innerHTML += HTMLPorProducto(product);
  });
  currPage.innerHTML = response.page;
}
//funcion que devuelve html por cada producto.
function HTMLPorProducto(product) {
  return `  
            
  <div class="card">
  <h5 class="card-title">${product.title}</h5>
  <p class="card-text">ID: ${product._id}</p>
  <p class="card-text">Descripción: ${product.description}</p>
  <p class="card-text">Precio: ${product.price}</p>
  <p class="card-text">Stock: ${product.stock}</p>
  <p class="card-text">Categoria: ${product.category}</p>
  <p class="card-text">Status: ${product.status}</p>
  <p class="card-text">Codigo: ${product.code}</p>
  <button type="button" class="btn btn-primary">Agregar al carrito</button>
</div>
            `;
}
