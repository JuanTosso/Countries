const { Router } = require("express");
const router = Router();
//importo controladores

const getAllCountries = require('../controllers/getAllCountries');
const getCountrieById = require('../controllers/getCountrieById');
const getCountriesByName = require('../controllers/getCountriesByName')
const postActivity = require('../controllers/postActivity')
const getActivities = require('../controllers/getAtivities')
const getCountriesByActivity = require('../controllers/getCountriesByActivity')

//Ruta para cargar la base de datos

//Resto de las rutas:
router.get('/countries', getAllCountries )
router.get('/countries/name', getCountriesByName )
router.get('/countries/:idPais', getCountrieById)
router.post('/activities',postActivity )
router.get('/activities', getActivities)
router.get('/countries-and-activities', getCountriesByActivity)
 //Se creo ruta para obtener paises con actividades. Usarlo para renderizar el filtro!

module.exports = router;
