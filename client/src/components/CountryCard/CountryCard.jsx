import { Link } from 'react-router-dom';
import style from './CountryCard.module.css'

const CountryCard = ({id,name,image,continent})=>{

    return(
        <div className= {style.contenedor}>
            <Link to={`/detail/${id}`}>
            <h4>{name}</h4>
            </Link>
            <h5>{continent}</h5>
            <img src=  {image}  alt={`Flag from ${name}`} />
            
        </div>
    )
}
export default CountryCard