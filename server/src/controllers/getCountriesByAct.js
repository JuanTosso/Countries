const { Country, Activity } = require("../db");

const getCountriesByActivity = async (req, res) => {
  try {
    const { id } = req.query;
    if (id === "All countries") {
      return res.status(200).send("All countries");
    }
    console.log(id === "All countries");
    const activity = await Activity.findByPk(id, {
      include: [Country],
    });

    return res.status(200).json(activity.Countries);
  } catch (error) {
    res.status(404).json({ error: "No Countries Found" });
  }
};

module.exports = getCountriesByActivity;
