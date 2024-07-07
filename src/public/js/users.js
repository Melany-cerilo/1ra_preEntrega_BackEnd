let path = "/api/users";
const usersToDel = document.getElementsByClassName("userDel");
const rolesToMod = document.getElementsByClassName("roleMod");
const delInactive = document.getElementsByClassName("delInactive");
const resultTexts = document.getElementsByClassName("resultText");
const resultHeader = document.getElementsByClassName("resultHeader");

delInactive[0].addEventListener("click", () => {
  let url = path;
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
      resultHeader[0].innerHTML = response.msg;
    });
});

Array.prototype.forEach.call(usersToDel, function (button) {
  button.addEventListener("click", () => {
    let url = path + "/" + button.id;
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
Array.prototype.forEach.call(rolesToMod, function (button) {
  button.addEventListener("click", () => {
    let url = path + "/premium/" + button.id;
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
        const resultTextToUpdate = Array.prototype.find.call(
          resultTexts,
          (text) => text.id === button.id
        );
        resultTextToUpdate.innerHTML = response.msg;
      });
  });
});
