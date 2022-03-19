const getCoords = async () => {
	const position = await new Promise((resolve, reject) => {
		const options = { enableHighAccuracy: true };
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
	return {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
	};
};
export default getCoords;
