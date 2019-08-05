import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';

class Nav extends React.Component {
  static contextType = Context;

  render() {
    const loggedin = (
      <div className="loggedin">
        <h1>Sprout</h1>
        <Link to='/'>Home</Link>
        <Link to='/'>About</Link>
        <Link to='/add'>Add Students</Link>
        <Link to='/main'>Teacher View</Link>
        <Link to='/'>Log Out</Link>
      </div>
    );

    const loggedout = (
      <div className="loggedout">
        <h1>Sprout</h1>
        <Link to='/'>Home</Link>
        <Link to='/'>About</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/'>Sign Up</Link>

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