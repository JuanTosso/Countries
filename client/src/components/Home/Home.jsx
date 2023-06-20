import style from "./Home.module.css";
import Countries from "../Countries/Countries";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
    dispatch(previousPage());
  };

  const handleNext = () => {
    dispatch(nextPage());
  };

  //Manejadores de ORDEN
  const handleNameOrder = (e) => {
    dispatch(resetPage());
    dispatch(orderByName(e.target.value));
  };
  const handlePopulationOrder = (e) => {
    dispatch(resetPage());
    dispatch(orderByPopulation(e.target.value));
  };

  //Manejadores de los filtros
  const handleContinentFilter = (e) => {
    dispatch(resetPage());
    dispatch(filterByContinent(e.target.value));
  };
  const handleActivityFilter = (e) => {
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
      </div>
    </div>
  );
};

export default Home;
