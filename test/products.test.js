import { expect } from "chai";
import supertest from "supertest";
import config from "../src/config/config.js";

const requester = supertest("http://localhost:8080");

describe("test de product", () => {
  let cookie;
  let prodId;
  const newProduct = {
    title: "prueba",
    description: "testing local",
    price: 90000,
    code: 9191,
    stock: 11,
    category: "testing",
  };
  const mockAdminUser = {
    email: config.adminEmail,
    password: config.adminPassword,
  };
  before(function () {});

  beforeEach(function () {});

  it("login Admin", async () => {
    const result = await requester
      .get("/api/sessions/logIn")
      .send(mockAdminUser);
    const cookieResult = result.headers["set-cookie"][0];
    expect(cookieResult).to.be.ok;
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };
    expect(cookie.name).to.be.ok.and.eql("connect.sid");
    expect(cookie.value).to.be.ok;
  });

  it("Crear Producto", async () => {
    const result = await requester
      .post("/api/products")
      .set("Cookie", [`${cookie.name}=${cookie.value}`])
      .send(newProduct);
    expect(result.body).to.be.ok.and.to.have.property("_id");
    prodId = result.body._id;
  });

  it("Traigo producto creado", async () => {
    const result = await requester
      .get(`/api/products/${prodId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(result.body.payload._id).to.be.eql(prodId);
    Object.keys(newProduct).forEach((key) => {
      expect(result.body.payload).to.have.property(key);
      expect(result.body.payload[key]).to.be.eql(newProduct[key]);
    });
  });

  it("Eliminar Producto", async () => {
    //Elimino Producto
    let result = await requester
      .delete(`/api/products/${prodId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(result.body.status).to.be.eql("success");

    //Espero NO encontrar el producto recien eliminado si lo voy a buscar
    result = await requester
      .get(`/api/products/${prodId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(result.body.payload).to.be.not.ok;
  });
  afterEach(function () {});

  after(function () {});
});
