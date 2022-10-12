// https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&units=metric&appid=0838cb2bed5f3c313774aa03400d5165
import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
// import sunny from "./images/sunny.jpg";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import AirIcon from "@mui/icons-material/Air";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Clock from "react-live-clock";
import TextField from "@mui/material/TextField";
import Images from "../Images.js";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";

const Weather = () => {
  const [inputvalue, setinputvalue] = useState("ahmedabad");
  const [backimage, setbackimage] = useState();
  const [weathericon, setweathericon] = useState("fa-sun");
  const [weatherdata, setweatherdata] = useState({});
  const changeevent = (e) => {
    setinputvalue(e.target.value);
  };

  const addItem = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&units=metric&appid=eead14a8bd7ced1f1635e39508ca478c`;
      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main } = data.weather[0];
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const { name } = data;
      const myweatherdata = {
        temp,
        humidity,
        pressure,
        main,
        speed,
        country,
        sunset,
        name,
      };
      setweatherdata(myweatherdata);
    } catch {
      console.log("error");
    }
    setinputvalue("");
  };
  const { temp, humidity, pressure, main, speed, country, sunset, name } =
    weatherdata;

  useEffect(() => {
    if (main) {
      switch (main) {
        case "Sunny" || "Sun":
          setweathericon("fa-sun");
          setbackimage(Images.sunny);
          break;
        case "Haze" || "Hazy":
          setweathericon("fa-smog");
          setbackimage(Images.haze);
          break;
        case "Mist":
          setweathericon("fa-smog");
          setbackimage(Images.haze);
          break;
        case "Smoke":
          setweathericon("fa-smog");
          setbackimage(Images.smoke);
          break;
        case "Clouds" || "Cloudy":
          setweathericon("fa-cloud");
          setbackimage(Images.cloudy);
          break;
        case "Clear":
          setweathericon("fa-cloud-sun");
          setbackimage(Images.clear);
          break;
        case "Rain" || "Rainy":
          setweathericon("fa-cloud-sun-rain");
          setbackimage(Images.rain);
          break;
        case "Snow" || "Snowy":
          setweathericon("fa-snowflake");
          setbackimage(Images.snow);
          break;
        case "Thunderstorm" || "Thunderstorms":
          setweathericon("fa-cloud-bolt");
          setbackimage(Images.thunderstorm);
          break;
        case "Tornado" || "Tornadoes":
          setweathericon("fa-tornado");
          setbackimage(Images.tornado);
          break;
        case "Droughts" || "Drought":
          setweathericon("fa-sun-plant-wilt");
          setbackimage(Images.drought);
          break;
        case "Blizzards" || "Blizzard":
          setweathericon("fa-snowflake");
          setbackimage(Images.blizzard);
          break;
        case "Storms" || "Storm":
          setweathericon("fa-poo-storm");
          setbackimage(Images.storm);
          break;
        case "Hurricanes" || "Hurricane" || "Typhoons" || "Typhoon":
          setweathericon("fa-hurricane");
          setbackimage(Images.hurricane);
          break;

        default:
          setweathericon("fa-sun");
          setbackimage();
          break;
      }
    }
  }, [main]);
  let sec = new Date(sunset * 1000);
  let sunsettime = `${sec.getHours()}:${sec.getMinutes()}`;

  useEffect(() => {
    addItem();
  }, []);

  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundImage: `url(${backimage})` }}
      >
        <div className="container inputcont mx-auto weather">
          <h1 style={{ color: "white" }}>CHECK WEATHER</h1>
          <div className="input-group flex-nowrap">
            <TextField
              id="outlined-basic"
              label="Enter here"
              variant="outlined"
              value={inputvalue}
              onChange={changeevent}
              className="form-control input"
              placeholder="✍  Enter City,Country,State"
              // autoComplete="on"
              autoCorrect="on"
              spellCheck
            />
            <Button variant="outlined" color="error" onClick={addItem}>
              <SendIcon />
            </Button>
          </div>
        </div>

        <div className="display">
          <div
            className="display-weather"
            style={{ backgroundImage: `url(${backimage})` }}
          >
            <div className="icon-city">
              <span className="icon">
                <i className={`fa-solid ${weathericon}`}></i>
                &nbsp;{temp}&deg;
                <span className="weathermood">{main}</span>
              </span>
              <span style={{ textAlign: "center" }}>
                {name},{country}
              </span>
            </div>
            {/* <div className="time"></div> */}
            <div className="row">
              <span className="col-6 extra">
                <WbTwilightIcon fontSize="large" />
                <div className="extra-detail">
                  <span>{sunsettime}</span>
                  <span>sunset</span>
                </div>
              </span>
              <span className="col-6 extra">
                <BloodtypeIcon fontSize="large" />
                <div className="extra-detail">
                  <span>{humidity}</span>
                  <span>humidity</span>
                </div>
              </span>
            </div>
            <div className="row">
              <span className="col-6 extra">
                <CompareArrowsIcon fontSize="large" />
                <div className="extra-detail">
                  <span>{pressure}</span>
                  <span>Pressure</span>
                </div>
              </span>
              <span className="col-6 extra">
                <AirIcon fontSize="large" />
                <div className="extra-detail">
                  <span>{speed}</span>
                  <span>Wind Speed</span>
                </div>
              </span>
            </div>

            <div className="display-time">
              <span className="time">
                {new Date().toLocaleDateString().toString()}
              </span>
              <span className="time">
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </span>
              <span className="time" style={{ fontSize: "small" }}>
                India
              </span>
            </div>
          </div>
          <div className="footer">CREATED BY ARSALAN SHAIKH</div>
        </div>
      </div>
    </>
  );
};

export default Weather;
