import React from 'react';
import Context from '../../context/Context';
import './LandingPage.css';

class LandingPage extends React.Component {
  static contextType = Context;

  render() {
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
            <form id="sign-up-form" onSubmit={e => this.context.handleSignUpSubmit(e)}>
              <div>
                <label htmlFor="user-name">User Name</label>
                <input 
                placeholder="User Name" 
                type="text" 
                name="user-name" 
                id="user-name" 
                value={this.context.signUpUsername}
                onChange={e => this.context.updateUsername(e.target.value)}
                required/>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input 
                placeholder="you@email.com" 
                type="text" 
                name="email" 
                id="email" 
                value={this.context.signUpEmail}
                onChange={e => this.context.updateEmail(e.target.value)}
                required/>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input 
                placeholder="Password" 
                type="password" 
                name="password" 
                id="password" 
                value={this.context.signUpPassword}
                onChange={e => this.context.updatePassword(e.target.value)}
                required/>
              </div>
              <div>
              <label htmlFor="confirm-password">Password</label>
                <input 
                placeholder="Confirm Password" 
                type="password" 
                name="confirm-password" 
                id="confirm-password" 
                value={this.context.signUpConfirmPassword}
                onChange={e => this.context.updateConfirmPassword(e.target.value)}
                required/>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </section>
        </main>
      </div>
    );
  }
  
}

export default LandingPage;