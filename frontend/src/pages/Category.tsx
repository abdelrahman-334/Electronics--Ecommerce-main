import { useState, useEffect } from 'react';
import LoaderSpinner from '../components/LoaderSpinner';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

export default function Category() {
  const category = location.pathname.split('/').pop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api-gateway/products/category/${category}`
        );
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <LoaderSpinner />;
  }

  if (products.length === 0) {
    return <div>No products found in this category.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Products in {category?.toString().toUpperCase()}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
            quantity={0}
            showRemoveButton={false}
            showQuantityControls={false}
            onRemove={() => {}}
          />
        ))}
      </div>
    </div>
  );
}