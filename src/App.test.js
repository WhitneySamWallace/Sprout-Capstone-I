import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const history = {push: () => {}}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><App history={history} /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
