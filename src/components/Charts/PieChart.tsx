import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@material-ui/core/styles";

interface ChartProps {
  data: { name: string; value: number }[];
}

const PieChartComponent = (props: ChartProps) => {
  const { data } = props;
  const theme = useTheme();
  const pieChartColors = [theme.palette.error.main, theme.palette.primary.main];

  return (
    <div>
      <p style={{ fontSize: 16, textAlign: "center", marginBottom: 30 }}>
        Potentially dangerous vs safe asteroids:
      </p>
      <PieChart width={420} height={300}>
        <Pie
          data={data}
          dataKey="value"
          cx={200}
          cy={100}
          outerRadius={80}
          innerRadius={40}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
          ))}
        </Pie>
        <Legend
          align="right"
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
        />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
