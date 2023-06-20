import CountryCard from "../CountryCard/CountryCard";
import style from "./Countries.module.css";
import { useSelector } from "react-redux";

const Countries = () => {
  const countries = useSelector((state) => state.countries);
  const firstToShow = useSelector((state) => state.firstToShow);
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
