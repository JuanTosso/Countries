const { Activity } = require("../db");

//Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla con los países solicitados.
// Toda la información debe ser recibida por body.
// Debe crear la actividad turística en la base de datos, y esta debe estar relacionada con los países indicados (al menos uno).
const postActivity = async (req, res) => {
  try {
    const { countryId, name, difficulty, duration, season } = req.body;

    if (!countryId || !name || !difficulty || !season)
      throw Error("missing data to add activity");

    //tal vez agregar error de que el id del country no existe. Pero ver como se manda ese dato en el front primero
    const newActivity = await Activity.create({
      name,
      difficulty,
      season,
      duration,
    });

    await newActivity.addCountries(countryId);

    return res.status(200).json(newActivity);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = postActivity;
