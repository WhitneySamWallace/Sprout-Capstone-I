import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import Context from "../../context/Context";
import SignUpForm from "../SignUpForm/SignUpForm";
import Nav from "../Nav/Nav";
import orangeSprout from "../../images/orange-sprout.svg";
import yellowSprout from "../../images/yellow-sprout.svg";
import "./LandingPage.css";

class LandingPage extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className="Landing-Page">
        <Nav />
        <main role="main" className="main" id="home">
          <section className="about-section">
            <header role="banner" id="about">
              <h2>Grow Every Student with Your Feedback</h2>
            </header>
            <p className="intro-paragraph">
              Join other cutting-edge classrooms in using Sprout to deliver
              specific, goal-oriented, and timely feedback to students.
            </p>
            <NavLink smooth to="/#sign-up" className="sign-up-button">
              Sign Up
            </NavLink>
          </section>
          <section className="info-section">
            <header role="banner">
              <h3>
                Sprout helps teachers deliver timely, goal-oriented, specific
                feedback to students.
              </h3>
            </header>
            <div className="card-container">
              <div className="card">
                <img src={yellowSprout} alt="sprout" className="icon" />
                <header role="banner">
                  <h3>Manage Timely Feedback</h3>
                </header>
                <p>
                  Teachers choose the priority level of each student goal and
                  Sprout will keep track and remind you when a student is ready
                  for a check in.
                </p>
              </div>
              <div className="card">
                <img src={orangeSprout} alt="sprout" className="icon" />
                <header role="banner">
                  <h3>Give Specific, Goal-Oriented Feedback</h3>
                </header>
                <p>
                  Sprout helps you keep track of each student's individual,
                  achievable mini-goal during a work session all in one place.
                </p>
              </div>
            </div>
          </section>
          <section className="demo-section">
            <div className="card demo-section-card">
              <h3>Sprout Demo</h3>
              <p>Discover what Sprout has to offer:</p>
              <ul>
                <li>Username: Teacher1</li>
                <li>Password: Teacher1pass!</li>
              </ul>
              <NavLink to="/login" className="sign-up-button">
                Demo Login
              </NavLink>
            </div>
          </section>
          <section className="sign-up-section" id="sign-up">
            <header role="banner">
              <h3>
                Let Sprout help you grow your students' understanding today.
              </h3>
            </header>
            <h3>Sign Up</h3>
            <SignUpForm {...this.props} />
          </section>
        </main>
      </div>
    );
  }
}

export default LandingPage;
