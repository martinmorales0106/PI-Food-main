// Definir el reducer: Crea un archivo para definir el reducer de Redux. Un reducer es una función que especifica cómo cambia el estado en respuesta a una acción. El reducer toma el estado actual y una acción, y devuelve un nuevo estado actualizado.

// reducer.js
import {
  ORDER,
  ADD_RECIPE_DETAIL,
  CLEAN_DETAIL,
  FILTER,
  GET_DIETS,
  GET_RECIPES,
  SEARCH_RECIPE,
  POST_RECIPE,
  POST_RECIPE_ERROR,
  GET_DIETS_ERROR,
  GET_RECIPES_ERROR,
  ADD_RECIPE_DETAIL_ERROR,
  SEARCH_RECIPE_ERROR,
} from "./types";

import { ascendant, descendant } from "./funcionComparadora";

const initialState = {
  diets: [],
  recipes: [],
  recipeDetail: {},
  allRecipes: [],
  filteredRecipes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER: {
      const { payload } = action;
      let sortedRecipes = [];

      if (payload === "ascendenteAlf") {
        sortedRecipes = [
          ...state.recipes.sort((a, b) => ascendant(a.title, b.title)),
        ];
      } else if (payload === "descendenteAlf") {
        sortedRecipes = [
          ...state.recipes.sort((a, b) => descendant(a.title, b.title)),
        ];
      } else if (payload === "ascendenteHS") {
        sortedRecipes = [
          ...state.recipes.sort((a, b) => a.healthScore - b.healthScore),
        ];
      } else if (payload === "descendenteHS") {
        sortedRecipes = [
          ...state.recipes.sort((a, b) => b.healthScore - a.healthScore),
        ];
      } else {
        return state;
      }

      return {
        ...state,
        recipes: sortedRecipes,
      };
    }
    case FILTER: {
      const { payload } = action;
      const validUUID =
        /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

      if (payload === "AllData") {
        return {
          ...state,
          recipes: [...state.allRecipes],
          filteredRecipes: [...state.allRecipes],
        };
      } else if (payload === "db") {
        const dbRecipes = state.allRecipes.filter((recipe) =>
          validUUID.test(recipe.id)
        );
        return {
          ...state,
          recipes: dbRecipes,
          filteredRecipes: dbRecipes,
        };
      } else if (payload === "api") {
        const apiRecipes = state.allRecipes.filter(
          (recipe) => !validUUID.test(recipe.id)
        );
        return {
          ...state,
          recipes: apiRecipes,
          filteredRecipes: apiRecipes,
        };
      } else if (payload !== "AllDiets") {
        const filteredRecipes = state.filteredRecipes.filter((recipe) =>
          recipe.diets?.find((element) => element?.name === payload)
        );
        return {
          ...state,
          recipes: filteredRecipes,
        };
      } else if (payload === "AllDiets") {
        return {
          ...state,
          recipes: [...state.filteredRecipes],
        };
      } else {
        return {
          ...state,
          recipes: [...state.allRecipes],
        };
      }
    }
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: [...action.payload],
        recipes: [...action.payload],
      };
    case GET_DIETS:
      return {
        ...state,
        diets: [...action.payload],
      };
    case SEARCH_RECIPE:
      return {
        ...state,
        allRecipes: [...action.payload],
        recipes: [...action.payload],
      };
    case ADD_RECIPE_DETAIL: {
      const { id, title, summary, healthScore, instructions, image, diets } =
        action.payload;
      return {
        ...state,
        recipeDetail: {
          id,
          title,
          summary,
          healthScore,
          instructions,
          image,
          diets,
        },
      };
    }
    case CLEAN_DETAIL:
      return {
        ...state,
        recipeDetail: {},
      };
    case POST_RECIPE: {
      const updatedRecipes = [...state.allRecipes, action.payload];
      return {
        ...state,
        allRecipes: updatedRecipes,
        recipes: updatedRecipes,
      };
    }
    case POST_RECIPE_ERROR:
      console.log("Error al publicar la receta:", action.payload);
      return state;

    case GET_DIETS_ERROR:
      console.log("Error al obtener las dietas:", action.payload);

      return state;
    case GET_RECIPES_ERROR:
      console.log("Error al obtener las recetas:", action.payload);

      return state;
    case ADD_RECIPE_DETAIL_ERROR:
      console.log("Error al obtener el detalle de la receta:", action.payload);

      return state;
    case SEARCH_RECIPE_ERROR:
      console.log("Error al buscar recetas:", action.payload);

      return state;
      
    default:
      return state;
  }
};

export default reducer;
