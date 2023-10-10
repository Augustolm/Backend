import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Inicio de test compra producto", () => {
  it("Valida que el inicio de la pagina este ok", async () => {
    const { statusCode, ok } = await requester.get("/");

    expect(statusCode).to.equal(200);
  }).timeout(6000);
  it("ingreso a login", async () => {
    const { statusCode } = await requester.get("/login");
    expect(statusCode).to.equal(200);
  });
  it("iniciar Secion ingreso al carrito", async () => {
    const userTestingLogin = {
      email: "userTesting@test.com.ar",
      password: "test22",
    };
    const { statusCode: CodeLogin } = await requester
      .post("/login/login")
      .send(userTestingLogin);

    const { statusCode: codeCarrito, text } = await requester.get(
      "/api/carrito"
    );

    expect(CodeLogin).to.equal(302);
    expect(codeCarrito).to.equal(200);
    expect(text).to.contain('<html lang="en">');
  });
});
