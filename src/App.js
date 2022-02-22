import React, { useState } from "react";
import Navbar from "./Navbar.js";
import Current from "./Current.js";
import SevenDay from "./SevenDay.js";
import Error from "./Error.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

const App = () => {
	const [units, setUnits] = useState("metric");
	const metric = (e) => {
		e.preventDefault();
		setUnits("metric");
	};
	const imperial = (e) => {
		e.preventDefault();
		setUnits("imperial");
	};
	return (
		<Router>
			<Navbar met={metric} imp={imperial} />
			<Routes>
				<Route path='/' element={<Current unit={units} />} />
				<Route path='/sevenday' element={<SevenDay unit={units} />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</Router>
	);
};
export default App;
