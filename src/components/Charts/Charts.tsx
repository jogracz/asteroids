import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

interface ChartsProps {
  dangerousData: any;
  diameterData: any;
  day: string;
}

const useStyles = makeStyles((theme) => ({
  chartsAndDayWrapper: {
    marginTop: 80,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  chartsWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ["@media (max-width:900px)"]: {
      flexDirection: "column",
    },
  },
  day: {
    color: theme.palette.primary.main,
    fontSize: 20,
    fontWeight: 400,
  },
}));

const Charts = (props: ChartsProps) => {
  const { dangerousData, diameterData, day } = props;
  const classes = useStyles();

  return (
    <div className={classes.chartsAndDayWrapper}>
      <p className={classes.day}>{day}</p>
      <div className={classes.chartsWrapper}>
        <PieChart data={dangerousData} />
        <LineChart data={diameterData} />
      </div>
    </div>
  );
};
export default Charts;
