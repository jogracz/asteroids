import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { setLoading } from "../actions/asteroidActions";
import { Asteroid } from "../reducers/asteroidReducer";
import Charts from "./Charts/Charts";
import { TimeEnum } from "./Header";
import Loading from "./Loading";

interface ContentProps {
  dangerousData: any;
  diameterData: any;
  day: string;
  loading: boolean;
}

const useStyles = makeStyles({
  contentWrapper: {
    width: "95%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#444",
    marginBottom: 100,
  },
  totalCount: {
    fontSize: 24,
    width: "90%",
  },
});

const Content = (props: ContentProps) => {
  const { dangerousData, diameterData, day, loading } = props;
  const classes = useStyles();

  return (
    <Container className={classes.contentWrapper}>
      {loading ? (
        <Loading />
      ) : (
        <Charts
          dangerousData={dangerousData}
          diameterData={diameterData}
          day={day}
        />
      )}
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  asteroids: state.asteroids.asteroids,
  day: state.asteroids.day,
  loading: state.asteroids.loading,
  dangerousData: state.asteroids.dangerousData,
  diameterData: state.asteroids.diameterData,
});

export default connect(mapStateToProps, {
  setLoading,
})(Content);
