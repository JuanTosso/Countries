import style from './Detail.module.css'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";


const Detail = ()=>{
    const {id} = useParams()
    const [countryDetail, setcountryDetail] = useState([])
    
    useEffect( ()=>{
        axios (`http://localhost:3001/countries/${id}`)
        .then(({data})=>{
            data.name ? setcountryDetail(data) : window.alert('No Country Found');
            })             
    },[id])

    
    const {name,image,continent,capital, subregion, area, population} = countryDetail
    const formattedArea = Number(area).toLocaleString('es-ES')
    const formattedPopulation = Number(population).toLocaleString('es-ES')
    
     return(
        <div className={style.contenedor}>
            
            
        <div className={style.izquierda}>   
            <h1>  {name && name}</h1>
            <h3> Id | {id && id}</h3>
            <h3> Continent | {continent && continent}</h3>            
            <h3> Capital | {capital && capital}</h3>
            <h3> Subregion | {subregion && subregion}</h3>
            <h3 className={style.number}> Area | {area && formattedArea} km <sup>2</sup> </h3>
            <h3> Population | {population &&  formattedPopulation} people</h3>
             
        </div> 
        
       <div className={style.derecha}>   
            <img src={image && image} alt='' /> 
        </div> 
        
    </div>
    )
}

export default Detail