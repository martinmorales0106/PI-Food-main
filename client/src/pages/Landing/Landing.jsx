import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import background from "../../img/landing.jpg";
import Button from "../../components/Button/Button";

const Landing = () => {
  return (
    <div
      className={style.container}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={style.textContainer}>
        <h1 className={style.title}>Welcome to Healthy Food</h1>
        <p className={style.text}>
          In Healthy Food you will find a wide variety of healthy food recipes.
          Our web application allows you to search for recipes through requests
          to a server developed by us, which in turn gets the information from
          the {" "}
          <a
            className={style.link}
            href="https://spoonacular.com/food-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            spoonacular API.
          </a>{" "}
          In addition, you can fill in a form with your own recipes that will be
          stored in a database. You can also search for recipes both in the API
          and in the database by name. Once you have visualized the obtained
          recipes, you can see the details of each one by clicking on the tabs
          that appear on the home page. This application was developed by Martín
          Morales Jiménez during Henry's individual project instance. Click on
          the button below to enter the page...
        </p>
      </div>
      <Link to="/home">
        <Button display={true} text="Click to enter"/>
      </Link>
    </div>
  );
};

export default Landing;
