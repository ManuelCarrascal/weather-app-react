import { countries } from '../../data/countries';
import styles from './Form.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import type { SearchType } from '../../types';
import {toast} from 'react-toastify';

type FormProps = {
	fetchWeather: (search: SearchType) => Promise<void>;
}

export default function Form({fetchWeather}: FormProps) {
	const [search, setSearch] = useState<SearchType>({
		country: '',
		city: '',
	});

	const handleChange = (
		e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
	) => {
		setSearch({ ...search, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (Object.values(search).includes('')) {
			toast.error('All fields are required',{
				position: 'bottom-right',
				theme: 'dark',
			});
			return;
		}

		fetchWeather(search);

		
	};

	return (
		<form
			action=""
			className={styles.form}
			onSubmit={handleSubmit}
		>
			<div className={styles.field}>
				<select
					name="country"
					id="country"
					value={search.country}
					onChange={handleChange}
				>
					<option
						value={''}
						disabled
					>
						Select a country
					</option>
					;
					{countries.map((country) => {
						return (
							<option
								value={country.code}
								key={country.code}
							>
								{country.name}
							</option>
						);
					})}
				</select>
			</div>
			<div className={styles.field}>
				<input
					type="text"
					id="city"
					name="city"
					placeholder="Enter a city"
					value={search.city}
					onChange={handleChange}
				/>
			</div>

			<input
				className={styles.submit}
				type="submit"
				value="check weather"
			/>
		</form>
	);
}
