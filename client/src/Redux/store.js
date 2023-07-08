// Configurar el store: Crea un archivo para configurar el store de Redux. El store es el objeto central que almacena el estado de la aplicación y proporciona métodos para acceder y actualizar dicho estado.

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
