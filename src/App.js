import React from "react";
import Navbar from "./Navbar.js";
import Current from "./Current.js";
import SevenDay from "./SevenDay.js";
import Error from "./Error.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Current />} />
				<Route path='/sevenday' element={<SevenDay />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</Router>
	);
};
export default App;
