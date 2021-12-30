import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
    return (
     <main className='Missing'>
         <h1>Page not found</h1>
         <p>go back to <Link to="/">home</Link></p>
     </main>
    )
}

export default NotFound
