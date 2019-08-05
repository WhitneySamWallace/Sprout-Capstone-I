import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Context from '../../context/Context';

class Nav extends React.Component {
  static contextType = Context;

  render() {
    const loggedin = (
      <div className="loggedin">
        <h1>Sprout</h1>
        <NavLink to='/'>Home</NavLink>
        <NavLink smooth to='/#about'>About</NavLink>
        <NavLink to='/add'>Add Students</NavLink>
        <NavLink to='/main'>Teacher View</NavLink>
        <NavLink to='/'>Log Out</NavLink>
      </div>
    );

    const loggedout = (
      <div className="loggedout">
        <h1>Sprout</h1>
        <NavLink to='/'>Home</NavLink>
        <NavLink smooth to='/#about'>About</NavLink>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink smooth to='/#sign-up'>Sign Up</NavLink>

      </div>
    )
    return (
      <div className="Nav">
        {this.context.hasAuthToken ? loggedin : loggedout}
      </div>
    )
  }
}

export default Nav;