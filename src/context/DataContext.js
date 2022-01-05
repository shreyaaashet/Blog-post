import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import api from '../api/Posts'

import useWindowSize from "../Hooks/useWindowSize";
import useAxiosFetch from "../Hooks/useAxiosFetch";
;



 
const DataContext=createContext({});

export const DataProvider = ({children}) => { // dataprovider will provide data to the children which are of diff components  that are passes in  using conte hook
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
  
  //  custom hook
  const {width}=useWindowSize(); // only need the width 
  // fetch Axios hook
  const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3000/posts'); // from where we get data
   useEffect(() => {
     setPosts(data)
   }, [data])
    
     //  navbar search function: use using useeffect with posts n search as dependencie so that every new post added we get a rendered data
     useEffect(()=>{
      const filteredResults =posts.filter(post=>
        ((post.body).toLowerCase()).includes(search.toLowerCase()) 
                                || 
        ((post.title).toLowerCase()).includes(search.toLowerCase())
        
        );
        setSearchResult(filteredResults.reverse()); // as new / latest post should be on top
  
       
  },[posts,search])// post needs to match whts in search 

// submit delete edit 
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
    return (
       <DataContext.Provider value={{
          // we will put values here which were props before  n now can be provided through this tag 
          width,search,setSearch,posts,isLoading,fetchError,setPostBody,
          postBody, setPostTitle,  postTitle,handleSubmit,handleDelete,
           handleEdit, setEditTitle,editBody,setEditBody, editTitle, setSearchResult,searchResult
       }}>
        {children}
       </DataContext.Provider>
    )
}
export default DataContext;
