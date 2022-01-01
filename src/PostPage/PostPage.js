//  see the full posts 
import React from 'react'
import { Link, useParams } from 'react-router-dom'
// useParams is a custom hook 
// Link

const PostPage = ({posts,handleDelete,}) => {
  const {id } = useParams();
  const post =posts.find(post=>(post.id).toString()=== id)// converting it toString so we can used === as id is also in string
    return (
      <main className='PostPage'>
          <article className='Post'>
            {post&& <>
            <h1>{post.title}</h1>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='EditButton'>Edit Post</button></Link>
            <button className='DeleteButton' onClick={()=>handleDelete(post.id)}>Delete post</button>
            </>}
            {!post &&
            <>
            <p>well thats disappointing </p>
            <h4>go back to <Link to="/">Home page</Link></h4>
            </>}
          </article>
      </main>
    )
}

export default PostPage
