import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addRecipeDetail, cleanDetail } from "../../Redux/actions";
import Button from "../../components/Button/Button";
import style from "./Detail.module.css";

const Detail = () => {
  const { recipeDetail } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRecipeDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id, dispatch]);

  return (
    <div className={style.detailView}>
      <NavLink className={style.button} to="/home">
        <Button className={style.button} display={true} text={"⬅"} />
      </NavLink>
      <h1 className={style.detailTitle}>Recipe Detail:</h1>
      {recipeDetail.title ? (
        <div className={style.container}>
          <div className={style.innerContainer}>
            <h1 className={style.title}>{recipeDetail.title}</h1>

            <img
              className={style.image}
              src={recipeDetail.image}
              alt={recipeDetail.title}
            />
            <hr className={style.separator} />
            <h2 className={style.subTitle}>Health Score: {recipeDetail.healthScore}</h2>
            <hr className={style.separator} />
            <h2 className={style.subTitle}>Type of Diets: </h2>
            <ul className={style.diets}>
              {recipeDetail.diets.map((element) => (
                <li key={element.id} className={style.itemList}>
                  {element.name.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
          <div className={style.innerContainer}>
            <h2 className={style.subTitle}>Summary</h2>
            <hr className={style.separator} />
            <p className={style.text}>
              {recipeDetail.summary.replace(/<[^>]*>/g, "")}
            </p>
            <h2 className={style.subTitle}>Instructions</h2>
            <hr className={style.separator} />
            <p className={style.text}>
              {recipeDetail.instructions.replace(/<[^>]*>/g, "")}
            </p>
          </div>
        </div>
      ) : (
        <h1 className={style.loading}>Loading...</h1>
      )}
    </div>
  );
};

export default Detail;
