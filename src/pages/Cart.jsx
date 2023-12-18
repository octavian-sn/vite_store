import React, { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner';

const Cart = () => {
  const [products, setProducts] = useState(null);
  const [productsInCart, setProductsInCart] = useState(
    JSON.parse(window.localStorage.getItem('cart'))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const getProductById = (id) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const handleProductQuantity = (productsInCart, productId, action) => {
		const currentProduct = productsInCart.find(
			(product) => product.id === productId
		);
		const indexOfProductToBeDeleted = productsInCart.indexOf(currentProduct);

		switch (action) {
			case 'decrease':
        if (currentProduct.qt === 1) productsInCart.splice(indexOfProductToBeDeleted, 1);
				else currentProduct.qt = currentProduct.qt - 1;
				break;
			case 'increase':
				currentProduct.qt = currentProduct.qt + 1;
				break;
		}

		if (productsInCart.length === 0) {
			localStorage.removeItem('cart');
			setProductsInCart(null);
		} else {
			localStorage.setItem('cart', JSON.stringify(productsInCart));
			setProductsInCart(productsInCart);
		}
	};

	const decreaseQuantity = (e) => {
		const productsInCart =
			JSON.parse(window.localStorage.getItem('cart')) ?? [];
		handleProductQuantity(productsInCart, e.target.id, 'decrease');
	};

	const increaseQuantity = (e) => {
		const productsInCart =
			JSON.parse(window.localStorage.getItem('cart')) ?? [];
		handleProductQuantity(productsInCart, e.target.id, 'increase');
	};

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
    <div className="w-full py-8">
      <div className="xl:max-w-screen-xl container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              {productsInCart ?
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products && productsInCart.map(productInCart => {
                        const product = getProductById(productInCart.id);
                        return (
                          <tr key={productInCart.id}>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img className="h-16 w-16 mr-4" src={product.imageURL} alt="Product image" />
                                <span className="font-semibold">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-4">${product.price}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <button 
                                id={productInCart.id} 
                                className="border rounded-md py-2 px-4 mr-2"
                                onClick={decreaseQuantity}
                                >-</button>
                                <span className="text-center w-8">{productInCart.qt}</span>
                                <button 
                                id={productInCart.id} 
                                className="border rounded-md py-2 px-4 ml-2"
                                onClick={increaseQuantity}
                                >+</button>
                              </div>
                            </td>
                            <td className="py-4">${(product.price * productInCart.qt).toFixed(2)}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                :
                <div>No products in cart yet.</div>
              }
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart