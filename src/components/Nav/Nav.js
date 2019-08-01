import React from 'react';
import { Link } from 'react-router-dom';

// REMOVE ONCE LOGIN LOGIC IS IMPLEMENTED
const LOGIN = true;

function Nav() {
  const loggedin = (
    <div className="loggedin">
      <h1>Sprout</h1>
      <Link to='/'>Home</Link>
      <Link to='/'>About</Link>
      <Link to='/login'>Log In</Link>
      <Link to='/'>Sign Up</Link>
    </div>
  );

  const loggedout = (
    <div className="loggedout">
      <h1>Sprout</h1>
      <Link to='/'>Home</Link>
      <Link to='/'>Log Out</Link>

    </div>
  )
  return (
    <div className="Nav">
      {LOGIN ? loggedin : loggedout}
    </div>
  )
}

export default Nav;