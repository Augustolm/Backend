import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Inicio de test de login", () => {
  it("Valida que el inicio de la pagina este ok", async () => {
    const { statusCode, ok } = await requester.get("/");

    expect(statusCode).to.equal(200);
  }).timeout(6000);
  it("ingreso a login", async () => {
    const { statusCode } = await requester.get("/login");
    expect(statusCode).to.equal(200);
  });
  it("Registrar usiario existente", async () => {
    const userTestingLogin = {
      email: "userTesting@test.com.ar",
      password: "test22",
      nombre: "userTesting",
      apellido: "test",
      edad: 99,
    };
    const { statusCode, text, _body } = await requester
      .post("/login/register")
      .send(userTestingLogin);

    console.log("Body", _body);

    expect(statusCode).to.equal(401);
    expect(_body).to.deep.equal({ message: "El usuario ya existe" });
  });
  it("iniciar Secion con usuario existente y desloguear", async () => {
    const userTestingLogin = {
      email: "userTesting@test.com.ar",
      password: "test22",
    };
    const { statusCode } = await requester
      .post("/login/login")
      .send(userTestingLogin);

    expect(statusCode).to.equal(302);

    const { statusCode: statusCodeLogout } = await requester.post(
      "/login/logout"
    );

    expect(statusCodeLogout).to.equal(302);
  });
});
