import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components that would be permanent on the pg
import Nav from "./Nav/Nav";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
// components that would change
import Home from "./Home/Home";
import About from "./About/About";
import NewPost from "./NewPost/NewPost";
import PostPage from "./PostPage/PostPage";
//  component that will occur whe pg is not defined
import NotFound from "./NotFound/NotFound";
// import { render } from "react-dom";

// import { useEffect, useState } from "react";

function App() {
  return (
    <div className='App'>
     
   
      <Header title="BlOgFoRyOu"/>
      <Nav />
      <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route exact path='post' element={<NewPost />} />

        {/* we are accessing the post page from different pg therefore */}

        <Route path='post/:id' element={<PostPage />} />

        {/*  pgs where we are not going to pass anything as a prop will be named component n there we pass the prop it will be element */}

        <Route path='about' element={<About />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      </Router>
      <Footer />
     
    </div>
  );
}

export default App;
