import {  Route, Routes, useNavigate } from "react-router-dom";

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

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const Navigate = useNavigate();
  // for new post:
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    // we need to set id for new post 
    const id= posts.length ? posts[posts.length - 1].id +1 :1;
    const datetime=format(new Date(),'MMMM dd, yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    const allPost=[...posts,newPost];
    setPosts(allPost);
    
    setPostTitle(""); // so that after we submit a post we dont hve to delete to the posttiltle const to create new one
    setPostBody("");
    Navigate("/");
    
  };

  const handleDelete = (id) => {
    const postList = posts.filter((post) => post.id !== id);
    setPosts(postList);
    // after deleting some thing it takes u back to home pg coz of navigate
    Navigate("/");
  };

  //  navbar search function: use using useeffect with posts n search as dependencie so that every new post added we get a rendered data
  useEffect(()=>{
    const filteredResults=posts.filter(post=>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      
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
      index element={<Home posts={setSearchResult} />}
       />
{/* ======================= */}
      <Route path='post'>
         {/* nesting starts */}
         <Route element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />}/>
          {/* 2nd one */}
          <Route
        path=':id' 
        element={<PostPage posts={posts} handleDelete={handleDelete} />}
      />
       {/* useparams ke liye it will be a const {id} as we hve menstion here */}
      </Route>
    
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
