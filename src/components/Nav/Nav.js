import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import IdleService from '../../services/idle-service';
import Context from '../../context/Context';
import TokenService from '../../services/token-service';
import sproutLogo from '../../images/sprout-logo.svg';
import './Nav.css';

class Nav extends React.Component {
  static contextType = Context;

  handleLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  }


  renderLogoutLink() {
    return (
      <div className="loggedin link-container">
        <NavLink to='/add'>+ Add</NavLink>
        <NavLink to='/main' onClick={this.context.handleMenuClick}>Goals</NavLink>
        <NavLink to='/' onClick={this.handleLogout}>Log Out</NavLink>
      </div>
      
    )
  }

  renderLoginLink() {
    return (
      (
        <div className="loggedout link-container">
        <NavLink smooth to='/#about'>About</NavLink>
        <NavLink smooth to='/#sign-up'>Sign Up</NavLink>
        <NavLink to='/login'>Log In</NavLink>
      </div>
      )
    )
  }

  render() { 

    return (
      <nav className="Nav">
        <div className="logo-container">
          <img src={sproutLogo} alt="sprout logo" className="logo"/>
          <h1>Sprout</h1>
        </div>
        {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    )
  }
}

export default Nav;