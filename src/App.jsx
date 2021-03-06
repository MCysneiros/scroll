import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
const clientID = `?client_id=${import.meta.env.VITE_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);

	const fetchImages = async () => {
		let url;
		setLoading(true);
		url = `${mainUrl + clientID}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			setPhotos(data);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		console.log('hello');
	};

	return (
		<main>
			<section className='search'>
				<form className='search-form'>
					<input type='text' placeholder='search' className='form-input' />
					<button className='submit-btn' type='submit' onClick={handleSubmit}>
						<FaSearch />
					</button>
				</form>
			</section>
			<section className='photos'>
				<div className='photos-center'>
					{photos.map(item => {
						return <Photo key={item.id} {...item} />;
					})}
				</div>
				{loading && <h2 className='loading'>Loading...</h2>}
			</section>
		</main>
	);
}

export default App;
