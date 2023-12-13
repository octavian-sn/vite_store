import React, { useState, useEffect } from 'react';
import ProductCard from '../components/Products/ProductCard';

const Home = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://654bc6c15b38a59f28efb3a2.mockapi.io/products');
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
      console.log(products)
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='max-w-screen-xl container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-center'>
      {products ? (
        products.map(product => (
          <ProductCard product={product} />
        ))
      ) : (
        <div>No products available</div>
      )}
      </div>
    </div>
  );
};

export default Home;
