// Definir acciones: Crea un archivo para definir las acciones de Redux. Las acciones son objetos que describen un cambio de estado y deben tener un tipo único que las identifique.
import axios from "axios";

import {
  GET_RECIPES,
  ADD_RECIPE_DETAIL,
  CLEAN_DETAIL,
  SEARCH_RECIPE,
  GET_DIETS,
  POST_RECIPE,
  ORDER,
  FILTER,
  POST_RECIPE_ERROR,
  GET_DIETS_ERROR,
  GET_RECIPES_ERROR,
  ADD_RECIPE_DETAIL_ERROR,
  SEARCH_RECIPE_ERROR,
} from "./types";

export const order = (judgment) => {
  return { type: ORDER, payload: judgment };
};

export const filter = (judgment) => {
  return { type: FILTER, payload: judgment };
};

export const getDiets = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/diets");
      dispatch({ type: GET_DIETS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_DIETS_ERROR, payload: error.message });
    }
  };
};

export const getRecipes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/recipes");
      dispatch({ type: GET_RECIPES, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_RECIPES_ERROR, payload: error.message });
    }
  };
};

export const addRecipeDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/recipes/${id}`);
      dispatch({ type: ADD_RECIPE_DETAIL, payload: response.data });
    } catch (error) {
      dispatch({ type: ADD_RECIPE_DETAIL_ERROR, payload: error.message });
    }
  };
};

export const cleanDetail = () => {
  return function (dispatch) {
    dispatch({ type: CLEAN_DETAIL });
  };
};

export const searchRecipe = (name) => {
  if (name) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`/recipes/?name=${name}`);
        dispatch({ type: SEARCH_RECIPE, payload: response.data });
      } catch (error) {
        dispatch({ type: SEARCH_RECIPE_ERROR, payload: error.message });
      }
    };
  } else {
    return async function (dispatch) {
      try {
        const response = await axios.get("/recipes");
        dispatch({ type: GET_RECIPES, payload: response.data });
      } catch (error) {
        dispatch({ type: GET_RECIPES_ERROR, payload: error.message });
      }
    };
  }
};

export const postRecipe = (recipe) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/recipes", recipe);
      dispatch({ type: POST_RECIPE, payload: response.data });
    } catch (error) {
      dispatch({ type: POST_RECIPE_ERROR, payload: error.message });
    }
  };
};