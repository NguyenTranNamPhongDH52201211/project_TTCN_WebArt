import SideCart  from "./features/Cart/pages/Sidecart"
import Maincart from "./features/Cart/pages/Maincart"
import Forgot from "./features/authen/pages/Forgot"
import Signin from "./features/authen/pages/Signin"
import Login from "./features/authen/pages/Login"
import Sidecart from "./features/Cart/pages/Sidecart"
import FormInfo from "./features/Cart/pages/FormInfo"
import ProductDetail from "./features/Product/pages/ProductDetail"
import PersonalProfile from "./features/Profile/pages/PersonalProfile"
import Categories from "./features/Categories/pages/Categories"
import ProductList from "./features/Product/pages/ProductList"
import OrderListCard from "./features/Order/pages/OrderListCard"
import { Route,Routes } from "react-router"
function App() {

  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgot" element={<Forgot />} />

      
      
    </Routes>
  )

}

export default App
