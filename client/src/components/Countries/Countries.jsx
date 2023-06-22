import CountryCard from "../CountryCard/CountryCard";
import style from "./Countries.module.css";
import { useSelector } from "react-redux";

const Countries = ({ searchError }) => {
  const countries = useSelector((state) => state.countries);
  const firstToShow = useSelector((state) => state.firstToShow);
  return (
    <div className={style.contenedor}>
      {countries.length > 0 ? (
        countries
          .slice(firstToShow, firstToShow + 10)
          .map(({ id, name, image, continent }) => {
            return (
              <CountryCard
                key={id}
                id={id}
                name={name}
                image={image}
                continent={continent}
              />
            );
          })
      ) : (
        <div className={style.errorMessage}>
          <h2>Ups, we are sorry</h2>
          <h4>
            No countries found with input "{searchError}", please try again
          </h4>
        </div>
      )}
    </div>
  );
};

export default Countries;
