import axios from "axios";

//ActionsName:
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_COUNTRIES_BY_NAME = 'GET_COUNTRIES_BY_NAME '
export const FILTER_CONTINENT = 'FILTER_CONTINENT'
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY'
export const ORDER_NAME = 'ORDER_NAME'
export const ORDER_POPULATION = 'ORDER_POPULATION'
export const POST_ACTIVITY = 'POST_ACTIVITY'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'

export const getCountries = ()=>{
    return async (dispatch) =>{
        try {
            const {data} = await axios.get('http://localhost:3001/countries')
            return dispatch({
                type: GET_COUNTRIES,
                payload: data
            })

        } catch (error) {
            console.log(error.message)
        }
    }
}
export const getActivities = ()=>{
    return async (dispatch) =>{
        try {
            const {data} = await axios.get('http://localhost:3001/activities')
            return dispatch({
                type: GET_ACTIVITIES,
                payload: data
            })

        } catch (error) {
            console.log(error.message)
        }
    }
}

export const getCountriesByName = (name)=>{
    return async (dispatch) =>{
        try {
            const {data} = await axios.get(`http://localhost:3001/countries/name?name=${name}`)
            return dispatch({
                type: GET_COUNTRIES_BY_NAME,
                payload: data
            })

        } catch (error) {
            console.log(error.message)
        }
    }
}
export const filterByContinent = (continent)=>{
    return{
        type: FILTER_CONTINENT,
        payload: continent
    }
}
export const filterByActivity = (activity)=>{
    return{
        type: FILTER_ACTIVITY,
        payload: activity
    }
}

export const orderByName = (order)=>{
    return{
        type: ORDER_NAME,
        payload: order
    }
}
export const orderByPopulation = (order)=>{
    return{
        type: ORDER_POPULATION,
        payload: order
    }
}
export const postActivity = (activity)=>{
    return async (dispatch) =>{
        try {
            
            const {data} = await axios.post(`http://localhost:3001/activities`,  activity)
            return dispatch({
                type: POST_ACTIVITY,
                payload: data
            })

        } catch (error) {
            console.log(error.message)
        }
    }
}
