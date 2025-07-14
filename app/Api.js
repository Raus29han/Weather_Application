export const GOI_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const CW_API = "https://api.openweathermap.org/data/2.5";

export const goiApioptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
		'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST
	}
};

export const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
