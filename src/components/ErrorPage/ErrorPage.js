import React from "react";
import Nav from "../Nav/Nav";
import "./ErrorPage.css";

class ErrorPage extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    console.error(error);

    return { error };
  }

  componentDidCatch(error) {
    this.setState({
      error: error
    });
  }
  render() {
    if (this.state.error) {
      return (
        <div className="Error-Page">
          <Nav />
          <main>
            <header className="error-page-header">
              <h2>Oops! Something went wrong! Please try again later.</h2>
            </header>
          </main>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorPage;
