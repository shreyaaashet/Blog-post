import React from 'react'
import Feed from '../Feed'
import  { useContext } from 'react'
import DataContext from '../context/DataContext';


const Home = () => {
   
    const {isLoading,fetchError,searchResult}=useContext(DataContext);
    

    return (
       <main className='Home'>
       {isLoading && <p className='statusMessage'>loading posts ...</p>}
       { !isLoading && fetchError && <p className='statusMessage' style={{color:"red"}}>{fetchError}</p>}
       {!isLoading && !fetchError && searchResult.length ? (
              <Feed posts={searchResult}/>
          ) :(<p className='statusMessage'  style={{marginTop:"5rem"}}>no posts to display... srry</p>)}
          
       </main>
    )
}

export default Home
