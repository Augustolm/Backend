//import mongoose from "mongoose";

import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("test Productos", () => {
  it("Valida que el inicio de la pagina este ok", async () => {
    const { statusCode, ok } = await requester.get("/");

    expect(statusCode).to.equal(200);
  }).timeout(6000);
  it("ingreso a cargarProductos", async () => {
    const { statusCode } = await requester.get("/cargarProductos");
    expect(statusCode).to.equal(200);
  });
  it("Valida existencia de productos y sus property", async () => {
    const { _body, statusCode, ok } = await requester.get("/api/productos");

    expect(_body).to.be.an("array");
    expect(statusCode).to.equal(200);

    expect(_body[0]).to.have.property("owner");
    expect(_body[0]).to.have.property("title").to.not.be.a("number");
    expect(_body[0]).to.have.property("description");
    expect(_body[0]).to.have.property("price").to.be.a("number");
    expect(_body[0]).to.have.property("status");
    expect(_body[0]).to.have.property("category");
    expect(_body[0]).to.have.property("thumbnail");
    expect(_body[0]).to.have.property("code").to.be.a("number");
    expect(_body[0]).to.have.property("stock").to.be.a("number");
    expect(_body[0]).to.have.property("timestamp");
    expect(ok).to.equal(true);
  }).timeout(1000);
});
