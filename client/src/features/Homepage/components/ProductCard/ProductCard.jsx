import React from 'react';
import './ProductCard.css';

const ProductCard = ({ logoText, imageSrc, altText, price, discount, title }) => {
  return (
    <div className="product-card">
      <div className="logo">{logoText}</div>
      <img src={imageSrc} alt={altText} className="product-image" />
      <div className="price-section">
        <span className="price">{price}</span>
        {discount && <span className="discount">{discount}</span>}
      </div>
      <h3 className="title">{title}</h3>
    </div>
  );
};

export default ProductCard;