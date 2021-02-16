import React from 'react';
import Photo from './Components/PhotoList';
import { Route, NavLink } from 'react-router-dom';
import Search from './Components/Search';
import PhotoList from './Components/PhotoList';

const Nav = (props) => (


    <nav className="main-nav">
          <ul>
          <li><NavLink exact to='/sunsets' >Sunsets</NavLink></li>
          <li><NavLink to='/moonlight'>MoonLight</NavLink></li>
          <li><NavLink to='/auroraborealis'>Aurora borealis</NavLink></li>
          </ul>
    </nav>

   
);

export default Nav; 

