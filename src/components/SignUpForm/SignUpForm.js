import React from "react";
import Context from "../../context/Context";
import "./SignUpForm.css";

class SignUpForm extends React.Component {
  static contextType = Context;

  //Redirects to /main on successful login straight from signup page, bypassing login page
  handleRedirect = () => {
    if (this.context.loggedIn) {
      this.props.history.push("/main");
    }
  };

  render() {
    return (
      <div className="sign-up-form-container">
        <form
          id="sign-up-form"
          onSubmit={e =>
            this.context
              .handleSignUpSubmit(e)
              .then(this.handleRedirect)
              .catch(() => {})
          } //.then(this.handleRedirect)
        >
          <div>
            <div className={this.context.hasError ? "error" : "hidden"}>
              {this.context.error && (
                <p className="error">{this.context.error}</p>
              )}
            </div>
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
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
