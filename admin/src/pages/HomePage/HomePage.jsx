import React from "react";
import Sidebar from "../../layouts/SideBar/SideBar";
import Header from "../../layouts/Header/Header";
import MainDashBoard from "../../layouts/MainDashBoard/MainDashBoard";
import {FiGrid, } from 'react-icons/fi';
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="main-layout">
   
        <div className="page-content">
          <MainDashBoard />
        </div>
      </div>
  );
};

export default HomePage;
