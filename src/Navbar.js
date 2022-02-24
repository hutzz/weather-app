import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
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
						navigate("/hourly");
					}}
				>
					HOURLY
				</button>
				<button
					onClick={() => {
						navigate("/sevenday");
					}}
				>
					FORECAST
				</button>
			</div>
		</>
	);
};
export default Navbar;
