import React, { useContext } from "react";
import windDir from "./windDir";
import "./index.css";

const UnitContext = React.createContext();

const Current = ({ unit, weather }) => {
	return (
		<UnitContext.Provider value={unit}>
			<div className='pane'>
				<Main
					main={weather.current.weather[0].main}
					desc={weather.current.weather[0].description}
					icon={weather.current.weather[0].icon}
					currentTemp={weather.current.temp}
					feelsLike={weather.current.feels_like}
					humidity={weather.current.humidity}
					pressure={weather.current.pressure}
					min={weather.daily[0].temp.min}
					max={weather.daily[0].temp.max}
					speed={weather.current.wind_speed}
					direction={weather.current.wind_deg}
					sunrise={weather.current.sunrise}
					sunset={weather.current.sunset}
				/>
			</div>
		</UnitContext.Provider>
	);
};
const Main = ({
	main,
	desc,
	icon,
	currentTemp,
	feelsLike,
	humidity,
	pressure,
	min,
	max,
	speed,
	direction,
	sunrise,
	sunset,
}) => {
	return (
		<>
			<div id='cur-weather-wrapper'>
				<Temps
					main={main}
					desc={desc}
					icon={icon}
					currentTemp={currentTemp}
					feelsLike={feelsLike}
					min={min}
					max={max}
				/>
				<div id='cur-humidity'>{humidity}% Humidity</div>
				<div id='cur-pressure'>{pressure} hPa</div>
				<Wind speed={speed} direction={direction} />
			</div>
			<Sun sunrise={sunrise} sunset={sunset} />
		</>
	);
};
const Temps = ({ main, desc, icon, currentTemp, feelsLike, min, max }) => {
	const unitData = useContext(UnitContext);
	return (
		<>
			{" "}
			<img
				id='cur-icon'
				src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
				alt={desc}
			/>
			<div id='cur-weather'>{main}</div>
			<div id='cur-temp'>
				{Math.round(currentTemp) +
					(unitData === "metric" ? "°C" : "°F")}
			</div>
			<div id='cur-feelslike'>
				Feels like{" "}
				{Math.round(feelsLike) + (unitData === "metric" ? "°C" : "°F")}
			</div>
			<div id='low-high-wrapper'>
				<div id='cur-low-wrapper'>
					<img
						className='current-high-low-icon'
						src={require("./extras/low.png")}
						alt='LOW'
					/>
					<div id='cur-low'>
						{Math.round(min) +
							(unitData === "metric" ? "°C" : "°F")}
					</div>
				</div>
				<div id='cur-high-wrapper'>
					<img
						className='current-high-low-icon'
						src={require("./extras/high.png")}
						alt='HIGH'
					/>{" "}
					<div id='cur-high'>
						{Math.round(max) +
							(unitData === "metric" ? "°C" : "°F")}
					</div>
				</div>
			</div>
		</>
	);
};
const Wind = ({ speed, direction }) => {
	const unitData = useContext(UnitContext);
	return (
		<>
			<div id='cur-speed'>
				<img src={require("./extras/wind.png")} alt='WIND SPEED' />
				<br />
				{unitData === "metric"
					? Math.round(speed * 3.6) + " km/h "
					: Math.round(speed) + " mph "}
				{windDir(direction)}
			</div>
		</>
	);
};
const Sun = ({ sunrise, sunset }) => {
	return (
		<>
			{" "}
			<div id='sun-wrapper'>
				<div id='cur-sunrise'>
					<img
						className='sunimg'
						src={require("./extras/rise.png")}
						alt='Sunrise'
					/>
					{new Date(sunrise * 1000).toLocaleTimeString([], {
						timeStyle: "short",
					})}
				</div>
				<div id='cur-sunset'>
					<img
						className='sunimg'
						src={require("./extras/set.png")}
						alt='Sunset'
					/>
					{new Date(sunset * 1000).toLocaleTimeString([], {
						timeStyle: "short",
					})}
				</div>
			</div>
		</>
	);
};
export default Current;
