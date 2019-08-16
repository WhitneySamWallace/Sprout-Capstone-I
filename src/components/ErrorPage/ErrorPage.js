import React from "react";
import Nav from "../Nav/Nav";
import "./ErrorPage.css";

class ErrorPage extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);

    return { hasError: true };
  }

  componentDidCatch(error) {
    this.setState({
      error: error
    });
  }

  componentWillUnmount() {
    this.setState({
      hasError: false
    });
    this.props.history.push("/")
  }
  render() {
    if (this.state.error) {
      return (
        <div className="Error-Page">
          <Nav />
          <main>
            <header className="error-page-header">
              <h2>Oops! Something went wrong! Please try refreshing the browser.</h2>
            </header>
          </main>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorPage;
