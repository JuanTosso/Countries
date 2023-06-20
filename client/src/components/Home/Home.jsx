import style from "./Home.module.css";
import Countries from "../Countries/Countries";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Acciones:
import {
  getCountriesByName,
  filterByContinent,
  filterByActivity,
  orderByName,
  orderByPopulation,
  nextPage,
  previousPage,
  resetPage,
} from "../../Redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  //Estado globales
  const activities = useSelector((state) => state.activities);
  //manejo de paginado:
  const countries = useSelector((state) => state.countries);
  const pages = Math.ceil(countries.length / 10);
  const [actualPage, setActualPage] = useState(1);
  //Estado local para manejar la barra de busqueda
  const [countrySearch, setCountrySearch] = useState("");

  //manejador de la barra de busqueda
  const handleChange = (event) => {
    setCountrySearch(event.target.value);
  };
  //despacha la accion de la barra de busqueda
  const handleSearch = () => {
    dispatch(getCountriesByName(countrySearch));
    dispatch(resetPage());
  };

  // manejadores del paginado
  const handlePrevious = () => {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
    }
    dispatch(previousPage());
  };

  const handleNext = () => {
    if (actualPage < pages) {
      setActualPage(actualPage + 1);
    }
    dispatch(nextPage());
  };

  //Manejadores de ORDEN
  const handleNameOrder = (e) => {
    setActualPage(1);
    dispatch(resetPage());
    dispatch(orderByName(e.target.value));
  };
  const handlePopulationOrder = (e) => {
    setActualPage(1);
    dispatch(resetPage());
    dispatch(orderByPopulation(e.target.value));
  };

  //Manejadores de los filtros
  const handleContinentFilter = (e) => {
    setActualPage(1);
    dispatch(resetPage());
    dispatch(filterByContinent(e.target.value));
  };
  const handleActivityFilter = (e) => {
    setActualPage(1);
    dispatch(resetPage());
    dispatch(filterByActivity(e.target.value));
  };
  return (
    <div className={style.home}>
      <nav>
        <input
          className={style.input}
          name="search"
          type="search"
          placeholder=" countries..."
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>

        <Link to={"/form"}>
          <button className={style.create}>Create Activity</button>
        </Link>
      </nav>

      <div className={style.selectores}>
        <div className={style.order_filter}>
          <h4>Sort by name</h4>
          <select name="nameOrder" defaultValue="" onChange={handleNameOrder}>
            <option value="" disabled hidden>
              {" "}
              --Select--
            </option>
            <option value="A">Ascending</option>
            <option value="D">Descending</option>
          </select>
        </div>
        <div className={style.order_filter}>
          <h4>Sort by population</h4>
          <select
            name="populationOrder"
            defaultValue=""
            onChange={handlePopulationOrder}
          >
            <option value="" disabled hidden>
              {" "}
              --Select--{" "}
            </option>
            <option value="A">Ascending</option>
            <option value="D">Descending</option>
          </select>
        </div>
        <div className={style.order_filter}>
          <h4>Filter by Continent</h4>
          <select
            name="continentFilter"
            defaultValue=""
            onChange={handleContinentFilter}
          >
            <option value="" disabled hidden>
              {" "}
              --Select--{" "}
            </option>
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
        <div className={style.order_filter}>
          <h4>Filter by Activity</h4>
          <select
            name="activityFilter"
            defaultValue=""
            onChange={handleActivityFilter}
          >
            <option value="" disabled hidden>
              {" "}
              --Select--{" "}
            </option>
            <option value="All countries">All countries</option>
            {activities?.map((activity) => {
              return (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <Countries />
      <div className={style.backNext}>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <p>
          Page {actualPage} of {pages}
        </p>
      </div>
    </div>
  );
};

export default Home;
