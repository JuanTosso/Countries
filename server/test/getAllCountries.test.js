const server = require("../src/server");
const session = require("supertest");
const agent = session(server); //agent es nuestra promesa para testear esta ruta
const getAllCountries = require("../src/controllers/getAllCountries");

//que es y para que sirve supertest
//

describe("GET /countries", () => {
  it("Es una funcion", () => {
    expect(typeof getAllCountries).toBe("function");
    expect(typeof getAllCountries).not.toBe("number");
  });
  it("Responde con status 200", async () => {
    await agent.get("/countries").expect(200);
  });
  it("Responde con status 404 si la ruta no es correcta", async () => {
    await agent.get("/countriesss").expect(404);
  });
  it("Deberia mostrar todos los paises", async () => {
    const response = (await agent.get("/countries")).body;
    expect(response.length).toBe(250);
  });
});
