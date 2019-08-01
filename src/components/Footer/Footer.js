import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <ul>
        <Link to="/">Home</Link>
        <a href="mailto:whitneysamwallace@gmail.com" target="_blank" rel="noopener noreferrer">Contact</a>
      </ul>
    </footer>
  )
}

export default Footer;