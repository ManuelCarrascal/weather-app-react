import { Weather } from '../../types';
import { formatTemperature } from '../../utils';
import styles from './WeatherDetail.module.css';

type WeatherDetailProps = {
	weather: Weather;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
	return (
		<div className={styles['card-weather']}>
			<h3>climate of: <span>{weather.name}</span></h3>
			<p className={styles['current-temperature']}>{formatTemperature(weather.main.temp)}&deg;C</p>
			<div className={styles['extra-info']}>
				<p>
					Min: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span>
				</p>
				<p>
					Max: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span>
				</p>
			</div>
		</div>
	);
}
