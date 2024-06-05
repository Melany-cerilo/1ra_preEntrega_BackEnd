import { expect } from "chai";
import supertest from "supertest";
import config from "../src/config/config.js";

const requester = supertest("http://localhost:8080");

describe("test de cart", () => {
  let cookie;
  let cartId = "665faa4e8b4b26ccd4b6fac8";
  let prodId = "65df74812cb0328618e56bfd";
  const mockUser = {
    email: "melanyflorenciacerilo@hotmail.com",
    password: "1234",
  };

  beforeEach(function () {});

  it("login", async () => {
    const result = await requester.get("/api/sessions/logIn").send(mockUser);
    const cookieResult = result.headers["set-cookie"][0];
    expect(cookieResult).to.be.ok;
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };
    expect(cookie.name).to.be.ok.and.eql("connect.sid");
    expect(cookie.value).to.be.ok;
  });

  it("Agregar Producto al Carrito", async () => {
    const result = await requester
      .post(`/api/carts/${cartId}/product/${prodId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`])
      .send({ quantity: 4 });
    expect(result.body.status).to.be.eql("success");
  });

  it("Traigo Carrito creado", async () => {
    const result = await requester
      .get(`/api/carts/${cartId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(result.body.payload._id).to.be.eql(cartId);
    expect(result.body.payload.products[0].id._id).to.be.eql(prodId);
  });

  it("Eliminar productos del Carrito", async () => {
    //Elimino productos del  Carrito
    let result = await requester
      .delete(`/api/carts/${cartId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(result.body.status).to.be.eql("success");

    //Espero tener carrito vacio al traerlo
    result = await requester
      .get(`/api/carts/${cartId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(result.body.payload.products).to.be.deep.equal([]);
  });
  afterEach(function () {});

  after(function () {});
});
