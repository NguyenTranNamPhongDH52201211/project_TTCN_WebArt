import React,{useState,useEffect} from "react";
import styles from "./ProductList.module.css";
import ProductItem from "./ProductItem";
import { getProducts } from "../../../data/product";
export default function ProductList({itemAmount=20,filterArr=[]}) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
     getProducts().then((data) => setProducts(data));

  }, []);

  const arrList=products.slice(0,itemAmount);
  const itemList=filterArr.length!=0?filterArr:arrList
  return (
    <div className={styles.container}>
      {itemList.map((p, i) => (
       <ProductItem key={i} i={i} p={p}/>
      ))}
    </div>
  );
}
