import React from "react";
import { Link } from 'react-router-dom';
import Context from "../../context/Context";
import "./SignUpForm.css";

class SignUpForm extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className="sign-up-form-container">
      <form
        id="sign-up-form"
        onSubmit={e => this.context.handleSignUpSubmit(e)}
      >
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            placeholder="User Name"
            type="text"
            name="username"
            id="username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="you@email.com"
            type="text"
            name="email"
            id="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Password:</label>
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirm-password"
            id="confirm_password"
            required
          />
        </div>
        <button type="submit" className="sign-up-button">
          <Link to="/login" className="sign-up-link">Sign Up</Link>
        </button>
      </form>
      </div>
    );
  }
}

export default SignUpForm;
