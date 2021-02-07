import { combineReducers } from "redux";
import asteroidReducer from "./asteroidReducer";

const rootReducer = combineReducers({
  asteroids: asteroidReducer,
});

export default rootReducer;
