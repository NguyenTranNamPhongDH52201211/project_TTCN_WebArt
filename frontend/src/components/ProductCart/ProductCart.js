import "./ProductCard.css";
import Button from "./Button";

export default function ProductCard({ product, isDark, onAddToCart }) {
    return (
        <div className={`product-card ${isDark ? "glass-dark" : "glass"}`}>
            <div className={`pc-image ${product.gradient}`}>{product.icon}</div>

            <h3>{product.name}</h3>
            <p>{product.description}</p>

            <div className="pc-bottom">
                <span className="pc-price">{product.price}</span>
                <Button onClick={onAddToCart}>Mua</Button>
            </div>
        </div>
    );
}
