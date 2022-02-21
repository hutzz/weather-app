import React, { useState, useEffect } from "react";
import getCoords from "./getCoords";
import Loading from "./Loading.js";
import objEmpty from "./objEmpty";
import "./index.css";

const SevenDay = () => {
	const [apiData, setApiData] = useState({});
	useEffect(() => {
		const getData = async () => {
			const coords = await getCoords();
			const { lat, lon } = coords;
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}`
			);
			const data = await response.json();
			setApiData(data);
		};
		getData();
	}, []);
	if (objEmpty(apiData))
		return (
			<>
				<Loading />
			</>
		);
	return (
		<>
			<div id='days-wrapper'>
				<Day
					day={apiData.daily[1]}
					dayOfWeek={new Date().getDay() + 1}
				/>
				<Day
					day={apiData.daily[2]}
					dayOfWeek={new Date().getDay() + 2}
				/>
				<Day
					day={apiData.daily[3]}
					dayOfWeek={new Date().getDay() + 3}
				/>
				<Day
					day={apiData.daily[4]}
					dayOfWeek={new Date().getDay() + 4}
				/>
				<Day
					day={apiData.daily[5]}
					dayOfWeek={new Date().getDay() + 5}
				/>
				<Day
					day={apiData.daily[6]}
					dayOfWeek={new Date().getDay() + 6}
				/>
				<Day
					day={apiData.daily[7]}
					dayOfWeek={new Date().getDay() + 7}
				/>
			</div>
		</>
	);
};
const Day = (props) => {
	const days = (day) => {
		if (day > 6) day -= 7;
		switch (day) {
			case 0:
				return "Sunday";
			case 1:
				return "Monday";
			case 2:
				return "Tuesday";
			case 3:
				return "Wednesday";
			case 4:
				return "Thursday";
			case 5:
				return "Friday";
			case 6:
				return "Saturday";
			default:
				return "";
		}
	};
	return (
		<>
			<div id='pane-wrapper'>
				<div id='dayofweek'>{days(props.dayOfWeek)}</div>
				<Weather
					icon={props.day.weather[0].icon}
					iconAlt={props.day.weather[0].description}
					temp={props.day.temp.day}
					feelslike={props.day.feels_like.day}
					humidity={props.day.humidity}
				/>
				<br />
				<HL min={props.day.temp.min} max={props.day.temp.max} />
				<Wind speed={props.day.wind_speed} dir={props.day.wind_deg} />
				<Sun rise={props.day.sunrise} set={props.day.sunset} />
			</div>
		</>
	);
};
const Weather = ({ icon, iconAlt, temp, feelslike, humidity }) => {
	return (
		<>
			<div id='sevenday-weather-wrapper'>
				<img
					id='sevenday-icon'
					src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
					alt={iconAlt}
				/>
				<div id='sevenday-temp'>{Math.round(temp - 273.15)}°C</div>
				<div id='sevenday-feelslike'>
					FEELS LIKE {Math.round(feelslike - 273.15)}°C
				</div>
				<div id='sevenday-humidity'>{humidity}% HUMIDITY</div>
			</div>
		</>
	);
};
const HL = ({ min, max }) => {
	return (
		<>
			<div id='sevenday-high-low-wrapper'>
				<div id='sevenday-low-wrapper'>
					<img
						className='sevenday-high-low-icon'
						src={require("./extras/low.png")}
						alt='LOW'
					/>
					<div id='sevenday-low'>{Math.round(min - 273.15)}°C</div>
				</div>
				<div id='sevenday-high-wrapper'>
					<img
						className='sevenday-high-low-icon'
						src={require("./extras/high.png")}
						alt='HIGH'
					/>
					<div id='sevenday-high'>{Math.round(max - 273.15)}°C</div>
				</div>
			</div>
		</>
	);
};
const Wind = ({ speed, dir }) => {
	const windDir = (deg) => {
		if (deg > 348.75 || deg <= 11.25) return "N";
		else if (deg > 11.25 && deg <= 33.75) return "NNE";
		else if (deg > 33.75 && deg <= 56.25) return "NE";
		else if (deg > 56.25 && deg <= 78.75) return "ENE";
		else if (deg > 78.75 && deg <= 101.25) return "E";
		else if (deg > 101.25 && deg <= 123.75) return "ESE";
		else if (deg > 123.75 && deg <= 146.25) return "SE";
		else if (deg > 146.25 && deg <= 168.75) return "SSE";
		else if (deg > 168.75 && deg <= 191.25) return "S";
		else if (deg > 191.25 && deg <= 213.75) return "SSW";
		else if (deg > 213.75 && deg <= 236.25) return "SW";
		else if (deg > 236.25 && deg <= 258.75) return "WSW";
		else if (deg > 258.75 && deg <= 281.25) return "W";
		else if (deg > 281.25 && deg <= 303.75) return "WNW";
		else if (deg > 303.75 && deg <= 326.25) return "NW";
		else if (deg > 326.25 && deg <= 348.75) return "NNW";
		else return "";
	};
	return (
		<>
			<div id='sevenday-wind-wrapper'>
				<img
					id='sevenday-wind-icon'
					src={require("./extras/wind.png")}
					alt='WIND SPEED'
				/>
				<div>
					{Math.round(speed * 3.6)} km/h {windDir(dir)}
				</div>
			</div>
		</>
	);
};
const Sun = ({ rise, set }) => {
	return (
		<>
			<div id='sevenday-sun-wrapper'>
				<div id='sevenday-sunrise-wrapper'>
					<img
						className='sevenday-sunimg'
						src={require("./extras/rise.png")}
						alt='Sunrise'
					/>
					{new Date(rise * 1000).toLocaleTimeString([], {
						timeStyle: "short",
					})}
				</div>
				<div id='sevenday-sunset-wrapper'>
					<img
						className='sevenday-sunimg'
						src={require("./extras/set.png")}
						alt='Sunset'
					/>
					{new Date(set * 1000).toLocaleTimeString([], {
						timeStyle: "short",
					})}
				</div>
			</div>
		</>
	);
};
export default SevenDay;
