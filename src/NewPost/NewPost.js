//  create new posts
import React from 'react'
import  { useContext } from 'react'
import DataContext from '../context/DataContext';

const NewPost = () => {
  const {setPostBody}=useContext(DataContext);
  const {postBody}=useContext(DataContext);
  const {setPostTitle}=useContext(DataContext);
  const {postTitle}=useContext(DataContext);
  const {handleSubmit}=useContext(DataContext);
    return (
     <main className='NewPost'>
         <h3>ADD NEW POST </h3>
         <form action="" className='newPostForm' onSubmit={handleSubmit}>
             {/* title  */}
               <label htmlFor="postTitle">Title:</label>
             <input type="text"
              name=""
               id="postTitle"
                required
              value={ postTitle}
              onChange={(e)=>setPostTitle(e.target.value)} />
              {/* body */}
              <label htmlFor="postBody">Body:</label>
              <textarea type="text" 
              id='postBody'
              required
              value={postBody}
              onChange={(e)=>setPostBody(e.target.value)}/>
              <button type='submit'>
               submit
              </button>
         </form>
     </main>
    )
}

export default NewPost
