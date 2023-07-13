import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import style from "./Form.module.css";
import { validation } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../Redux/actions";

const Form = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    instructions: "",
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    healthScore: "",
    instructions: "",
    image: "",
    diets: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const target = event.target.name;

    const regexNum = /^([0-9])*$/;
    if (regexNum.test(target)) {
      // checkeo si es un checkbox
      const selectedDiet = diets.find((diet) => diet.id === parseInt(target));
      const selectedDietName = selectedDiet ? selectedDiet.name : "";

      if (!form.diets.includes(selectedDietName)) {
        // si no está en form lo agrego
        setForm({ ...form, diets: [...form.diets, selectedDietName] });
      } else {
        // si está lo quito
        setForm({
          ...form,
          diets: [...form.diets.filter((diet) => diet !== selectedDietName)],
        });
      }
    } else {
      setForm({ ...form, [target]: value });

      validation({ ...form, [target]: value }, errors, setErrors, target);
    }
  };

  const isFormValid = () => {
    return (
      form.title &&
      form.summary &&
      form.healthScore &&
      form.instructions &&
      form.image &&
      form.diets.length > 0 &&
      !Object.values(errors).some((error) => error !== "")
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      alert("Recipe created successfully");
      dispatch(postRecipe(form));
      setForm({
        title: "",
        summary: "",
        healthScore: 0,
        instructions: "",
        image: "",
        diets: [],
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Add your own recipe!</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.section}>
          <label htmlFor="title" className={style.label}>
            Title
          </label>
          <input
            onChange={handleChange}
            placeholder="📝"
            type="text"
            name="title"
            value={form.title}
            className={errors.title ? style.error : style.input}
          ></input>
          {errors.title ? (
            <span className={style.msgError}>{errors.title}</span>
          ) : (
            <></>
          )}

          <label htmlFor="summary" className={style.label}>
            Summary
          </label>
          <textarea
            onChange={handleChange}
            placeholder="📝"
            type="text"
            name="summary"
            value={form.summary}
            className={errors.summary ? style.error : style.input}
          ></textarea>
          {errors.summary ? (
            <span className={style.msgError}>{errors.summary}</span>
          ) : (
            <></>
          )}

          <label htmlFor="healthscore" className={style.label}>
            Health Score
          </label>
          <input
            onChange={handleChange}
            placeholder="📝"
            type="number"
            name="healthScore"
            value={form.healthScore}
            className={errors.healthScore ? style.error : style.input}
          ></input>
          {errors.healthScore ? (
            <span className={style.msgError}>{errors.healthScore}</span>
          ) : (
            <></>
          )}

          <label htmlFor="instructions" className={style.label}>
            Instructions
          </label>
          <textarea
            onChange={handleChange}
            placeholder="📝"
            type="text"
            name="instructions"
            value={form.instructions}
            className={errors.instructions ? style.error : style.input}
          ></textarea>
          {errors.instructions ? (
            <span className={style.msgError}>{errors.instructions}</span>
          ) : (
            <></>
          )}

          <label htmlFor="image" className={style.label}>
            Image
          </label>
          <input
            onChange={handleChange}
            placeholder="📝"
            type="text"
            name="image"
            value={form.image}
            className={errors.image ? style.error : style.input}
          ></input>
          {errors.image ? (
            <span className={style.msgError}>{errors.image}</span>
          ) : (
            <></>
          )}
        </div>
        <div className={style.sectionDiets}>
          <h2 className={style.label}>
            Select the diets which your recipe belongs to:
          </h2>
          {errors.diets ? (
            <span className={style.msgError}>{errors.diets}</span>
          ) : (
            <></>
          )}
          {diets.map((diet) => {
            const isChecked = form.diets.includes(diet.name);
            return (
              <div key={diet.id}>
                <label htmlFor={diet.id} className={style.label}>
                  {diet.name.toUpperCase()}
                </label>
                <input
                  className={style.checkbox}
                  type="checkbox"
                  name={diet.id}
                  id={diet.id}
                  checked={isChecked}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <Button
            text="Submit"
            display={
              form.title &&
              form.summary &&
              form.healthScore &&
              form.instructions &&
              form.image &&
              form.diets.length > 0 &&
              !errors.title &&
              !errors.summary &&
              !errors.instructions &&
              !errors.image &&
              !errors.diets
            }
            className={style.button}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
