import {  Route, Routes} from "react-router-dom";
import "./App.css"
// components that would change
import Home from "./Home/Home";
import About from "./About/About";
import NewPost from "./NewPost/NewPost";
import PostPage from "./PostPage/PostPage";
//  component that will occur whe pg is not defined
import NotFound from "./NotFound/NotFound";
// import { render } from "react-dom";


import Layout from "./Layout";


import EditPost from "./EditPost";

import { DataProvider } from "./context/DataContext";

 
function App() {



  
  return (
    <>
    <DataProvider>
    
      <Routes>
        <Route
          path='/'
          element={<Layout 
          />}
        >
        {/* outlet gets replaced by index */}

        <Route 
        index element={<Home 
          
          />}
        />
      {/* ======================= */}
        <Route path='post'>
          {/* nesting starts */}
          <Route index element={
            <NewPost/>}/>
        
            {/* 2rd one */}
            <Route  path=':id' 
          element={<PostPage />} >
          
            </Route>
        
    
        {/* useparams ke liye it will be a const {id} as we hve menstion here */}
        </Route>
            
        <Route path='/edit/:id'>
        <Route index element={
            <EditPost/>}/></Route>
      
        {/* ======================= */}

        {/* we are accessing the post page from different pg therefore */}

      
      

        {/*  pgs where we are not going to pass anything as a prop will be named component n there we pass the prop it will be element */}

        <Route path='about' element={<About />} />

        <Route path='*' element={<NotFound />} />
      </Route>
      </Routes>
    </DataProvider>
    </>

    
  );
}


export default App;
