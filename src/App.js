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
import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";
// import { useEffect, useState } from "react";

function App() {
  return (
    <div className='App'>
      <Router >
       
        <Routes>
        <Header />
        <Nav />
          <Route index path='/' element={<Home />} />
          <Route path='post' element={<NewPost />} />
          {/* we are accessing the post page from different pg therefore */}
          <Route path='post/:id' element={<PostPage />} />

          {/*  pgs where we are not going to pass anything as a prop will be named component n there we pass the prop it will be element */}
          <Route path='about' component={<About />} />
          <Route path='*' component={<NotFound />} />
          <Route path='footer' element={<Footer />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
