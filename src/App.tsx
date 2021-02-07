import React, {useEffect} from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";
import { getAsteroids, setLoading } from "./actions/asteroidActions";
import Header from "./components/Header";
import Content from "./components/Content";
import {TimeEnum} from './components/Header';

interface AppProps {
  getAsteroids: (time?: TimeEnum) => void;
  setLoading: () => void;
}

export interface PieChartData {
  name: string,
  value: number,
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

const useStyles = makeStyles({
  app: {
    backgroundColor: "#eee",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
});

const App = (props: AppProps) => {
  const { getAsteroids, setLoading } = props;

   useEffect(() => {
     getAsteroids();
   }, [getAsteroids]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#138086",
      },
      secondary: {
        main: "#534666",
      },
      error: {
        main: "#CD7672",
      },
    }
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Header
          getAsteroids={getAsteroids}
          setLoading={setLoading}
        />
        <Content />
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.asteroids.loading,
});

export default connect(mapStateToProps, {
  getAsteroids,
  setLoading
})(App);


