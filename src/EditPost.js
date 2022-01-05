//  to edit the post n update the list 
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// this is a combination of updated post n post page where all posts are there therfore using useparams
import  { useContext } from 'react'
import DataContext from './context/DataContext';



const EditPost = () => {
        const {handleEdit}=useContext(DataContext);
        const {posts}=useContext(DataContext);
        const {setEditTitle}=useContext(DataContext);
        const {editTitle}=useContext(DataContext);
        const { editBody}=useContext(DataContext);
        const {setEditBody}=useContext(DataContext);
        const {id } = useParams();
        const post =posts.find(post=>(post.id).toString()=== id)// converting it toString so we can used === as id is also in string
        useEffect(() => {
          if(post){
            setEditTitle(post.title);
            setEditBody(post.body); // so that when editing we already hve the specific post ka title n bosy ready 
          }
        }, [post,setEditTitle,setEditBody])
        
        return (
            <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
        )}
        
export default EditPost;
