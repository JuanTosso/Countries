import style from './Landing.module.css'
import { NavLink } from "react-router-dom";

const Landing = ()=>{

    
    return (
        <div  className={style.contenedor}>
                        
                <h1 className={style.tittle}>Your journey begins here</h1>
                
                <button className={style.button}>
                <NavLink to='/home'>INGRESAR</NavLink>    
                </button>
        
        </div>
    )
}

export default Landing