const {Activity} = require('../db')
//Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.

const getActivities = async (req,res) =>{
    try {
        const allActivities = await Activity.findAll()
        return res.status(200).json(allActivities)
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' })
    }
}

module.exports = getActivities