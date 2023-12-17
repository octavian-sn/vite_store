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

	const deleteProduct = async (id) => {
		const url = `https://652bdb87d0d1df5273eecf72.mockapi.io/services/${id}`;
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(url, options);
		if (response.ok) {
			const updatedProducts = products.filter((product) => product.id != id);
			setProducts(updatedProducts);
		}
	};

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
		<div className='max-w-screen-xl container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-5'>
			<form className="max-w-sm w-full mx-auto">
				<div className="mb-5">
					<label htmlFor="name" className="block mb-1 text-bg font-medium text-gray-900 dark:text-white">Name</label>
					<input onChange={e => {
						const name = e.target.value;
						setProduct({ ...product, name })
					}} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
				</div>
				<div className="mb-5">
					<label htmlFor="image" className="block mb-1 text-bg font-medium text-gray-900 dark:text-white">Image URL</label>
					<input onChange={e => {
						const imageURL = e.target.value;
						setProduct({ ...product, imageURL })
					}} type='text' id="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
				</div>
				<div className="mb-5">
					<label htmlFor="price" className="block mb-1 text-bg font-medium text-gray-900 dark:text-white">Price</label>
					<input onChange={e => {
						const price = e.target.value;
						setProduct({ ...product, price })
					}} type='text' id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
				</div>
				<div className="mb-5">
					<label htmlFor="description" className="block mb-1 text-bg font-medium text-gray-900 dark:text-white">Description</label>
					<textarea onChange={e => {
						const description = e.target.value;
						setProduct({ ...product, description })
					}} type='text' id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
				</div>
				<button onClick={addNewProduct} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add new product</button>
			</form>

			{products &&
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Product name
								</th>
								<th scope="col" className="px-6 py-3">
									Image
								</th>
								<th scope="col" className="px-6 py-3">
									Price
								</th>
								<th scope="col" className="px-6 py-3">
									Description
								</th>
								<th scope="col" className="px-6 py-3">
									<span className="sr-only">Edit</span>
								</th>
								<th scope="col" className="px-6 py-3">
									<span className="sr-only">Delete</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map(product => (
								<tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										{product.name}
									</th>
									<td className="px-6 py-4">
										<img className='max-h-9' src={product.imageURL} alt={product.name} />
									</td>
									<td className="px-6 py-4">
										{product.price}$
									</td>
									<td className="px-6 py-4">
										{product.description}
									</td>
									<td >
										<button id={product.id} className="font-bold text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
									</td>
									<td className="pr-4">
										<button id={product.id} onClick={e => deleteProduct(e.target.id)} className="font-bold text-red-700 dark:text-red-500 hover:underline">Delete</button>
									</td>
								</tr>
							))}
						</tbody>

					</table>
				</div>
			}

		</div>
	);
}

export default Admin