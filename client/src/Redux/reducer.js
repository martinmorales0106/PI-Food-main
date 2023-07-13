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
    case ORDER:
      if (action.payload === "ascendenteAlf") {
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => ascendant(a.title, b.title)),
          ],
        };
      }
      if (action.payload === "descendenteAlf") {
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => descendant(a.title, b.title)),
          ],
        };
      }
      if (action.payload === "ascendenteHS") {
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => {
              return a.healthScore - b.healthScore;
            }),
          ],
        };
      }
      if (action.payload === "descendenteHS") {
        return {
          ...state,
          recipes: [
            ...state.recipes.sort((a, b) => {
              return b.healthScore - a.healthScore;
            }),
          ],
        };
      }
    
      return { ...state };
    case FILTER:
      const validUUID =
        /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

      if (action.payload === "AllData") {
        return {
          ...state,
          recipes: [...state.allRecipes],
          filteredRecipes: [...state.allRecipes],
        };
      }
      if (action.payload === "db") {
        return {
          ...state,
          recipes: [
            ...state.allRecipes.filter((recipe) => {
              return validUUID.test(recipe.id);
            }),
          ],
          filteredRecipes: [
            ...state.allRecipes.filter((recipe) => {
              return validUUID.test(recipe.id);
            }),
          ],
        };
      }
      if (action.payload === "api") {
        return {
          ...state,

          recipes: [
            ...state.allRecipes.filter((recipe) => {
              return !validUUID.test(recipe.id);
            }),
          ],
          filteredRecipes: [
            ...state.allRecipes.filter((recipe) => {
              return !validUUID.test(recipe.id);
            }),
          ],
        };
      }

      if (action.payload !== "AllDiets") {
        return {
          ...state,
          recipes: [
            ...state.filteredRecipes.filter((recipe) =>
              recipe.diets.find((element) => {
                return element.name === action.payload ? true : false;
              })
            ),
          ],
        };
      }
      if (action.payload === "AllDiets") {
        return { ...state, recipes: [...state.filteredRecipes] };
      }

      return { ...state, recipes: [...state.allRecipes] };

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
        allRecipes: [...state.recipes],
        recipes: [...action.payload],
      };
    case ADD_RECIPE_DETAIL:
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

    case CLEAN_DETAIL:
      return { ...state, recipeDetail: {} };

    case POST_RECIPE:
      return {
        ...state,
        allRecipes: [...state.allRecipes, action.payload],
        recipes: [...state.recipes, action.payload],
      };

    case POST_RECIPE_ERROR:
      console.log("Error al publicar la receta:", action.payload);
      // Puedes realizar cualquier acción adicional necesaria para manejar el error
      return state;

    case GET_DIETS_ERROR:
      console.log("Error al obtener las dietas:", action.payload);
      // Puedes realizar cualquier acción adicional necesaria para manejar el error
      return state;

    case GET_RECIPES_ERROR:
      console.log("Error al obtener las recetas:", action.payload);
      // Puedes realizar cualquier acción adicional necesaria para manejar el error
      return state;

    case ADD_RECIPE_DETAIL_ERROR:
      console.log("Error al obtener el detalle de la receta:", action.payload);
      // Puedes realizar cualquier acción adicional necesaria para manejar el error
      return state;

    case SEARCH_RECIPE_ERROR:
      console.log("Error al buscar recetas:", action.payload);
      // Puedes realizar cualquier acción adicional necesaria para manejar el
      return state;

    default:
      return { ...state };
  }
};

export default reducer;
