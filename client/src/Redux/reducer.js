//importar acciones
import { GET_COUNTRIES,GET_COUNTRIES_BY_NAME,FILTER_CONTINENT, FILTER_ACTIVITY, ORDER_NAME, ORDER_POPULATION, POST_ACTIVITY, GET_ACTIVITIES} from "./actions"

//completar el estado inicial
const initialState = {
    countries: [],
    countriesAux: [],
    allCountries: [],
    activities: []
}

const rootReducer = (state=initialState,action) =>{
    switch(action.type){
        case GET_COUNTRIES:
             return { ...state, countries: action.payload,countriesAux: action.payload, allCountries: action.payload };

        case GET_COUNTRIES_BY_NAME:
                 return { ...state, countries: action.payload, countriesAux: action.payload };

        case FILTER_CONTINENT:
            const filterByContinent =  state.countriesAux.filter( country =>
                country.continent === action.payload)
                
                if(action.payload === 'All countries') {return {...state, countries: state.countriesAux}}
                else{ return { ...state, countries: filterByContinent  }  }

        case FILTER_ACTIVITY: //Ver respuesta de luqui
            const filterByActivity =  state.countriesAux.filter( country =>
                country.continent === action.payload)

                if(action.payload === 'All countries') {return {...state, countries: state.countriesAux}}
                else{ return { ...state, countries: filterByActivity  }  }

        case ORDER_NAME:  //Ver bien q hace el metodo localeCompare
            const actualNameOrder = [...state.countries]
            if(action.payload === 'A') {actualNameOrder.sort((a,b)=>{
                return a.name.localeCompare(b.name)})}
            else {actualNameOrder.sort((a,b)=>{
                return b.name.localeCompare(a.name)})}    
            
            
            return {... state, countries:actualNameOrder};

        case ORDER_POPULATION:
            const actualPopOrder = [...state.countries]
            
            if(action.payload === 'A')  { actualPopOrder.sort((a,b) => {
               return a.population - b.population 
                })
            } else { actualPopOrder.sort((a,b) => {
               return b.population - a.population 
                })}
                                return{
                    ...state,
                    countries: actualPopOrder
                };
        
        case POST_ACTIVITY:
            console.log(state.activities)
                return {
                   ...state,
                   activities : [...state.activities, action.payload]
                };
                
        case GET_ACTIVITIES:

            return {
                ...state,
                activities: action.payload
            }

        default:
            return {...state}
 
    }
}

export default rootReducer