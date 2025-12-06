import React from "react";
import styles from "./ProductItem.module.css";

import ProductCard from "./ProductCard";
export default function ProductItem({ p }) {
  return <ProductCard product={p} />;
}