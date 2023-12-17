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

	if (loading) {
		return (
			<Triangle
				height="180"
				width="180"
				color="#0f0f0f"
				ariaLabel="triangle-loading"
				wrapperStyle={{}}
				wrapperClassName=""
				visible={true}
			/>
		);
	}


	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='max-w-screen-xl container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center'>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-center'>
				{products ? (
					<div>Admin</div>
				) : (
					<div>No products available</div>
				)}
			</div>
		</div>
	);
}

export default Admin