const {Country, Activity} = require('../db')

const getCountriesByActivity = async (req,res)=>{
    try {
       
        const countriesFound = await Country.findAll({include: [Activity]})
        res.status(200).json(countriesFound)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getCountriesByActivity
