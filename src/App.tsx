import { IoIosCloudOutline } from 'react-icons/io';
import styles from './App.module.css';
import Form from './components/form/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWeather from './hooks/useWeather';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import Spinner from './components/spinner/Spinner';
import { useEffect } from 'react';

function App() {
	const { weather, fetchWeather, hasWeatherData, loading, notFound } =
		useWeather();

		useEffect(() => {
			if (notFound) {
				toast('not found data for this city', {
					type: 'error',
					theme: 'dark',
				});
			}
		}, [notFound]);

	return (
		<>
			<ToastContainer />
			<div className={styles['name-city']}>
				{weather.name && <p>{weather.name}</p>}
			</div>
			<div className={styles['container']}>
				<IoIosCloudOutline size={95} />
				<Form fetchWeather={fetchWeather} />
				{loading && <Spinner />}
				{hasWeatherData && <WeatherDetail weather={weather} />}
				
			</div>
		</>
	);
}

export default App;
