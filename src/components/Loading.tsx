import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import asteroid from "../images/asteroid.png";

const useStyles = makeStyles({
  asteroid: {
    marginTop: 100,
    width: 200,
    height: 200,
    animation: "$rotate 1s linear infinite",
    opacity: 0.9,
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
      transformOrigin: "50% 50%",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

const Loading = () => {
  const classes = useStyles();
  return <img className={classes.asteroid} src={asteroid} alt="Loading" />;
};

export default Loading;
