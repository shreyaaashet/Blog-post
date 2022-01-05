import React, { useContext } from "react";
import { Outlet } from "react-router-dom";


// components that would be permanent on the pg
import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import DataContext from "./context/DataContext";





const Layout = () => {
  const {width}=useContext(DataContext);
  const {search}=useContext(DataContext);
  const {setSearch}=useContext(DataContext);
  return (
    <div className='App'>
      <Header title='BlOgFoRyOu' width={width}  />
      <Nav search={search} setSearch={setSearch} />
      {/* in outlet all the about, post compeonets come from out  */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
