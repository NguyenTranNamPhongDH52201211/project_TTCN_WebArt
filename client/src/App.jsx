import React from "react"; // Thêm dòng này
import Maincart from "./features/Cart/pages/Maincart";
import Forgot from "./features/authen/pages/Forgot";
import Signin from "./features/authen/pages/Signin";
import Login from "./features/authen/pages/Login";
import Sidecart from "./features/Cart/pages/Sidecart";
import FormInfo from "./features/Cart/pages/FormInfo";
import ProductDetail from "./features/Product/pages/ProductDetail";
import PersonalProfile from "./features/Profile/pages/PersonalProfile";
import Categories from "./features/Categories/pages/Categories";
import ProductList from "./features/Product/pages/ProductList";
import OrderListCard from "./features/Order/pages/OrderListCard";
import CategoriesItemList from "./features/Categories/pages/CategoriesItemList";
import { Route, Routes } from "react-router";
import Home from "./features/Homepage/pages/Home";
import MainLayout from "./layouts/MainLayout";
import PersonalInfo from "./features/Profile/components/PersonalInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        {/* AUTH */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/categories" element={<Categories />} />
        {/* Product */}
        <Route path="/productlist" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* Profile */}
        <Route path="/profile" element={<PersonalProfile />} />
        <Route path="/personalinfo" element={<PersonalInfo/>}></Route>
         {/* Categories */}

        <Route
          path="/categoriesitemlist"
          element={<CategoriesItemList />}
        ></Route>
                {/* <Cart></Cart> */}
<Route path="/sidecart" element={<Sidecart/>}></Route>
<Route path="/maincart" element={<Maincart/>}></Route>
<Route path="/forminfocart" element={<FormInfo/>}></Route>

      </Route>
    </Routes>
  );
}

export default App;
