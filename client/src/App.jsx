import "./App.css";
import { useState, useEffect } from "react"; //Lo voy a tener que usar para manejar el loggin
import axios from "axios"; //si tengo que consultar algo al servidor aca
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Importar componentes:
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
//Importar acciones:
import { getCountries, getActivities } from "./Redux/actions";
//Importar funciones:

function App() {
  //Me traigo el dispatch y el estado global
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  //Aqui despacho la accion cuando se monta el componente
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []); // aca pongo vacio para que se despache solo al montarse, Si no pongo nada se actualiza en cada renderizacion. Y puedo poner algo para que este atento a renderizarse especificamente ante algun cambio

  return (
    <div>
      {/* //Aca meter lo que quiero que vean todas las rutas(por ej la navBar). Y para que no se vea en la landpage, meter una funcion como en rickandmorty */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home countries={countries} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
