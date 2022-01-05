import React from "react";
import { Link} from "react-router-dom";
import  { useContext } from 'react'
import DataContext from '../context/DataContext';

const Nav = () => {
  const {search,setSearch}=useContext(DataContext);
 
  return (
  
      

     
     
    <nav className='Nav'>
      {/* we will hve a form for search bar in navbar */}
      <form action='' className='searchForm' onSubmit={(e) => e.preventDefault}>
        {/* inside a form label compulsory */}
        <label htmlFor='search'>search post</label>
        {/* input id should match the htmlfor in label */}
        <input
          type='text'
          id='search'
          placeholder='search posts.....'
          // to make it controlled input we use:
          value={search} // from the prop that is passed
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {/* navbar links: */}
    
      <ul>
        <li>
        <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="about">About</Link>
        </li>
        <li>
        <Link to="post">New-Post</Link>
        </li>
      </ul>
      
      
      
      
      

     
    </nav>
  );
};

export default Nav;
