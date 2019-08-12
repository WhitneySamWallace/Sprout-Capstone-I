import React from 'react';
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
        <main role="main">
          <section>
            <header role="banner" id="about">
              <h2>Feedback is a major factor that influences student growth.</h2>
            </header>
            <p>
              Paragraph addressing feedback as a classroom tool.  Feedback should be specific, timely, and goal-oriented.
            </p>
          </section>
          <section>
            <header role ="banner">
              <h3>Timely Feedback</h3>
            </header>
            <p>
              Snippet addressing Sprout's timing system.
            </p>
          </section>
          <section>
            <header role="banner">
              <h3>Specific, Goal-Oriented Feedback</h3>
            </header>
            <p>
              Snippet addressing Sprout's mini-goal feature
            </p>
          </section>
          <section>
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