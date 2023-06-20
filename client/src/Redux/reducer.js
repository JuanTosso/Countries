//importar acciones
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

//completar el estado inicial
const initialState = {
  countries: [],
  countriesAux: [],
  allCountries: [], //solo lo uso para el Form
  activities: [],
  firstToShow: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesAux: action.payload,
        allCountries: action.payload,
      };

    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        countries: action.payload,
        countriesAux: action.payload,
      };

    case FILTER_CONTINENT:
      const filterByContinent = state.countriesAux.filter(
        (country) => country.continent === action.payload
      );

      if (action.payload === "All countries") {
        return { ...state, countries: state.countriesAux };
      } else {
        return { ...state, countries: filterByContinent };
      }

    case FILTER_ACTIVITY:
      //En el payload recibo un "All countries" o un array con los paises que tienen esa actividad
      if (action.payload === "All countries") {
        return { ...state, countries: state.countriesAux };
      } else {
        const countriesID = action.payload?.map((country) => country.id);

        const filteredCountries = state.countriesAux.filter((country) =>
          countriesID.includes(country.id)
        );

        return { ...state, countries: filteredCountries };
      }

    case ORDER_NAME:
      const actualNameOrder = [...state.countries];
      if (action.payload === "A") {
        actualNameOrder.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }); //localeCompare es un metodo de string q me ayuda a comparar dos cadenas de texto para ordenarlas
      } else {
        actualNameOrder.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      return { ...state, countries: actualNameOrder };

    case ORDER_POPULATION:
      const actualPopOrder = [...state.countries];

      if (action.payload === "A") {
        actualPopOrder.sort((a, b) => {
          return a.population - b.population;
        });
      } else {
        actualPopOrder.sort((a, b) => {
          return b.population - a.population;
        });
      }
      return {
        ...state,
        countries: actualPopOrder,
      };

    case POST_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case NEXT_PAGE:
      let aux = state.firstToShow;
      if (state.firstToShow + 10 >= state.countries.length)
        aux = state.firstToShow;
      else aux += 10;
      return {
        ...state,
        firstToShow: aux,
      };
    case PREVIOUS_PAGE:
      let first = state.firstToShow;
      if (first < 10) first = state.firstToShow;
      else first -= 10;
      return {
        ...state,
        firstToShow: first,
      };
    case RESET_PAGE:
      return { ...state, firstToShow: 0 };

    default:
      return { ...state };
  }
};

export default rootReducer;
