import React from 'react';
import Nav from '../Nav/Nav';

function NotFound() {
  return (
    <div className="Not-Found">
    <Nav />
    <main>
      <header>
        <h2>Oops!  We can't find what you're looking for!</h2>
      </header>
    </main>
    </div>
  )
}

export default NotFound;