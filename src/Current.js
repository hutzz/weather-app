import React, { useState, useEffect } from "react";
import "./index.css";
const Current = () => {
	const [lat, setLat] = useState();
	const [lon, setLon] = useState();

	const [weather, setWeather] = useState({});
	const [main, setMain] = useState({});
	const [wind, setWind] = useState({});
	const [sun, setSun] = useState({});

	const currentWeather = () => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setLat(pos.coords.latitude);
				setLon(pos.coords.longitude);
			},
			(error) => {
				console.log(error);
				alert("Could not get coordinates.");
			},
			{ enableHighAccuracy: true },
			{ timeout: 5000 }
		);
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setWeather({
					id: data.weather[0].id,
					main: data.weather[0].main,
					desc: data.weather[0].description,
					icon: data.weather[0].icon,
				});
				setMain({
					currentTemp: data.main.temp,
					feelsLike: data.main.feels_like,
					humidity: data.main.humidity,
					pressure: data.main.pressure,
					min: data.main.temp_min,
					max: data.main.temp_max,
				});
				setWind({
					speed: data.wind.speed,
					direction: data.wind.deg,
					gust: data.wind.gust,
				});
				setSun({
					sunrise: data.sys.sunrise,
					sunset: data.sys.sunset,
				});
			})
			.catch((err) => console.log("error: " + err));
	};
	useEffect(() => {
		currentWeather();
	}, [lat, lon]);
	return (
		<React.Fragment>
			<div className='pane'>
				<div id='cur-weather-wrapper'>
					<img
						id='cur-icon'
						src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
						alt={weather.desc}
					/>
					<div id='cur-weather'>{weather.main}</div>
					<div id='cur-temp'>
						{Math.round(main.currentTemp - 273.15)}°C
					</div>
					<div id='cur-feelslike'>
						Feels like {Math.round(main.feelsLike - 273.15)}°C
					</div>
				</div>
				<div id='low-high-wrapper'>
					<div id='cur-low'>
						Low: {Math.round(main.min - 273.15)}°C
					</div>
					<div id='cur-high'>
						High: {Math.round(main.max - 273.15)}°C
					</div>
					<div id='cur-humidity'>{main.humidity}% Humidity</div>
					<div id='cur-pressure'>{main.pressure} hPa</div>
					<div id='cur-speed'>Wind speed: {wind.speed} m/s</div>
				</div>
				<div id='sun-wrapper'>
					<div id='cur-sunrise'>
						<img
							src={require("./extras/sunrise.png")}
							alt='Sunrise'
						/>
						<br />
						{new Date(sun.sunrise * 1000).toLocaleTimeString()}
					</div>
					<div id='cur-sunset'>
						<img
							src={require("./extras/sunset.png")}
							alt='Sunset'
						/>
						<br />
						{new Date(sun.sunset * 1000).toLocaleTimeString()}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Current;
