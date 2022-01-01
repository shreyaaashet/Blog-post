import {  Route, Routes, useNavigate } from "react-router-dom";
import "./App.css"
// components that would change
import Home from "./Home/Home";
import About from "./About/About";
import NewPost from "./NewPost/NewPost";
import PostPage from "./PostPage/PostPage";
//  component that will occur whe pg is not defined
import NotFound from "./NotFound/NotFound";
// import { render } from "react-dom";
import { useEffect, useState } from "react";

import Layout from "./Layout";
import { format } from "date-fns";
import api from './api/Posts'
import EditPost from "./EditPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const Navigate = useNavigate();
  // for new post:
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
// for edited post n body 
const [editTitle, setEditTitle] = useState("");
const [editBody, setEditBody] = useState("");
  // api 
useEffect(()=>{
  const fetchPosts= async()=>{
    // in axios u dont need to use fetch n convert it into json string 
    // axios will catch error automatically

   try{
   const response= await api.get('/posts');
   if (response && response.data){
     setPosts(response.data);
   }
   }
  
  catch (err) {
   if (err.response) {
    // Not in the 200 response range 
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else {
    console.log(`Error: ${err.message}`);
  }
}
}

fetchPosts();
}, [])
  //edit datetime n title/body n then update the posts
  const handleEdit = async (id)=>{
    const datetime=format(new Date(),'MMMM dd, yyyy pp');
    const updatedPost={id,title:editTitle,datetime,body:editBody};
    try{
      const response=await api.put(`/posts/${id}`, updatedPost) // to update the whole list we use put() n to update a specific fields we use patch()
        // put where n wht data is being put 
        
        setPosts(posts.map(post=>post.id === id ? {...response.data} : post));// to check n make a new array of the updated post only n not include the existing old post n repeat the post  
        setEditTitle("");
        setEditBody("");
        Navigate("/");
      }catch{

    }
  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // we need to set id for new post 
    const id= posts.length ? posts[posts.length - 1].id +1 :1;
    const datetime=format(new Date(),'MMMM dd, yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    // axios addition using create of crud operations 
    try{
      const response= await api.post('/posts',newPost); // as we posting whtever getting submitted 
     // we are sending the /posts mein posts n the newPosts as well to the axios api
      const allPost=[...posts,response]; // as api  se jo posts we posted that is getting included
      setPosts(allPost);
     setPostTitle(""); // so that after we submit a post we dont hve to delete to the posttiltle const to create new one
      setPostBody("");
      Navigate("/");
    } catch(err){
      console.log(`Error:${err.message}`);
    }
    
    
  };

  const handleDelete = async (id) => {
    try{
      // since its not static data we will be deleting it for real by
       await api.delete(`/posts/${id}`); // end point from where things will get deleted n then id of which u want to delete  
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      // after deleting some thing it takes u back to home pg coz of navigate
      Navigate("/");
    } catch (err){
      console.log(`Error:${err.message}`);
    }
   
  };

  //  navbar search function: use using useeffect with posts n search as dependencie so that every new post added we get a rendered data
  useEffect(()=>{
    const filteredResults =posts.filter(post=>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) 
                              || 
      ((post.title).toLowerCase()).includes(search.toLowerCase())
      
      );
      setSearchResult(filteredResults.reverse()); // as new / latest post should be on top

     
},[posts,search])// post needs to match whts in search 
  
  return (
    <>
    
    
    <Routes>
      <Route
        path='/'
        element={<Layout search={search}
         setSearch={setSearch} />}
      >
      {/* outlet gets replaced by index */}

      <Route 
      index element={<Home posts={searchResult} />}
       />
{/* ======================= */}
      <Route path='post'>
         {/* nesting starts */}
         <Route index element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />}/>
       
          {/* 2rd one */}
          <Route  path=':id' 
        element={<PostPage posts={posts}  handleDelete={handleDelete} />} >
        
          </Route>
      
   
       {/* useparams ke liye it will be a const {id} as we hve menstion here */}
      </Route>
          
      <Route path='/edit/:id'>
      <Route index element={
          <EditPost
            handleEdit={handleEdit}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
            editTitle={editTitle}
            posts={posts}
          
          />}/></Route>
    
       {/* ======================= */}

      {/* we are accessing the post page from different pg therefore */}

     
     

      {/*  pgs where we are not going to pass anything as a prop will be named component n there we pass the prop it will be element */}

      <Route path='about' element={<About />} />

      <Route path='*' element={<NotFound />} />
     </Route>
    </Routes>
    </>

    
  );
}


export default App;
