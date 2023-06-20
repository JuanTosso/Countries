const { Router } = require("express");
const router = Router();
//importo controladores

const getAllCountries = require("../controllers/getAllCountries");
const getCountryById = require("../controllers/getCountryById");
const getCountriesByName = require("../controllers/getCountriesByName");
const postActivity = require("../controllers/postActivity");
const getActivities = require("../controllers/getAtivities");
const getCountriesByActivity = require("../controllers/getCountriesByAct");

//Resto de las rutas:
router.get("/countries", getAllCountries);
router.get("/countries/name", getCountriesByName);
router.get("/countries/:idPais", getCountryById);
router.post("/activities", postActivity);
router.get("/activities", getActivities);
router.get("/countries-by-activities", getCountriesByActivity);

module.exports = router;
