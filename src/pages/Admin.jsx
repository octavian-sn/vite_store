import React, { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner';

const Admin = () => {
	const [product, setProduct] = useState({
		name: '',
		price: '',
		description: '',
		imageURL: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await fetch('https://652bdb87d0d1df5273eecf72.mockapi.io/services');
				const products = await response.json();
				setProducts(products);
			} catch (error) {
				setError(error.message);
			}
			setLoading(false);
		};

		fetchData();
	}, []);

	const addNewProduct = (e) => {
		e.preventDefault();
		const url = 'https://652bdb87d0d1df5273eecf72.mockapi.io/services';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product),
		};
		fetch(url, options);
	}

	if (loading) {
		return (
			<Triangle
				height="180"
				width="180"
				color="#0f0f0f"
				ariaLabel="triangle-loading"
				wrapperStyle={{}}
				wrapperclassNameName=""
				visible={true}
			/>
		);
	}


	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='max-w-screen-xl container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col'>
			<form className="max-w-sm w-full mx-auto">
				<div className="mb-5">
					<label htmlFor="name" className="block mb-2 text-bg font-medium text-gray-900 dark:text-white">Name</label>
					<input onChange={e => {
						const name = e.target.value;
						setProduct({ ...product, name })
					}} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
				</div>
				<div className="mb-5">
					<label htmlFor="image" className="block mb-2 text-bg font-medium text-gray-900 dark:text-white">Image URL</label>
					<input onChange={e => {
						const imageURL = e.target.value;
						setProduct({ ...product, imageURL })
					}} type='text' id="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
				</div>
				<div className="mb-5">
					<label htmlFor="price" className="block mb-2 text-bg font-medium text-gray-900 dark:text-white">Price</label>
					<input onChange={e => {
						const price = e.target.value;
						setProduct({ ...product, price })
					}} type='text' id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
				</div>
				<div className="mb-5">
					<label htmlFor="description" className="block mb-2 text-bg font-medium text-gray-900 dark:text-white">Description</label>
					<textarea onChange={e => {
						const description = e.target.value;
						setProduct({ ...product, description })
					}} type='text' id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
				</div>
				<button onClick={addNewProduct} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add new product</button>
			</form>

		</div>
	);
}

export default Admin