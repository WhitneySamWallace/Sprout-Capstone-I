import React from 'react';
import './LogIn.css';

function LogIn() {
  return (
    <div className="Log-In">
      <main>
        <header>
          <h2>Log In</h2>
        </header>
        <form>
            <div>
              <label for="user-name">User Name</label>
              <input placeholder="User Name" type="text" name="user-name" id="user-name" />
            </div>
            
            <div>
              <label for="password">Password</label>
              <input placeholder="Password" type="password" name="password" id="password" />
            </div>
            
            <button type="submit">Log In</button>
          </form>
      </main>
    </div>
  );
}

export default LogIn;