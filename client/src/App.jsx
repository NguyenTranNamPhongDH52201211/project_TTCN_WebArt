import React from "react"; // Thêm dòng này
import Maincart from "./features/Cart/pages/Maincart";
import Forgot from "./features/authen/pages/Forgot";
import Login from "./features/authen/pages/Login";
import Sidecart from "./features/Cart/pages/Sidecart";
import FormInfo from "./features/Cart/pages/FormInfo";
import ProductDetail from "./features/Product/pages/ProductDetail";
import ProductCard from "./features/Product/pages/ProductCard";
import PersonalProfile from "./features/Profile/pages/PersonalProfile";
import Categories from "./features/Categories/pages/Categories";
import ProductList from "./features/Product/pages/ProductList";
import OrderListCard from "./features/Order/pages/OrderListCard";
import CategoriesItemList from "./features/Categories/pages/CategoriesItemList";
import { Route, Routes } from "react-router";
import Home from "./features/Homepage/pages/Home";
import MainLayout from "./layouts/MainLayout";
import PersonalInfo from "./features/Profile/components/PersonalInfo";
import Signup from "./features/authen/pages/Signup";
import OrderPreview from "./features/Cart/pages/OrderPreview";
import OrderSuccess from "./features/Cart/pages/OrderSuccess";
import OrderHistory from "./features/Order/pages/OrderHistory";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* AUTH */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/categories" element={<Categories />} />
        {/* Product */}
        <Route path="/productlist" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/productcart" element={<ProductCard />} />

        {/* Profile */}
        <Route path="/profile" element={<PersonalProfile />} />
        <Route path="/personalinfo" element={<PersonalInfo />}></Route>
        {/* Categories */}

        <Route
          path="/categoriesitemlist"
          element={<CategoriesItemList />}
        ></Route>
        {/* <Cart></Cart> */}
        <Route path="/sidecart" element={<Sidecart />}></Route>
        <Route path="/maincart" element={<Maincart />}></Route>
        <Route path="/forminfocart" element={<FormInfo />}></Route>
        <Route path="/order-preview" element={<OrderPreview />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        {/* <Order></Order> */}

         <Route path="/order-history" element={<OrderHistory />} />

      </Route>
    </Routes>
  );
}

export default App;
