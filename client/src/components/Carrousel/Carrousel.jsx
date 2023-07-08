import style from "./Carrousel.module.css";
import uno from "../../img/carr1.jpg";
import dos from "../../img/carr2.jpg";
import tres from "../../img/carr3.jpg";
import cuatro from "../../img/carr4.jpg";
import cinco from "../../img/carr5.jpg";

const Carrousel = () => {
  return (
      <section className={style.carrousel}>
        <img className={style.image} src={uno} alt="carrousel" />
        <img className={style.image} src={dos} alt="carrousel" />
        <img className={style.image} src={tres} alt="carrousel" />
        <img className={style.image} src={cuatro} alt="carrousel" />
        <img className={style.image} src={cinco} alt="carrousel" />
      </section>
  );
};

export default Carrousel;
