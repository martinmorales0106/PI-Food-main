import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import style from "./Home.module.css";
import { filter, getDiets, getRecipes, order } from "../../Redux/actions";
import { useEffect, useState } from "react";

import Pagination from "../../components/Pagination/Pagination";

const Home = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const { recipes, diets } = useSelector((state) => state);

  const [recipesPerPage] = useState(9);

  const totalRecipes = recipes.length;
  const lastIndex = currentPage * recipesPerPage;
  const firstIndex = lastIndex - recipesPerPage;

  const handleOrder = (event) => {
    const judgment = event.target.value;
    dispatch(order(judgment));
    setCurrentPage(1);
  };
  const handleFilter = (event) => {
    const judgment = event.target.value;
    const typeDiets = event.target.name;
    if (typeDiets === "diets") {
      const originFilter = document.querySelector(
        'select[name="origin"]'
      ).value;
      if (originFilter === "") {
        alert("You must select the origin filter first.");
        return;
      }
    }
    dispatch(filter(judgment));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div className={style.home}>
      <h1 className={style.title}>Recipes</h1>

      <div className={style.buttonsContainer}>
        <select
          className={style.menu}
          name="order"
          onChange={handleOrder}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Order
          </option>
          <option value="ascendenteAlf">A-Z ⬆</option>
          <option value="descendenteAlf">Z-A ⬇</option>
          <option value="ascendenteHS">Health score ⬆</option>
          <option value="descendenteHS">Health score ⬇</option>
        </select>
        <select
          className={style.menu}
          name="origin"
          onChange={handleFilter}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Origin
          </option>
          <option value="AllData">All</option>
          <option value="db">Data Base</option>
          <option value="api">Spoon API</option>
        </select>
        <select
          className={style.menu}
          name="diets"
          onChange={handleFilter}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Type of diet
          </option>
          <option value="AllDiets">All</option>
          {diets.length ? (
            diets.map((diet) => {
              return <option key={diet.id}>{diet.name}</option>;
            })
          ) : (
            <></>
          )}
        </select>
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRecipes={totalRecipes}
      />
      {recipes.length ? (
        <Cards recipes={recipes.slice(firstIndex, lastIndex)}></Cards>
      ) : (
        <h1 className={style.loading}>Loading...</h1>
      )}
      <Pagination
        recipesPerPage={recipesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRecipes={totalRecipes}
      />
    </div>
  );
};

export default Home;
