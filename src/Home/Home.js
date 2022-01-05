import React from 'react'
import Feed from '../Feed'
import  { useContext } from 'react'
import DataContext from '../context/DataContext';


const Home = () => {
    const {posts}=useContext(DataContext);
    const {isLoading}=useContext(DataContext);
    const {fetchError}=useContext(DataContext);

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
