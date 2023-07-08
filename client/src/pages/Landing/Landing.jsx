import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import background from "../../img/landing.jpg";

const Landing = () => {
  return (
    <div className={style.container} style={{ backgroundImage: `url(${background})` }}>
      <div className={style.textContainer}>
        <h1 className={style.title}>Bienvenido a Healthy Food</h1>
        <p className={style.text}>
          En Healthy Food, encontrarás una amplia variedad de recetas de comida saludable. Nuestra aplicación web te permite buscar recetas a través de solicitudes a un servidor desarrollado por nosotros, que a su vez obtiene la información de{" "}
          <Link className={style.link} to="https://spoonacular.com/food-api" target="_blank" rel="noopener noreferrer">
            la API de spoonacular
          </Link>
          . Además, puedes completar un formulario con tus propias recetas que se guardarán en una base de datos. También puedes buscar recetas tanto de la API como de la base de datos por nombre. Después de mostrar las recetas obtenidas, puedes ver los detalles de cada una haciendo clic en las tarjetas mostradas en la página de inicio. Esta aplicación fue desarrollada por Martin Morales Jimenez durante la instancia del proyecto individual de Henry. Haz clic en el botón de abajo para ingresar a la página...
        </p>
      </div>
      <Link to="/home">
        <button className={style.button}>Haz clic para ingresar</button>
      </Link>
    </div>
  );
};

export default Landing;