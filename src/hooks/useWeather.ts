import axios from 'axios';
import { SearchType } from '../types';
import { object, number, string, InferOutput, parse } from 'valibot';
import { useMemo, useState } from 'react';

const WeatherSchema = object({
	name: string(),
	main: object({
		temp: number(),
		temp_min: number(),
		temp_max: number(),
	}),
});

type Weather = InferOutput<typeof WeatherSchema>;

const initialState = {
	name: '',
	main: {
		temp: 0,
		temp_min: 0,
		temp_max: 0,
	},
};

export default function useWeather() {
	const [weather, setWeather] = useState<Weather>(initialState);
	const [loading, setLoading] = useState(false);
	const [notFound, setNotFound] = useState(false);

	const fetchWeather = async (search: SearchType) => {
		setLoading(true);
		setWeather(initialState);
		setNotFound(false);
		try {
			const appId = import.meta.env.VITE_WEATHER_API_KEY;
			const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

			const { data } = await axios(geoUrl);
			if(!data[0]){
				setNotFound(true);
				return;
			}
			
			const lat = data[0].lat;
			const lon = data[0].lon;

			const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

			const { data: weatherResult } = await axios(weatherUrl);
			const result: Weather = parse(WeatherSchema, weatherResult);
			setWeather(result);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false); // siempre se ejecuta
		}
	};

	const hasWeatherData = useMemo(() => weather.name, [weather]);

	return {
		weather,
		fetchWeather,
		hasWeatherData,
		loading,
		notFound
	};
}
