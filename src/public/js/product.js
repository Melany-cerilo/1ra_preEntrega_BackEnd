let prodPath = "/api/products/";
const modifyForm = document.getElementById("modifyForm");
const addForm = document.getElementById("addForm");
const resultText = document.querySelector(".resultText");
const prodId = document.querySelector(".prodId");

if (modifyForm) {
  modifyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    let formdata = new FormData(form);
    let body = JSON.stringify(Object.fromEntries(formdata.entries()));
    callApi(prodPath + prodId.id, "put", body);
  });
}
if (addForm) {
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    let formdata = new FormData(form);
    let body = JSON.stringify(Object.fromEntries(formdata.entries()));
    callApi(prodPath, "post", body);
  });
}

function callApi(url, method, body) {
  fetch(url, {
    method,
    dataType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((response) => {
      resultText.innerHTML = response.msg;
    });
}
