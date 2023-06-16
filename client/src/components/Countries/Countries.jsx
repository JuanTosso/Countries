import CountryCard from "../CountryCard/CountryCard";
import style from "./Countries.module.css";

const Countries = ({ countries, firstToShow }) => {
  return (
    <div className={style.contenedor}>
      {countries
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
        })}
    </div>
  );
};

export default Countries;
