import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

interface HeaderProps {
  getAsteroids: (day?: TimeEnum) => void;
  setLoading: () => void;
}

export enum TimeEnum {
  YESTERDAY = "yesterday",
  TODAY = "today",
  TOMORROW = "tomorrow",
}

const useStyles = makeStyles({
  header: {
    paddingLeft: "10%",
    paddingRight: "10%",
    width: "80%",
    color: "#333",
  },
  headerTitle: {
    textAlign: "left",
    fontSize: 72,
    paddingBottom: 30,
    ["@media (max-width:900px)"]: {
      fontSize: 44,
      // eslint-disable-line no-useless-computed-key
      "-webkit-transition": "color 12s, font-size 2s",
      "-moz-transition": "color 12s, fontSize 2s",
      "-o-transition": "color 12s, fontSize 2s",
      transition: "color 12s, fontSize 2s",
    },
    ["@media (max-width:600px)"]: {
      fontSize: 24,
      // eslint-disable-line no-useless-computed-key
      "-webkit-transition": "color 12s, font-size 2s",
      "-moz-transition": "color 12s, fontSize 2s",
      "-o-transition": "color 12s, fontSize 2s",
      transition: "color 12s, fontSize 2s",
    },
  },
  timeOptions: {
    width: "100%",
    marginRight: 20,
    ["@media (max-width:800px)"]: {
      fontSize: 14,
      marginRight: 0,
      display: "flex",
      justifyContent: "space-between",
      // eslint-disable-line no-useless-computed-key
      "-webkit-transition": "font-size 2s, display 2s, justifyContent 2s",
      "-moz-transition": "fontSize 2s, display 2s, justifyContent 2s",
      "-o-transition": "fontSize 2, display 2s, justifyContent 2ss",
      transition: "fontSize 2s, display 2s, justifyContent 2s",
    },
  },
});

const Header = (props: HeaderProps) => {
  const { getAsteroids, setLoading } = props;
  const classes = useStyles();
  const [time, setTime] = useState(TimeEnum.TODAY);

  useEffect(() => {
    setLoading();
    getAsteroids(time);
  }, [time]);

  return (
    <div className={classes.header}>
      <Typography className={classes.headerTitle}>
        near_earth_objects
      </Typography>
      <FormControl component="fieldset" style={{ width: "100%" }}>
        <FormLabel component="legend" color="secondary">
          Select Day
        </FormLabel>
        <RadioGroup
          className={classes.timeOptions}
          aria-label="time"
          name="time"
          value={time}
          row
          onChange={(e) =>
            Object.values(TimeEnum).forEach(
              (value) => e.target.value === value && setTime(value)
            )
          }
        >
          <FormControlLabel
            classes={{ label: classes.timeOptions }}
            value={TimeEnum.YESTERDAY}
            control={<Radio />}
            label={TimeEnum.YESTERDAY}
          />
          <FormControlLabel
            classes={{ label: classes.timeOptions }}
            value={TimeEnum.TODAY}
            control={<Radio />}
            label={TimeEnum.TODAY}
          />
          <FormControlLabel
            classes={{ label: classes.timeOptions }}
            value={TimeEnum.TOMORROW}
            control={<Radio />}
            label={TimeEnum.TOMORROW}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Header;
