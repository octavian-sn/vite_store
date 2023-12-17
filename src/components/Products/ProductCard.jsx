import React from 'react'

const ProductCard = (props) => {
  const addProductToCart = (e) => {
    const storageCart = window.localStorage.getItem('cart');
		let productsInCart = [];
    
		if (storageCart) {
			productsInCart = JSON.parse(storageCart);
		}

		const productAlreadyAdded = productsInCart.find(
			(product) => product.id === e.target.id
		);
		if (productAlreadyAdded) {
			productAlreadyAdded.qt = productAlreadyAdded.qt + 1;
		} else {
			productsInCart.push({ id: e.target.id, qt: 1 });
		}

		window.localStorage.setItem('cart', JSON.stringify(productsInCart));
    console.log(storageCart)
	};
  
  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md
    hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" >
        <img className="object-cover" src={props.product.imageURL} alt="product image" />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">50% OFF</span>
      </div>
      <div className="mt-4 px-5 pb-5">
        <div>
          <h5 className="text-xl tracking-tight text-slate-900">{props.product.name}</h5>
        </div>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">${(props.product.price / 2).toFixed(2)} </span>
            <span className="text-sm text-slate-900 line-through">${props.product.price}</span>
          </p>
        </div>
        <button 
        id={props.product.id}
        onClick={addProductToCart}
        className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to cart</button>
      </div>
    </div>

  )
}

export default ProductCard