const { Country, Activity } = require("../db");

//Esta ruta obtiene el detalle de un país específico. Es decir que devuelve un objeto con la información pedida en el detalle de un país.
// El país es recibido por parámetro (ID de tres letras del país).
// Tiene que incluir los datos de las actividades turísticas asociadas a este país.
const getCountryById = async (req, res) => {
  try {
    const { idPais } = req.params;
    const CountryFound = await Country.findOne({
      where: { id: idPais },
      include: [Activity],
    });
    if (CountryFound) return res.status(200).json(CountryFound);
    else throw Error;
  } catch (error) {
    res.status(404).json({ error: "ID Not Found" });
  }
};

module.exports = getCountryById;
