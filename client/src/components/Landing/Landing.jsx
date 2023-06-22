import style from "./Landing.module.css";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.contenedor}>
      <h1 className={style.tittle}>Welcome to GlobeTrek</h1>
      <p className={style.text}>
        Explore the world and discover the wonders of each country with
        <span> GlobeTrek! </span>
        Welcome to our platform, where you can immerse yourself in the diversity
        of cultures, landscapes and experiences that our beautiful planet
        offers.
      </p>
      <br />
      <br />
      <p className={style.text_secundario}>
        With our countries app, you will have access to detailed basic
        information about each nation. Plus, you'll be able to explore a wide
        range of activities available at each destination, from outdoor
        adventures to unforgettable cultural experiences. You can also create
        new activities!
        <br />
        <br />
        Join our community of travelers and start your adventure. Click the
        enter button and discover a universe of possibilities waiting to be
        explored. Welcome to the gateway to unique experiences in every corner
        of the globe!
      </p>
      <button className={style.button}>
        <NavLink to="/home">GET INTO</NavLink>
      </button>
    </div>
  );
};

export default Landing;
