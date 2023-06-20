import axios from "axios";
//ActionsName:
import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  FILTER_CONTINENT,
  FILTER_ACTIVITY,
  ORDER_NAME,
  ORDER_POPULATION,
  POST_ACTIVITY,
  GET_ACTIVITIES,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  RESET_PAGE,
} from "./action-types";

//Actions:

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/countries");
      return dispatch({
        type: GET_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getActivities = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getCountriesByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/countries/name?name=${name}`
      );
      return dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const filterByContinent = (continent) => {
  return {
    type: FILTER_CONTINENT,
    payload: continent,
  };
};
export const filterByActivity = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/countries-by-activities?id=${id}`
      );

      return dispatch({
        type: FILTER_ACTIVITY,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const orderByName = (order) => {
  return {
    type: ORDER_NAME,
    payload: order,
  };
};
export const orderByPopulation = (order) => {
  return {
    type: ORDER_POPULATION,
    payload: order,
  };
};
export const postActivity = (activity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/activities`,
        activity
      );
      return dispatch({
        type: POST_ACTIVITY,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};
export const previousPage = () => {
  return {
    type: PREVIOUS_PAGE,
  };
};

export const resetPage = () => {
  return {
    type: RESET_PAGE,
  };
};
