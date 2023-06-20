import style from "./Form.module.css";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Actions:
import { postActivity } from "../../Redux/actions";
//Valicaciones:
import validate from "../../Functions/validation";

const Form = () => {
  const dispatch = useDispatch();
  //me traigo el estado global para mappear los paises en las opciones desplegables, y los ordeno alfabeticamente
  const countries = useSelector((state) => state.allCountries);
  const orderedCountries = countries?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  //Estado local para guardar los datos del formulario
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryId: [],
  });

  // hook de react para crear una referencia al formulario y poder resetearlo
  const formReset = useRef();

  //Estado local para manejar los errores
  const [error, setError] = useState({});

  //funcion manejadora para los eventos del formulario, salvo countries
  const handleOnChange = (event) => {
    setActivity({
      ...activity,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({ ...activity, [event.target.name]: event.target.value })
    );
  };

  //funcion manejadora para almacenar todos los countries seleccionados en el estado local
  const handleCountriesChange = (event) => {
    //metodo para crear un array, a partir de un objeto iterable.
    const selectedCountries = Array.from(
      event.target.selectedOptions,
      (country) => country.value
    );
    setActivity({
      ...activity,
      countryId: selectedCountries,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //DESPACHAR ACCION CON OBJETO DE ACTIVIDAD A POSTEAR
    dispatch(postActivity(activity));

    //REINICIO estado local:
    setActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countryId: [],
    });

    //Al hacer submit, reseteo el formulario, utilizando el hook:
    formReset.current.reset();

    window.alert("Activity created");
  };

  return (
    <div className={style.principal}>
      <Link to={"/home"}>
        <button>HOME</button>
      </Link>

      <h2>Create Activity</h2>
      <form className={style.form} onSubmit={handleSubmit} ref={formReset}>
        <div className={style.fieldset}>
          <div className={style.inputs}>
            <label id="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="name..."
              onChange={handleOnChange}
              value={activity.name}
            />
            <div className={style.error}>
              {error.name && <p>{error.name} </p>}
            </div>
          </div>

          <div className={style.inputs}>
            <label id="difficulty">Difficulty</label>
            <select defaultValue="" onClick={handleOnChange} name="difficulty">
              <option value="" disabled hidden>
                {" "}
                --Select--{" "}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className={style.inputs}>
            <label id="duration">Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="hours..."
              onChange={handleOnChange}
            />
            <div className={style.error}>
              {error.duration && <p>{error.duration} </p>}
            </div>
          </div>

          <div className={style.inputs}>
            <label id="season">Season</label>
            <select defaultValue="" onChange={handleOnChange} name="season">
              <option value="" disabled hidden>
                --Select--
              </option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>
          </div>

          <div className={style.inputs}>
            <label id="countryId">Countries </label>
            <select onChange={handleCountriesChange} name="countryId" multiple>
              {orderedCountries?.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={style.countries_selected}>
            <label id="countriesSelected">Countries selected:</label>
            {activity.countryId.length > 0 ? (
              <p>
                {orderedCountries.map((country) => {
                  if (activity.countryId.includes(country.id)) {
                    return <span key={country.id}> - {country.name}</span>;
                  }
                })}
              </p>
            ) : (
              <p>No Countries selected</p>
            )}
          </div>
        </div>
        <button
          disabled={
            activity.season &&
            activity.difficulty &&
            !error.name &&
            !error.duration &&
            activity.countryId.length
              ? false
              : true
          }
          className={
            activity.season &&
            activity.difficulty &&
            !error.name &&
            !error.duration &&
            activity.countryId.length
              ? ""
              : style.disable
          }
        >
          Submit
        </button>
        <div className={style.error}>
          {!activity.name ||
          !activity.season ||
          !activity.difficulty ||
          !activity.countryId.length ? (
            <p>* All fields must be completed</p>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
