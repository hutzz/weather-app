const getCoords = async () => {
	const position = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
	return {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
	};
};
export default getCoords;
