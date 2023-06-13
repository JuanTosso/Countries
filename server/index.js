const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {Country} = require('./src/db.js')


//aca es el mejor lugar para importar el modelo y cargar la base de datos:
// const {Country} = require('./src/db')



conn.sync({ force: false })// el force en true, dropea la bs al volver a levantar el servidor
    .then(() => { 
        server.listen(PORT, async () => {

          const dataBase = Country.findAll();

          if(!dataBase.length){
            const {data} = await axios('http://localhost:5000/countries')
          
            const mappedData =  data.map((country) => {
              return {
                  id : country.cca3,
                  name: country.name.common,
                  image: country.flags.svg ,
                  continent: country.continents.join(' - ') ,
                  capital: country.capital ? country.capital.join(' - ') : 'No Capital Found',
                  subregion: country.subregion ? country.subregion : 'No Subregion Found',
                  area: country.area ,
                  population: country.population , 
              }
           })
           for(let i=0; i<mappedData.length;i++){
              await Country.findOrCreate({
                where: {name: mappedData[i].name},
                defaults: mappedData[i] 
              })
           }
          //  await Country.bulkCreate(mappedData)
           console.log('DT loaded')
          }



  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
