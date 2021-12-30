import React from 'react'
import Post from './Post'

// so the posts can be map through each of them 
const Feed = ({posts}) => {
    return (
       <>
       {posts.map(post=>(
           <Post key={post.id} post={post} />
       ))}
       </>
    )
}

export default Feed
