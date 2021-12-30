import React from 'react'
import Feed from '../Feed'


const Home = ({posts}) => {
    return (
       <main className='Main'>
          {posts.length ?(
              <Feed posts={posts}/>
          ) :(<p style={{marginTop:"5rem"}}>"no posts to display... srry"</p>)}
       </main>
    )
}

export default Home
