import "./Button.css";

export default function Button({ children, className = "", ...props }) {
    return (
        <button className={`btn-glass ${className}`} {...props}>
            {children}
        </button>
    );
}
