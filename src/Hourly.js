import React, { useContext } from "react";
import windDir from "./windDir";
import { days, time } from "./dt";
import "./index.css";

const UnitContext = React.createContext();

const Hourly = ({ unit, weather, multiplier, setMultiplier }) => {
	const handlePrev = () => {
		if (multiplier > 0) setMultiplier(multiplier - 1);
	};
	const handleNext = () => {
		if (multiplier <= 6) setMultiplier(multiplier + 1);
	};
	return (
		<UnitContext.Provider value={unit}>
			<div id='hours-wrapper'>
				<div id='multiplier-wrapper'>
					<button
						className='hourly-multiplier'
						onClick={() => {
							handlePrev();
						}}
					>
						Previous
					</button>
					<button
						className='hourly-multiplier'
						onClick={() => {
							handleNext();
						}}
					>
						Next
					</button>
				</div>
				<Hour hour={weather.hourly[0 + 6 * multiplier]} />
				<Hour hour={weather.hourly[1 + 6 * multiplier]} />
				<Hour hour={weather.hourly[2 + 6 * multiplier]} />
				<Hour hour={weather.hourly[3 + 6 * multiplier]} />
				<Hour hour={weather.hourly[4 + 6 * multiplier]} />
				<Hour hour={weather.hourly[5 + 6 * multiplier]} />
			</div>
		</UnitContext.Provider>
	);
};
const Hour = (props) => {
	return (
		<>
			<div id='hourly-pane-wrapper'>
				<div id='dayofweek'>
					{days(new Date(props.hour.dt * 1000).getDay())}
				</div>
				<br />
				<div id='dayofweek'>{time(props.hour.dt)}</div>
				<Weather
					icon={props.hour.weather[0].icon}
					iconAlt={props.hour.weather[0].description}
					temp={props.hour.temp}
					feelslike={props.hour.feels_like}
					humidity={props.hour.humidity}
					pop={props.hour.pop}
					pressure={props.hour.pressure}
				/>
				<br />
				<Wind speed={props.hour.wind_speed} dir={props.hour.wind_deg} />
			</div>
		</>
	);
};
const Weather = ({
	icon,
	iconAlt,
	temp,
	feelslike,
	humidity,
	pop,
	pressure,
}) => {
	const unitData = useContext(UnitContext);
	return (
		<>
			<div id='sevenday-weather-wrapper'>
				<img
					id='sevenday-icon'
					src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
					alt={iconAlt}
				/>
				<div id='sevenday-temp'>
					{Math.round(temp) + (unitData === "metric" ? "°C" : "°F")}
				</div>
				<div id='sevenday-feelslike'>
					FEELS LIKE{" "}
					{Math.round(feelslike) +
						(unitData === "metric" ? "°C" : "°F")}
				</div>
				<div id='sevenday-humidity'>{humidity}% HUMIDITY</div>
				<div id='sevenday-pop'>POP {Math.round(pop * 100)}%</div>
				<div id='sevenday-pressure'>{pressure} hPa</div>
			</div>
		</>
	);
};
const Wind = ({ speed, dir }) => {
	const unitData = useContext(UnitContext);
	return (
		<>
			<div id='sevenday-wind-wrapper'>
				<img
					id='sevenday-wind-icon'
					src={require("./extras/wind.png")}
					alt='WIND SPEED'
				/>
				<div>
					{unitData === "metric"
						? Math.round(speed * 3.6) + " km/h "
						: Math.round(speed) + " mph "}
					{windDir(dir)}
				</div>
			</div>
		</>
	);
};
export default Hourly;
