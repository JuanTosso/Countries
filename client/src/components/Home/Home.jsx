import style from './Home.module.css'
import Countries from '../Countries/Countries';
import { useDispatch , useSelector} from "react-redux";
import { useState } from "react";
import { getCountriesByName,filterByContinent,filterByActivity, orderByName,orderByPopulation } from '../../Redux/actions';
import { Link } from 'react-router-dom';

const Home = ({countries}) =>{
    
    const dispatch = useDispatch(); //para poder despachar acciones
    
    const [firstToShow, setFirstToShow] = useState(0)
    //Estado local para manejar la barra de busqueda
    const [countrySearch, setCountrySearch] = useState('')
    
    const handleChange = (event)=>{
        setCountrySearch(event.target.value)
    }
    const handleSearch = ()=>{
        dispatch(getCountriesByName(countrySearch))
        setFirstToShow(0)
    }


    const handlePrevious = ()=>{
        if(firstToShow < 10) return ;
        setFirstToShow(firstToShow -10)
    }
    const handleNext =()=>{
        
        if(firstToShow +10 >= countries.length) return ;
        setFirstToShow(firstToShow +10)
    }
    //Manejadores de ORDEN
    const handleNameOrder = (e)=>{
        setFirstToShow(0)
        dispatch(orderByName(e.target.value))
        
    }
    const handlePopulationOrder = (e)=>{
        
        setFirstToShow(0)
        dispatch(orderByPopulation(e.target.value))
       
    }

    const handleFilterContinent = (e)=>{
        setFirstToShow(0)
        dispatch(filterByContinent(e.target.value))
    }
    const handleFilter = (e)=>{
        setFirstToShow(0)
        dispatch(filterByActivity(e.target.value))
    }
    return (
        <div className={style.home}>
            <nav>
                    <input  type='search' 
                            placeholder=' countries...' 
                            onChange={handleChange}
                    />
                    <button onClick={handleSearch}>Search</button> 
                   <Link to={'/form'}>
                    <button>Create Activity</button>
                   </Link>
            </nav>

            <div className={style.button}>
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>

            <div className={style.selectores} >
                <div className={style.ordenadores}>
                    <h4>Ornenar Alfabeticamente</h4>
                    <select defaultValue="" onChange={handleNameOrder}>
                        <option  value="" disabled hidden> --Select--</option>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                    </select>
                </div>
                <div className={style.ordenadores}>
                    <h4>Ornenar por Poblacion</h4>
                    <select defaultValue="" onChange={handlePopulationOrder}>
                        <option value="" disabled hidden > --Select-- </option>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                    </select>
                </div>
                <div className={style.ordenadores}>
                    <h4>Filtrar por Continente</h4>
                    <select onChange={handleFilterContinent}>
                        <option value="All countries">All countries</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>
                    </select>
                </div>  
                <div className={style.ordenadores}>
                    <h4>Filtrar por Act turistica</h4>
                    <select onChange={handleFilter}>
                        <option value="Todos">Todos</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Genderless">Genderless</option>
                        <option value="unknown">unknown</option>
                    </select>
                </div>  

            </div>
           
            <Countries countries={countries} firstToShow={firstToShow} />

        </div>
    )
}

export default Home;