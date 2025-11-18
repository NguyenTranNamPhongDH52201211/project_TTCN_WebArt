import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard'; // Import the ProductCard component (adjust path if needed)
import './ProductList.css';

export default function ProductList({ products }){
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          logoText={product.logoText}
          imageSrc={product.imageSrc}
          altText={product.altText}
          price={product.price}
          discount={product.discount}
          title={product.title}
          status={product.status} // Optional prop for status like "Hết hàng"
        />
      ))}
    </div>
  );
};

