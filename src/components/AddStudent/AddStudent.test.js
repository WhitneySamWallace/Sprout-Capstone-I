import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddStudent from './AddStudent';

it('renders without crashing', () => {
  const history = {push: () => {}}
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddStudent history={history}/>
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});