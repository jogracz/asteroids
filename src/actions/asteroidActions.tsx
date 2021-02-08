import { GET_ASTEROIDS, ERROR, SET_LOADING } from "./types";
import moment from "moment";
import { TimeEnum } from "../components/Header";

const API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_URL = "https://api.nasa.gov";

export const getAsteroids = (time: TimeEnum = TimeEnum.TODAY) => async (
  dispatch: any
) => {
  let day = "";
  switch (time) {
    case TimeEnum.TODAY:
      day = moment().format("YYYY-MM-DD");
      break;
    case TimeEnum.YESTERDAY:
      day = moment().subtract(1, "days").format("YYYY-MM-DD");
      break;
    case TimeEnum.TOMORROW:
      day = moment().add(1, "days").format("YYYY-MM-DD");
      break;
    default:
      day = moment().format("YYYY-MM-DD");
      break;
  }
  console.log("fetching asteroids");
  try {
    const response = await fetch(
      `${NASA_URL}/neo/rest/v1/feed?start_date=${day}&end_date=${day}&api_key=${API_KEY}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data.near_earth_objects[day]);
    dispatch({
      type: GET_ASTEROIDS,
      payload: { data: data.near_earth_objects[day], day },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: error,
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
