import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ title, image, id, healthScore, diets }) => {
  const dietsNames = diets?.map((diet) => diet.name).join(", ");

  return (
    <Link className={style.card} to={`/detail/${id}`}>
      <div className={style.imageContainer}>
        <img src={image} alt={title} className={style.image} />
      </div>
      <div className={style.content}>
        <h1 className={style.title}>{title}</h1>
        <h2 className={style.healthScore}>Health Score: {healthScore}</h2>
        <h2 className={style.dietsTitle}>Type of Diets:</h2>
        <p className={style.diets}>{dietsNames}</p>
      </div>
    </Link>
  );
};

export default Card;
