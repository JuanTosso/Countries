const { Activity } = require("../db");
//Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.

const getActivities = async (req, res) => {
  try {
    const allActivities = await Activity.findAll();
    if (allActivities.length > 0) return res.status(200).json(allActivities);
    else throw Error;
  } catch (error) {
    res.status(500).json({ error: "No activities in DB" });
  }
};

module.exports = getActivities;
