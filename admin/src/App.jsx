import './App.css'
import { Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage/HomePage'
import Sidebar from './layouts/SideBar/SideBar';
import Header from './layouts/Header/Header';
import ProductPage from './pages/ProductPage/ProductPage'
import AddProductPage from './pages/AddProductPage/AddProductPage'
import UpdateProductPage from './pages/UpdateProductPage/UpdateProductPage';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage';
import UserPage from './pages/UserPage/UserPage';
import UserDetail from './pages/UserDetailPage/UserDetailPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'

function App() {

  return (

    <div style={{ display: 'flex', width: '100%' }}>
      {/* Sidebar cố định bên trái */}
      <div style={{ width: '15%', position: 'fixed', left: 0, top: 0, height: '100vh' }}>
        <Sidebar />
      </div>

      {/* Content bên phải */}
      <div style={{ width: '85%', marginLeft: '15%' }}>
        {/* Header ở trên cùng */}
        <Header />

        {/* Nội dung các trang */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productpage" element={<ProductPage />} />
            <Route path="/addproductpage" element={<AddProductPage />} />
            <Route path="/updateproductpage/:id" element={<UpdateProductPage />} />
            <Route path="/userprofilepage" element={<UserProfilePage />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/orders/:orderId" element={<OrderDetailPage />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/userdetailpage/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </div>
    </div>

  )
}

export default App