import React from 'react';
import styles from "./Home.module.css";
import Categories from '../../Categories/pages/Categories';
import ProductList from '../../Product/pages/ProductList';

const Home = () => {
  return (
    <div className={styles['home-content']}>
        <Categories  className={styles['block']}/>
        <ProductList  className={styles['block']}/>
    </div>
  );
}

export default Home;
