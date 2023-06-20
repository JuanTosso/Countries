import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
//Componentes:
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
//Acciones:
import { getCountries, getActivities } from "./Redux/actions";

function App() {
  //Redux:
  const dispatch = useDispatch();

  //Aqui despacho la accion cuando se monta el componente
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []); // aca pongo vacio para que se despache solo al montarse

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
