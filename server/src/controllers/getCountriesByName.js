const {Country} = require('../db')
const { Op } = require('sequelize');
//Esta ruta debe obtener todos aquellos países que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el país, debe mostrar un mensaje adecuado.
const getCountriesByName = async (req,res) =>{
    const {name} = req.query
    try {
        console.log(name)
       
        const countriesFound = await Country.findAll({where:{
            name:{ [Op.iLike]:`%${name}%`}
        }})
       
        return res.status(200).json(countriesFound)
    } catch (error) {
        res.status(404).json({ error: `No countries with the name ${name}` })
    }
}

module.exports = getCountriesByName