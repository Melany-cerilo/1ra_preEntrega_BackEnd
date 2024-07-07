let path = "/api/carts/";
let prodPath = "/api/products/";
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
