import React from "react";

const Units = ({ met, imp }) => {
	return (
		<>
			<div id='unit-wrapper'>
				<button className='unit-button' onClick={(e) => met(e)}>
					°C
				</button>
				<button className='unit-button' onClick={(e) => imp(e)}>
					°F
				</button>
			</div>
		</>
	);
};
export default Units;
