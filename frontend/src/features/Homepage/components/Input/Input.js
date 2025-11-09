import "./Input.css";

export default function Input({ className = "", ...props }) {
    return <input className={`search-input ${className}`} {...props} />;
}
