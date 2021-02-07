import { GET_ASTEROIDS, ERROR, SET_LOADING } from "../actions/types";

export interface Asteroid {
  url: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    feet: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    miles: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
}
export interface PieChartData {
  name: string;
  value: number;
}
export interface DiameterData {
  name: string;
  meters: {
    minValue: number;
    maxValue: number;
  };
  feet: {
    minValue: number;
    maxValue: number;
  };
  miles: {
    minValue: number;
    maxValue: number;
  };
}
export interface State {
  asteroids: Asteroid[];
  dangerousData: PieChartData[];
  diameterData: DiameterData[];
  error: string;
  loading: boolean;
  day: string;
}

export const initialState: State = {
  asteroids: [],
  dangerousData: [],
  diameterData: [],
  error: "",
  loading: true,
  day: "",
};

const prepareData = (asteroids: Asteroid[]) => {
  let dangerous = 0;
  let safe = 0;
  const diameterData: DiameterData[] = [];
  asteroids.forEach((asteroid, index) => {
    diameterData.push({
      name: (index + 1).toString(),
      meters: {
        minValue: asteroid.estimated_diameter.meters.estimated_diameter_min,
        maxValue: asteroid.estimated_diameter.meters.estimated_diameter_max,
      },
      feet: {
        minValue: asteroid.estimated_diameter.feet.estimated_diameter_min,
        maxValue: asteroid.estimated_diameter.feet.estimated_diameter_max,
      },
      miles: {
        minValue: asteroid.estimated_diameter.miles.estimated_diameter_min,
        maxValue: asteroid.estimated_diameter.miles.estimated_diameter_max,
      },
    });
    if (asteroid.is_potentially_hazardous_asteroid) {
      dangerous = dangerous + 1;
    } else {
      safe = safe + 1;
    }
  });

  return {
    diameterData,
    dangerousData: [
      {
        name: "dangerous",
        value: dangerous,
      },
      {
        name: "safe",
        value: safe,
      },
    ],
  };
};

const asteroidReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ASTEROIDS:
      const { diameterData, dangerousData } = prepareData(action.payload.data);
      return {
        ...state,
        asteroids: action.payload.data,
        dangerousData: dangerousData,
        diameterData: diameterData,
        day: action.payload.day,
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default asteroidReducer;
