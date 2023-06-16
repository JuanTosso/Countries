import { Link } from "react-router-dom";
import style from "./CountryCard.module.css";

const CountryCard = ({ id, name, image, continent }) => {
  return (
    <div className={style.contenedor}>
      <img src={image} alt={`Flag from ${name}`} />
      <div className={style.inferior}>
        <Link to={`/detail/${id}`}>
          <h4>{name}</h4>
        </Link>
        <h5> {continent}</h5>
      </div>
    </div>
  );
};
export default CountryCard;
