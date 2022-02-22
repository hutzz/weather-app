import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ met, imp }) => {
	let navigate = useNavigate();
	return (
		<>
			<div id='nav-wrapper'>
				<button
					onClick={() => {
						navigate("/");
					}}
				>
					CURRENT
				</button>
				<button
					onClick={() => {
						navigate("/sevenday");
					}}
				>
					FORECAST
				</button>
				<button onClick={(e) => met(e)}>°C</button>
				<button onClick={(e) => imp(e)}>°F</button>
			</div>
		</>
	);
};
export default Navbar;
