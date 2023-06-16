import style from "./Home.module.css";
import Countries from "../Countries/Countries";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getCountriesByName,
  filterByContinent,
  filterByActivity,
  orderByName,
  orderByPopulation,
} from "../../Redux/actions";
import { Link } from "react-router-dom";

const Home = ({ countries }) => {
  //Estado local, para renderizar actividades en el filtro
  const activities = useSelector((state) => state.activities);
  console.log(activities); //ver si las actividades q agrego con post se renderizan
  const dispatch = useDispatch(); //para poder despachar acciones

  //Estado Local para manejar el paginado
  const [firstToShow, setFirstToShow] = useState(0);

  //Estado local para manejar la barra de busqueda
  const [countrySearch, setCountrySearch] = useState("");
  //manejador de la barra de busqueda
  const handleChange = (event) => {
    setCountrySearch(event.target.value);
  };
  //despacha la accion de la barra de busqueda
  const handleSearch = () => {
    dispatch(getCountriesByName(countrySearch));
    setFirstToShow(0);
  };

  // manejadores del paginado
  const handlePrevious = () => {
    if (firstToShow < 10) return;
    setFirstToShow(firstToShow - 10);
  };

  const handleNext = () => {
    if (firstToShow + 10 >= countries.length) return;
    setFirstToShow(firstToShow + 10);
  };

  //Manejadores de ORDEN
  const handleNameOrder = (e) => {
    setFirstToShow(0);
    dispatch(orderByName(e.target.value));
  };
  const handlePopulationOrder = (e) => {
    setFirstToShow(0);
    dispatch(orderByPopulation(e.target.value));
  };

  //Manejadores de los filtros
  const handleContinentFilter = (e) => {
    setFirstToShow(0);
    dispatch(filterByContinent(e.target.value));
  };
  const handleActivityFilter = (e) => {
    setFirstToShow(0);
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
          <h4>Ornenar Alfabeticamente</h4>
          <select name="nameOrder" defaultValue="" onChange={handleNameOrder}>
            <option value="" disabled hidden>
              {" "}
              --Select--
            </option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
        </div>
        <div className={style.order_filter}>
          <h4>Ornenar por Poblacion</h4>
          <select
            name="populationOrder"
            defaultValue=""
            onChange={handlePopulationOrder}
          >
            <option value="" disabled hidden>
              {" "}
              --Select--{" "}
            </option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
        </div>
        <div className={style.order_filter}>
          <h4>Filtrar por Continente</h4>
          <select name="continentFilter" onChange={handleContinentFilter}>
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
          <h4>Filtrar por Actividad turistica</h4>
          <select name="activityFilter" onClick={handleActivityFilter}>
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

      <Countries countries={countries} firstToShow={firstToShow} />
      <div className={style.backNext}>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Home;
