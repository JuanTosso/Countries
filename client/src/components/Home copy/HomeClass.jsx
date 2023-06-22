import style from "./HomeClass.module.css";
import Countries from "../Countries/Countries";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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

class HomeClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countrySearch: "",
    };
  }
  handleChange = (event) => {
    this.setState({ countrySearch: event.target.value });
  };
  //despacha la accion de la barra de busqueda
  handleSearch = () => {
    this.props.getCountriesByName(this.state.countrySearch);
    this.props.resetPage();
  };
  render() {
    const paginaActual = Math.ceil((this.props.firstToShow + 1) / 10);
    const pages = Math.ceil(this.props.countries.length / 10);

    // manejadores del paginado
    const handlePrevious = () => {
      this.props.previousPage();
    };

    const handleNext = () => {
      this.props.nextPage();
    };

    //Manejadores de ORDEN
    const handleNameOrder = (e) => {
      this.props.resetPage();
      this.props.orderByName(e.target.value);
    };
    const handlePopulationOrder = (e) => {
      this.props.resetPage();
      this.props.orderByPopulation(e.target.value);
    };

    //Manejadores de los filtros
    const handleContinentFilter = (e) => {
      this.props.resetPage();
      this.props.filterByContinent(e.target.value);
    };
    const handleActivityFilter = (e) => {
      this.props.resetPage();
      this.props.filterByActivity(e.target.value);
    };
    return (
      <div className={style.home}>
        <nav>
          <input
            className={style.input}
            name="search"
            type="search"
            placeholder=" countries..."
            onChange={this.handleChange}
          />
          <button onClick={this.handleSearch}>Search</button>

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
              {this.props.activities?.map((activity) => {
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
            Page {paginaActual} of {pages}
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    activities: state.activities,
    firstToShow: state.firstToShow,
    countries: state.countries,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCountriesByName: (countryName) =>
      dispatch(getCountriesByName(countryName)),
    filterByContinent: (continent) => dispatch(filterByContinent(continent)),
    filterByActivity: (activity) => dispatch(filterByActivity(activity)),
    orderByName: (order) => dispatch(orderByName(order)),
    orderByPopulation: (order) => dispatch(orderByPopulation(order)),
    nextPage: () => dispatch(nextPage()),
    previousPage: () => dispatch(previousPage()),
    resetPage: () => dispatch(resetPage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeClass);
