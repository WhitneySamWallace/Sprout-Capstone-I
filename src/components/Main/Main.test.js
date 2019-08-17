import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const context = {
    students: [{
      id: 1,
      name: 'test',
      goal: 'test',
      priority: 'low',
      sprout_user_id: 3,
      expand: false,
      alert: false,
      order: 0
    },{
        id: 2,
        name: 'test',
        goal: 'test',
        priority: 'low',
        sprout_user_id: 3,
        expand: false,
        alert: false,
        order: 0
    }],
    clearError: () => {},
  };

  const history = {push: () => {}}
  ReactDOM.render(<BrowserRouter><Main context={context} history={history} /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});