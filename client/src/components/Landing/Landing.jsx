import style from "./Landing.module.css";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.contenedor}>
      <h1 className={style.tittle}>Welcome to GlobeTrek</h1>
      <p className={style.text}>
        ¡Explora el mundo y descubre las maravillas de cada país con{" "}
        <span>GlobeTrek! </span>
        Bienvenido(a) a nuestra plataforma, donde podrás sumergirte en la
        diversidad de culturas, paisajes y experiencias que ofrece nuestro
        hermoso planeta.
      </p>
      <br />
      <br />
      <p className={style.text_secundario}>
        Con nuestra aplicación de países, tendrás acceso a información básica
        detallada sobre cada nación. Además, podrás explorar una amplia gama de
        actividades disponibles en cada destino, desde aventuras al aire libre
        hasta experiencias culturales inolvidables. Tambien podras crear nuevas
        actividades!
        <br />
        <br />
        Únete a nuestra comunidad de viajeros y comienza tu aventura. Haz clic
        en el botón de ingreso y descubre un universo de posibilidades esperando
        ser explorado. ¡Bienvenido(a) a la puerta de entrada hacia experiencias
        únicas en cada rincón del globo!
      </p>
      <button className={style.button}>
        <NavLink to="/home">GET INTO</NavLink>
      </button>
    </div>
  );
};

export default Landing;
