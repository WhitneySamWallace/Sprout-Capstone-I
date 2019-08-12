import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import IdleService from '../../services/idle-service';
import TokenService from '../../services/token-service';

class Nav extends React.Component {

  handleLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  }

  renderLogoutLink() {
    return (
      <div className="loggedin">
          <h1>Sprout</h1>
          <NavLink to='/'>Home</NavLink>
          <NavLink smooth to='/#about'>About</NavLink>
          <NavLink to='/add'>Add Students</NavLink>
          <NavLink to='/main'>Teacher View</NavLink>
          <NavLink to='/' onClick={this.handleLogout}>Log Out</NavLink>
        </div>
      
    )
  }

  renderLoginLink() {
    return (
      (
        <div className="loggedout">
        <h1>Sprout</h1>
        <NavLink to='/'>Home</NavLink>
        <NavLink smooth to='/#about'>About</NavLink>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink smooth to='/#sign-up'>Sign Up</NavLink>

      </div>
      )
    )
  }

  render() {
    return (
      <nav className="Nav">
        {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    )
  }
}

export default Nav;