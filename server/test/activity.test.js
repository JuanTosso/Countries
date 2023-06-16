const { Activity } = require("../src/db");

describe("Activity model", () => {
  afterEach(async () => {
    // Elimina la actividad creada durante la prueba
    await Activity.destroy({ where: { name: "Actividad Z" } });
  });

  it("Debería crear un registro de actividad correctamente", async () => {
    const activityData = {
      name: "Actividad Z",
      difficulty: 3,
      duration: 2.5,
      season: "Summer",
    };

    const activity = await Activity.create(activityData);

    expect(activity.name).toBe(activityData.name);
    expect(activity.difficulty).toBe(activityData.difficulty);
    expect(activity.duration).toBe(activityData.duration);
    expect(activity.season).toBe(activityData.season);
  });

  it("Debería arrojar un error al intentar crear una actividad con una dificultad inválida", async () => {
    const activityData = {
      name: "Actividad Z",
      difficulty: 6, // Dificultad inválida (fuera del rango permitido)
      duration: 1.5,
      season: "Winter",
    };

    await expect(Activity.create(activityData)).rejects.toThrow();
  });
  it("Debería arrojar un error al intentar crear una actividad con una temporada inexistente", async () => {
    const activityData = {
      name: "Actividad Z",
      difficulty: 4,
      duration: 1.5,
      season: "verano", // season inválida (Las mismas estan en ingles)
    };

    await expect(Activity.create(activityData)).rejects.toThrow();
  });
  it("Debería arrojar un error si faltan datos obligatorios", async () => {
    const activityData = {
      // se omite el nombre
      difficulty: 4,
      duration: 1.5,
      season: "verano",
    };

    await expect(Activity.create(activityData)).rejects.toThrow();
  });
});
