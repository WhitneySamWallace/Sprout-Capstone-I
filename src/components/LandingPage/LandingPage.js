import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Context from '../../context/Context';
import SignUpForm from '../SignUpForm/SignUpForm';
import Nav from '../Nav/Nav';
import './LandingPage.css';

class LandingPage extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className="Landing-Page">
        <Nav />
        <main role="main" className="main">
          <section className="about-section">
            <header role="banner" id="about">
              <h2>Grow Every Student with Your Feedback</h2>
            </header>
            <p>
              Join other cutting-edge classrooms in using Sprout to deliver specific, goal-oriented, and timely feedback to students.
            </p>
            <NavLink smooth to='/#sign-up'>Sign Up</NavLink>
          </section>
          <section className="info-section">
            <header role ="banner">
              <h3>Manage Timely Feedback</h3>
            </header>
            <p>
              Teachers choose the priority level of each student goal and Sprout will keep track and remind you when a student is ready for a check in.
            </p>
            <header role="banner">
              <h3>Give Specific, Goal-Oriented Feedback</h3>
            </header>
            <p>
              Sprout helps you keep track of each student's individual, achievable mini-goal during a work session all in one place.

            </p>
          </section>
          <section className="demo-section">
            <h3>Sprout Demo</h3>
            <p>Discover what Sprout has to offer:</p>
            <ul>
              <li>Username: Teacher1</li>
              <li>Password: teacher1password</li>
            </ul>
            <NavLink to='/login'>Demo Login</NavLink>
          </section>
          <section className="sign-up-section">
            <header role="banner" id="sign-up">
            <h3>Let Sprout help you grow your students' understanding.</h3>
            </header>
            <p>Sign Up</p>
            <SignUpForm />
          </section>
        </main>
      </div>
    );
  }
  
}

export default LandingPage;