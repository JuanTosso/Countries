import style from './Form.module.css'
import { useState, useRef, useEffect } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { postActivity } from '../../Redux/actions';


const Form = ()=>{

    const dispatch = useDispatch();
    //me traigo el estado global para mappear los paises en las opciones desplegables, y los ordeno alfabeticamente
    const countries = useSelector((state)=>state.allCountries)
    const orderedCountries = countries?.sort((a,b)=>{
        return a.name.localeCompare(b.name)})
    
    


    //Estado local para guardar los datos del formulario
    const [activity,setActivity] = useState({name:'',
    difficulty: '',
    duration: '',
    season: '',
    countryId: [],
    
})
    // hook de react para crear una referencia al formulario y poder resetearlo
    const formReset = useRef(null);

    //funcion manejadora para los eventos del formulario, salvo countries
    const handleOnChange = (event)=>{
        setActivity({
            ...activity,
            [event.target.name] : event.target.value
        } )
    }
//funcion manejadora para almacenar todos los countries seleccionados en el estado local
    const handleCountriesChange = (event) =>{
            //metodo para crear un array, a partir de un objeto iterable.
        const selectedCountries = Array.from(event.target.selectedOptions, option => option.value)
        setActivity({

            ...activity,
            countryId: selectedCountries
        })
    }   

    const handleSubmit = (event) =>{
        event.preventDefault();
        
        //DESPACHAR ACCION CON OBJETO DE ACTIVIDAD A POSTEAR
        dispatch(postActivity(activity))

        //REINICIO estado local:
        setActivity({name:'',
        difficulty: '',
        duration: '',
        season: '',
        countryId: [],
         })

        //Al hacer submit, reseteo el formulario, utilizando el hook:
        formReset.current.reset();    

        window.alert('Poner mensaje de exito')
}
    
    return(
        <form   className={style.form}
                onSubmit={handleSubmit}    
                ref={formReset}
        >
            <h1>Create Activity</h1>

            <div className='inputs'>
                    <label id="name">Name: </label>
                    <input  type="text" 
                            name='name'
                            placeholder='name...'
                            onChange={handleOnChange}
                            value={activity.name}                    
                            />
            </div>

            <div className='inputs'>
                    <label id='difficulty' >Difficulty: </label>
                    <select defaultValue="" onClick={handleOnChange} name="difficulty">
                        <option value="" disabled hidden > --Select-- </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

            </div>

            <div className='inputs'>
                    <label id="duration">Duration: </label>
                    <input  type="number" 
                            name='duration'
                            placeholder='duration...'
                            onChange={handleOnChange}
                            />
            </div>

            <div className='inputs'>
                    <label id="season">Season: </label>
                    <select defaultValue="" onChange={handleOnChange} name="season">
                        <option value="" disabled hidden> --Select-- </option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>

                    </select>
                   
            </div>
            <div className='inputs'>
                    <label id="countryId">Countries: </label>
                    <select onChange={handleCountriesChange} name="countryId" multiple>
                        {orderedCountries?.map(({id,name}) => {
                           
                            return(
                                 <option key={id} value={id}>{name}</option>
                                 )
                            })}
                    </select>
                   
            </div>

             <button disabled={!activity.name || !activity.season || !activity.difficulty || !activity.countryId }>Submit</button>
            
        </form>
    )
}

export default Form