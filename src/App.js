import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// import Videotest from './components/Test/index'
// import ManageVideo from "./components/ManageVideo"
// import AddVideos from "./components/AddVideos";

import Home from "./components/Home";
import Home2 from "./components/Home2";
// import AddImages from "./components/AddImages";
// import ManageImage from "./components/ManageImage"
import Contact from "./components/Contact"
import Banner from './components/Banner/banner'

import Eyewear from "./components/Eyewear";
import EyewearManage from "./components/EyewearManage"
import Purse from "./components/Purse";
import PurseManage from "./components/PurseManage"
import Jewelry from "./components/Jewelry";
import JewelryManage from "./components/JewelryManage"
import Clothings from "./components/Clothings"
import ClothingsManage from "./components/ClothingsManage";
import Footwear from "./components/Footwear"
import FootwearManage from "./components/FootwearManage"
import Registration from "./Auth/Registration"
import Login from "./Auth/Login"
import Seller from "./components/Sellers";
import Bargains from "./components/Bargains";
import ProductLink from "./components/ProductLinks";

import './App.css';

// 🔐 Private Route 
// const PrivateRoute = ({ children }) => {
//    const token = localStorage.getItem("admin_access_token");
//   const token = false
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// 🔐 Private Route 
const PrivateRoute = () => {
  const token = localStorage.getItem('admin_access_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />
};




const App = () => (
  <BrowserRouter>
    <Routes>

      <Route exact path="/login" element={<Login />} />
      <Route exact path="/registration" element={<Registration />} />

      {/* 🔐 Private Route  */}
      <Route element={<PrivateRoute />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cashfree/sale" element={<Home2 />} />
        {/* <Route exact path="/add-images" element={<AddImages />} /> */}
        {/* <Route exact path="/manage-image" element={<ManageImage />} /> */}
        <Route exact path="/banner" element={<Banner />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/eyewear" element={<Eyewear />} />
        <Route exact path="/eyewear-manage" element={<EyewearManage />} />
        <Route exact path="/purse" element={<Purse />} />
        <Route exact path="/purse-manage" element={<PurseManage />} />
        <Route exact path="/jewelry" element={<Jewelry />} />
        <Route exact path="/jewelry-manage" element={<JewelryManage />} />
        <Route exact path="/clothings" element={<Clothings />} />
        <Route exact path="/clothings-manage" element={<ClothingsManage />} />
        <Route exact path="/footwear" element={<Footwear />} />
        <Route exact path="/footwear-manage" element={<FootwearManage />} />
        <Route exact path="/seller" element={<Seller />} />
        <Route exact path="/bargains" element={<Bargains />} />
        <Route exact path="/product-link" element={<ProductLink />} />
      </Route>
      {/* <Route exact path="/manage-video" element={<ManageVideo />} /> */}
      {/* <Route exact path="/add-videos" element={<AddVideos />} /> */}

    </Routes>
  </BrowserRouter>
);
export default App;
