import React from 'react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="Landing-Page">
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
          <form id="sign-up-form">
            <div>
              <label for="user-name">User Name</label>
              <input placeholder="User Name" type="text" name="user-name" id="user-name" />
            </div>
            <div>
              <label for="email">Email</label>
              <input placeholder="you@email.com" type="text" name="email" id="email" />
            </div>
            <div>
              <label for="password">Password</label>
              <input placeholder="Password" type="password" name="password" id="password" />
            </div>
            <div>
            <label for="confirm-password">Password</label>
              <input placeholder="Confirm Password" type="password" name="confirm-password" id="confirm-password" />
            </div>
            <button type="submit" onClick={console.log('clicked')}>Sign Up</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;