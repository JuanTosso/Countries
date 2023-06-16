const server = require("../src/server");
const session = require("supertest");
const agent = session(server); //agent es nuestra promesa para testear esta ruta
const getCountryById = require("../src/controllers/getCountryById");

describe("GET /countries/:idPais", () => {
  it("Es una funcion", () => {
    expect(typeof getCountryById).toBe("function");
    expect(typeof getCountryById).not.toBe("number");
  });
  it("Responde con status 200", async () => {
    await agent.get("/countries/ARG").expect(200);
  });

  it("Responde un objeto con las propiedades id, name, image, continent, capital y population", async () => {
    const response = (await agent.get("/countries/ARG")).body;
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("name");
    expect(response).toHaveProperty("image");
    expect(response).toHaveProperty("continent");
    expect(response).toHaveProperty("capital");
    expect(response).toHaveProperty("population");
  });
  it("Responde status 404 si no encuentra el Id en la base de datos", async () => {
    await agent.get("/countries/ZZZZ").expect(404);
  });
});
