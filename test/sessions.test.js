import { expect } from "chai";
import supertest from "supertest";

// const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("test de sessions", () => {
  let cookie;
  const mockUser = {
    email: "melanyflorenciacerilo@hotmail.com",
    password: "1234",
  };
  before(function () {});

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

  it("current", async () => {
    const { _body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(_body.email).to.be.eql(mockUser.email);
  });

  it("logOut", async () => {
    //me deslogeo
    await requester
      .get("/api/sessions/logOut")
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);

    //pruebo current con la misma cookie para asegurarme que la sesion fue destruida. Espero status "error"
    const { _body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(_body.status).to.be.eql("error");
  });

  afterEach(function () {});

  after(function () {});
});
