import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
import Units from "./Units.js";
import Current from "./Current.js";
import Hourly from "./Hourly.js";
import SevenDay from "./SevenDay.js";
import Loading from "./Loading.js";
import Error from "./Error.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import objEmpty from "./objEmpty.js";
import getCoords from "./getCoords.js";
import "./index.css";

const App = () => {
	const [weather, setWeather] = useState({});
	const [units, setUnits] = useState("metric");
	let [multiplier, setMultiplier] = useState(0);
	const [refresh, setRefresh] = useState(false);

	setTimeout(() => {
		setRefresh(!refresh);
	}, 60000);

	const metric = (e) => {
		e.preventDefault();
		setUnits("metric");
	};
	const imperial = (e) => {
		e.preventDefault();
		setUnits("imperial");
	};
	useEffect(() => {
		const getData = async () => {
			const coords = await getCoords();
			const { lat, lon } = coords;
			const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${process.env.REACT_APP_API_KEY}`;
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			setWeather(data);
		};
		getData();
	}, [units, multiplier, refresh]);
	if (objEmpty(weather))
		return (
			<>
				<Loading />
			</>
		);
	return (
		<Router>
			<div id='bar-wrapper'>
				<Navbar />
				<Units met={metric} imp={imperial} />
			</div>
			<Routes>
				<Route
					path='/'
					element={<Current unit={units} weather={weather} />}
				/>
				<Route
					path='/hourly'
					element={
						<Hourly
							unit={units}
							weather={weather}
							multiplier={multiplier}
							setMultiplier={setMultiplier}
						/>
					}
				/>
				<Route
					path='/sevenday'
					element={<SevenDay unit={units} weather={weather} />}
				/>
				<Route path='*' element={<Error />} />
			</Routes>
		</Router>
	);
};
export default App;
