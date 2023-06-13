const {Country} = require('../db')
//Obtiene un arreglo de objetos, donde cada objeto es un país con toda su información.

const getAllCountries = async (req,res) =>{
    try {
        const allCountries = await Country.findAll()
        return res.status(200).json(allCountries)
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' })
    }
}

module.exports = getAllCountries