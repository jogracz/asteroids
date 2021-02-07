import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { DiameterData } from "../../App";
import { makeStyles } from "@material-ui/core/styles";

interface ChartProps {
  data: DiameterData[];
}

const UNITS = {
  meters: { long: "meters", short: "m" },
  feet: { long: "feet", short: "ft" },
  miles: { long: "miles", short: "mi" },
};

const useStyles = makeStyles((theme) => ({
  unitsSelect: {
    padding: 3,
    color: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.light,
    borderRadius: 4,
    "& option": {
      backgroundColor: theme.palette.secondary.light,
    },
  },

  unitsOption: { backgroundColor: theme.palette.secondary.light },
}));

const LineChartComponent = (props: ChartProps) => {
  const classes = useStyles();
  const { data } = props;
  const [unit, setUnit] = useState(UNITS.meters);

  return (
    <div>
      <p style={{ fontSize: 16, textAlign: "center", marginBottom: 10 }}>
        Diameter in{" "}
        <select
          className={classes.unitsSelect}
          value={unit.long}
          onChange={(e) => {
            Object.values(UNITS).forEach(
              (value) => value.long == e.target.value && setUnit(value)
            );
          }}
        >
          <option className={classes.unitsOption} value={UNITS.meters.long}>
            {UNITS.meters.long}
          </option>
          <option value={UNITS.feet.long}>{UNITS.feet.long}</option>
          <option>{UNITS.miles.long}</option>
        </select>
      </p>
      <LineChart
        width={450}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit={unit.short} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={`${unit.long}.minValue`}
          stroke="#534666"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey={`${unit.long}.maxValue`}
          stroke="#138086"
        />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
