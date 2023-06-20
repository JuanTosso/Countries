const { Activity } = require("../db");

const postActivity = async (req, res) => {
  try {
    const { countryId, name, difficulty, duration, season } = req.body;

    if (countryId.length === 0 || !name || !difficulty || !season)
      throw Error("missing data to add activity");

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
