import styles from "./Pagination.module.css";

export default function Pagination({ current, total, onChange }) {
  return (
    <div className={styles.pagination}>
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        ‹
      </button>

      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={current === i + 1 ? styles.active : ""}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        ›
      </button>
    </div>
  );
}
