export const days = (day) => {
	if (day > 6) day -= 7;
	switch (day) {
		case 0:
			return "SUNDAY";
		case 1:
			return "MONDAY";
		case 2:
			return "TUESDAY";
		case 3:
			return "WEDNESDAY";
		case 4:
			return "THURSDAY";
		case 5:
			return "FRIDAY";
		case 6:
			return "SATURDAY";
		default:
			return "";
	}
};
// I'm certain there's a mathematical way to do this... but at 1am, no thanks
export const time = (epoch) => {
	let t = new Date(epoch * 1000).getHours();
	switch (t) {
		case 0:
			return "12:00 AM";
		case 1:
			return "1:00 AM";
		case 2:
			return "2:00 AM";
		case 3:
			return "3:00 AM";
		case 4:
			return "4:00 AM";
		case 5:
			return "5:00 AM";
		case 6:
			return "6:00 AM";
		case 7:
			return "7:00 AM";
		case 8:
			return "8:00 AM";
		case 9:
			return "9:00 AM";
		case 10:
			return "10:00 AM";
		case 11:
			return "11:00 AM";
		case 12:
			return "12:00 PM";
		case 13:
			return "1:00 PM";
		case 14:
			return "2:00 PM";
		case 15:
			return "3:00 PM";
		case 16:
			return "4:00 PM";
		case 17:
			return "5:00 PM";
		case 18:
			return "6:00 PM";
		case 19:
			return "7:00 PM";
		case 20:
			return "8:00 PM";
		case 21:
			return "9:00 PM";
		case 22:
			return "10:00 PM";
		case 23:
			return "11:00 PM";
		default:
			return "";
	}
};
