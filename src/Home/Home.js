import React from 'react'
import Feed from '../Feed'


const Home = ({posts,isLoading,fetchError}) => {
    return (
       <main className='Home'>
       {isLoading && <p className='statusMessage'>loading posts ...</p>}
       { !isLoading && fetchError && <p className='statusMessage' style={{color:"red"}}>{fetchError}</p>}
       {!isLoading && !fetchError && posts.length ? (
              <Feed posts={posts}/>
          ) :(<p className='statusMessage'  style={{marginTop:"5rem"}}>no posts to display... srry</p>)}
          
       </main>
    )
}

export default Home
