import React from "react";
import { Outlet } from "react-router-dom";

// components that would be permanent on the pg
import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = ({ search, setSearch }) => {
  return (
    <div className='App'>
      <Header title='BlOgFoRyOu' />
      <Nav search={search} setSearch={setSearch} />
      {/* in outlet all the about, post compeonets come from out  */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
